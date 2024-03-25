import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [error, setError] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active

  useEffect(() => {
    // Fetch users from Firestore (only available to admins)
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const userList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const editUser = async () => {
    try {
      await updateDoc(doc(db, 'users', editUserId), { email: editUserEmail });

      setUsers(users.map(user => {
        if (user.id === editUserId) {
          return { ...user, email: editUserEmail };
        }
        return user;
      }));

      setEditUserId('');
      setEditUserEmail('');
      setError('');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };


  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId))
      setUsers(users.filter(user => user.id !== userId));
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (userId, userEmail) => {
    setIsEditing(true); // Enter editing mode
    setEditUserId(userId);
    setEditUserEmail(userEmail);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Users</h2>
      {isEditing && (
        <div className="mb-3">
          <h3>Edit User</h3>
          <input
            type="text"
            value={editUserEmail}
            onChange={(e) => setEditUserEmail(e.target.value)}
            className="form-control mb-2"
            placeholder="New Email"
          />
          <button onClick={editUser} className="btn btn-primary">Save</button>
        </div>
      )}
      {error && <p>{error}</p>}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditClick(user.id, user.email)} className="btn btn-primary me-2">Edit</button>
                  <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
