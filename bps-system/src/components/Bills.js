import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError('');
        const querySnapshot = await getDocs(collection(db, 'bills'));
        const billsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBills(billsData);
      } catch (error) {
        console.error('Error fetching bills: ', error);
        setError('Failed to fetch bills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
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
      <h2 className="mb-4">All Bills</h2>
      <div className="row">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {bills.map(bill => (
          <div key={bill.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{bill.name}</h5>
                <p className="card-text">Amount: {bill.amount}</p>
                <Link to={`/payment-options/${bill.id}`} className="btn btn-primary">Pay Bill</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(bill.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bills;
