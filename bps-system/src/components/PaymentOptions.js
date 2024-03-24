import { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentOptions = () => {
    const { billId } = useParams();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentType, setPaymentType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [userId, setUserId] = useState('');
    const [billname,setbillName]= useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'PaymentMethods'));
                const methods = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPaymentMethods(methods);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
                setError('Failed to fetch payment methods. Please try again later.');
            }
        };

        fetchPaymentMethods();

        // Get the current user's ID from Firebase Authentication
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId('');
            }
        });
    }, []);

    const fetchBillAmount = async () => {
        try {
            if (!billId) {
                throw new Error('Bill ID is not provided.');
            }

            const billDocRef = doc(db, 'bills', billId);
            const billSnapshot = await getDoc(billDocRef);
            
            if (billSnapshot.exists()) {
                const billData = billSnapshot.data();
                setBillAmount(billData.amount);
                setbillName(billData.name);
            } else {
                console.log('No such document!');
                setError('Bill not found.');
            }
        } catch (error) {
            console.error('Error fetching bill amount:', error);
            setError('Failed to fetch bill amount. Please try again later.');
        }
    };

    useEffect(() => {
        fetchBillAmount();
    }, [billId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!paymentType) {
            setError('Please select a payment method');
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, 'payments'), {
                userId: userId,
                billId: billId,
                paymentType: paymentType,
                amount: parseFloat(billAmount),
                name:billname,
            });
            console.log('Payment added successfully');

            const billDocRef = doc(db, 'bills', billId);
            await deleteDoc(billDocRef); // Delete the document
            console.log('Bill updated successfully');

            setPaymentType('');
            setError('');
            navigate('/viewbills');
        } catch (error) {
            console.error('Error adding payment:', error);
            setError('Failed to add payment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="needs-validation">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="paymentType" className="form-label">
                    Select Payment Method
                </label>
                <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                    <option value="">Select Payment Method</option>
                    {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                            {method.PaymentMethodName}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">Please select a payment method.</div>
            </div>
            <div>Bill Amount: {billAmount}</div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                Make Payment
            </button>
        </form>
    );
};

export default PaymentOptions;
