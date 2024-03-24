import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import 'firebase/firestore';

function Bills() {
  const [bills, setBills] = useState([]);
  const [utilities, setUtilities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError('');
        const billsSnapshot = await getDocs(collection(db, 'bills'));
        const billsData = billsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBills(billsData);
      } catch (error) {
        console.error('Error fetching bills: ', error);
        setError('Failed to fetch bills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUtilities = async () => {
      try {
        const utilitiesSnapshot = await getDocs(collection(db, 'utilities'));
        const utilitiesData = utilitiesSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});
        setUtilities(utilitiesData);
      } catch (error) {
        console.error('Error fetching utilities: ', error);
        setError('Failed to fetch utilities. Please try again later.');
      }
    };
    fetchBills();
    fetchUtilities();
  }, []);

  const handleDelete = async (billId) => {
    try {
      await deleteDoc(doc(db, 'bills', billId));
      setBills(prevBills => prevBills.filter(bill => bill.id !== billId));
    } catch (error) {
      console.error('Error deleting bill: ', error);
      setError('Failed to delete bill. Please try again later.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Bills</h2>
      <Link to='/AddBill' className="btn btn-primary">Add New Bill</Link><br/><br/>
      <Link to='/Sales' className='btn btn-primary'>View Expenses</Link>
      <br/><br/>
      <div className="row">

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {bills.map(bill => (
          <div key={bill.id} className="col-md-4 mb-4">
            <div className="card">
              <img style={{ height: '200px' }} src={utilities[bill.utilityId]?.imageUrl} className="card-img-top" alt={utilities[bill.utilityId]?.name} />
              <div className="card-body">
                <h5 className="card-title">{bill.name}</h5>
                <p className="card-text">Amount: {bill.amount}</p>
                <div>
                  <Link to={`/PaymentOptions/${bill.id}`} className="btn btn-primary">Pay Bill</Link>
                  <br />
                  <br />
                  <button className="btn btn-danger" onClick={() => handleDelete(bill.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bills;
