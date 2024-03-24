import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [error, setError] = useState('');
    const [newPaymentMethodName, setNewPaymentMethodName] = useState('');

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const paymentMethodsSnapshot = await getDocs(collection(db, 'PaymentMethods'));
                const paymentMethodsList = paymentMethodsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().PaymentMethodName,
                    ...doc.data()
                }));
                setPaymentMethods(paymentMethodsList);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPaymentMethods();
    }, []);

    const deletePaymentMethod = async (paymentMethodId) => {
        try {
            await deleteDoc(doc(db, 'PaymentMethods', paymentMethodId));
            setPaymentMethods(paymentMethods.filter(method => method.id !== paymentMethodId));
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddPaymentMethod = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'PaymentMethods'), {
                PaymentMethodName: newPaymentMethodName
            });
            const newPaymentMethod = { id: docRef.id, name: newPaymentMethodName };
            setPaymentMethods([...paymentMethods, newPaymentMethod]);
            setNewPaymentMethodName('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="text-center mb-4">Manage Payment Methods</h2>
            <div className="mb-3">
                <form onSubmit={handleAddPaymentMethod}>
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter payment method name"
                                value={newPaymentMethodName}
                                onChange={(e) => setNewPaymentMethodName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Add Payment Method</button>
                        </div>
                    </div>
                </form>
            </div>
            {error && <p>{error}</p>}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.map(method => (
                            <tr key={method.id}>
                                <td>{method.name}</td>
                                <td>
                                    <button onClick={() => deletePaymentMethod(method.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentMethods;
