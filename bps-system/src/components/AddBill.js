import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function AddBillForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount || !dueDate) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'bills'), {
        name,
        amount: parseFloat(amount), // Parse amount as float
        dueDate: new Date(dueDate), // Convert dueDate to Date object
      });
      console.log('Bill added with ID: ', docRef.id);
      // Clear form after successful submission
      setName('');
      setAmount('');
      setDueDate('');
      setError('');
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

export default AddBillForm;
