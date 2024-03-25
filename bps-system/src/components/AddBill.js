import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function AddBill() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [utilities, setUtilities] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const utilitiesSnapshot = await getDocs(collection(db, 'utilities'));
        const utilitiesList = utilitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUtilities(utilitiesList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUtilities();
  }, []);

  const handleUtilityChange = (event) => {
    setSelectedUtility(event.target.value);
  };

  const handleSubmit = async (e) => {
    const user = auth.currentUser;
    e.preventDefault();
    if (!name || !amount || !dueDate) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const userId = user.uid;
      const docRef = await addDoc(collection(db, 'bills'), {
        name,
        amount: parseFloat(amount), // Parse amount as float
        dueDate: new Date(dueDate), // Convert dueDate to Date object
        utilityId: selectedUtility,
        userId: userId,// Add selected utility ID to the bill
      });
      console.log('Bill added with ID: ', docRef.id);
      // Clear form after successful submission
      setName('');
      setAmount('');
      setDueDate('');
      setSelectedUtility('');
      setError('');
      navigate('/viewbills');
    } catch (error) {
      console.error('Error adding bill: ', error);
      setError('Failed to add bill. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation d-flex justify-content-center">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control form-control-sm" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <div className="invalid-feedback">Please provide a name.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input type="number" className="form-control form-control-sm" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
              <div className="invalid-feedback">Please provide a valid amount.</div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input type="date" className="form-control form-control-sm" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" required />
            <div className="invalid-feedback">Please provide a due date.</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="utility" className="form-label">Utility</label>
            <select className="form-select form-select-sm" value={selectedUtility} onChange={handleUtilityChange} required>
              <option value="">Select Utility</option>
              {utilities.map(utility => (
                <option key={utility.id} value={utility.id}>{utility.name}</option>
              ))}
            </select>
            <div className="invalid-feedback">Please select a utility.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>Add Bill</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddBill;
