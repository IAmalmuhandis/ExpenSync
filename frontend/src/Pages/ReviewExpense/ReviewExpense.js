import React, { useState, useEffect } from 'react';
import './reviewExpense.css';

function ReviewExpense() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Load expenses from local storage on component mount
    const storedExpenses = localStorage.getItem('expensesList');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const approveExpense = (expenseId) => {
    // Find the expense to be approved
    const expenseToApprove = expenses.find((expense) => expense.id === expenseId);

    // Check if the expense is found
    if (expenseToApprove) {
      // Update the status of the expense to 'Approved'
      expenseToApprove.status = 'Approved';

      // Update the expenses list in local storage
      localStorage.setItem('expensesList', JSON.stringify(expenses));
    }
  };

  const declineExpense = (expenseId) => {
    // Find the expense to be declined
    const expenseToDecline = expenses.find((expense) => expense.id === expenseId);

    // Check if the expense is found
    if (expenseToDecline) {
      // Update the status of the expense to 'Declined'
      expenseToDecline.status = 'Declined';

      // Update the expenses list in local storage
      localStorage.setItem('expensesList', JSON.stringify(expenses));
    }
  };

  const deleteExpense = (expenseId) => {
    // Find the index of the expense to be deleted
    const indexToDelete = expenses.findIndex((expense) => expense.id === expenseId);

    // Check if the expense is found
    if (indexToDelete !== -1) {
      // Remove the expense from the list
      expenses.splice(indexToDelete, 1);

      // Update the expenses list in local storage
      localStorage.setItem('expensesList', JSON.stringify(expenses));

      // Update the component state
      setExpenses([...expenses]);
    }
  };

  return (
    <div className="content">
      <h3>Review Expenses</h3>
      <p>Review and approve, decline, or delete submitted expenses:</p>

      <table className="expense-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.username}</td>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td className={expense.status === 'Approved' ? 'approved' : 'pending'}>
                {expense.status}
              </td>
              <td>
                {expense.status === 'Pending' && (
                  <>
                    <button onClick={() => approveExpense(expense.id)}>Approve</button>
                    <button onClick={() => declineExpense(expense.id)}>Decline</button>
                  </>
                )}
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewExpense;
