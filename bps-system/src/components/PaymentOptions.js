import { useState,useEffect } from 'react';
import { collection, getDocs,addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {Link} from 'react-router-dom';
import 'firebase/firestore';
import { useParams,useLocation } from "react-router-dom";


const  PaymentOptions=() => {
   const {billId} = useParams();
  const [timestamp, settimestamp] = useState('');
  const [paymentType,setpaymentType] = useState('');
  const [status,setstatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const amt = new URLSearchParams(location.search).get('amount');
  console.log(amt);
  //const [PaymentMethods,setpaymentMethods] = useState('');

//   useEffect(()=>{
//     const fetchPaymentMethods = async () => {
//         try {
//           setLoading(true);
//           setError('');
//           const querySnapshot = await getDocs(collection(db, 'PaymentMethods'));
//           const methods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setpaymentMethods(methods);
//           if(methods.length>0){
//             setpaymentType(methods[0].id);
//           }
//         } catch (error) {
//           console.error('Error fetching bills: ', error);
//           setError('Failed to fetch bills. Please try again later.');
//         } finally {
//           setLoading(false);
//         }
//     }
//     fetchPaymentMethods();
//     },[]);
//     const handlePaymentMethodChange = (event)=>{
//         setpaymentType(event.target.value);
//     }


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentType) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
        const currentTime = new Date();
      const docRef = await addDoc(collection(db, 'payments'), {
        billId:billId,
        status:'completed',
        paymentType :paymentType,
        amount: parseFloat(amt), // Parse amount as float
        timestamp: currentTime, // Convert dueDate to Date object
      });
      console.log('Payment added with ID: ', docRef.id);
      // Clear form after successful submission
    
      settimestamp('');
      setpaymentType('');
      setstatus('');
      setError('');
    } catch (error) {
      console.error('Error adding bill: ', error);
      setError('Failed to add bill. Please try again later.');
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
  {error && <div className="alert alert-danger">{error}</div>}
  <div>Bill Amount to be paid : {amt}</div>
  <div className="mb-3">
    <label htmlFor="paymentType" className="form-label"> Select PaymentMethods</label>
    <input type="text" className="form-control form-control-sm" id="paymentType" value={paymentType} onChange={(e) => setpaymentType(e.target.value)} placeholder="Payment method" required />
    <div className="invalid-feedback">Please provide a paymentmethod.</div>
  </div>
  {/* <div>
  {PaymentMethods.map(method=>(
    <div key ={method.id}>
        <input
        type="radio"
        id = {method.id}
        value = {method.id}
        checked = {paymentType==method.id}
        onChange={handlePaymentMethodChange}
        />
        <label htmlFor={method.id}>{method.PaymentMethodName}</label>
        </div>
  ))}
  </div> */}
  <button type="submit" className="btn btn-primary" disabled={loading}>Add Payment</button>
  {status && <p>{status}</p>}
</form>
  );
}

export default PaymentOptions;
