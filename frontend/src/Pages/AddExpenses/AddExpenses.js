import React, { useState, useEffect } from 'react';
import './addExpenses.css';

function AddExpenses({ loggedInUsername }) {
  const [newExpense, setNewExpense] = useState({
    id: Date.now(), // Generate a unique ID using the current timestamp
    username: loggedInUsername,
    description: '',
    amount: '',
    status: 'Pending',
  });
  const [expensesList, setExpensesList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load expenses from local storage on component mount
    const storedExpenses = localStorage.getItem('expensesList');
    if (storedExpenses) {
      setExpensesList(JSON.parse(storedExpenses));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = () => {
    // Generate a unique ID for the new expense
    const updatedNewExpense = { ...newExpense, id: Date.now() };

    const updatedExpensesList = [...expensesList, updatedNewExpense];
    setExpensesList(updatedExpensesList);

    // Save expenses list to local storage
    localStorage.setItem('expensesList', JSON.stringify(updatedExpensesList));

    setNewExpense({
      id: Date.now(),
      username: loggedInUsername,
      description: '',
      amount: '',
      status: 'Pending',
    });
    setMessage('Expense added successfully.');
  };

  // Filter the expenses to display only the ones submitted by the user
  const userExpenses = expensesList.filter((expense) => expense.username === loggedInUsername);

  return (
    <div className="content">
      <h3>Add Expenses</h3>
      <p>Add expenses with staff usernames:</p>

      <div className="expense-form">
        <input type="text" name="username" value={newExpense.username} readOnly />
        <input
          type="text"
          name="description"
          placeholder="Expense Description"
          value={newExpense.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleInputChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="expense-list">
        <h3>Your Submitted Expenses</h3>
        <table>
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Staff Username</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.id}</td>
                <td>{expense.username}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddExpenses;
