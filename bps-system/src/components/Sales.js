import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ExpensesChart = () => {
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('User not logged in');
        }

        const expensesQuery = query(
          collection(db, 'payments'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(expensesQuery);
        const expenses = querySnapshot.docs.map(doc => doc.data());

        // Process expenses data to extract required information (e.g., amount)
        const processedExpensesData = expenses.map(expense => ({
          name: expense.name, 
          amount: expense.amount,
        }));

        setExpensesData(processedExpensesData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={expensesData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
