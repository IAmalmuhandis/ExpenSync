import React, { useEffect, useState } from 'react';
import './home.css';

function Home() {
  const [expenseAnalytics, setExpenseAnalytics] = useState({
    totalExpenses: 0,
    approvedExpenses: 0,
    pendingExpenses: 0,
    rejectedExpenses: 0,
  });

  useEffect(() => {
    // Load expenses from local storage on component mount
    const storedExpenses = localStorage.getItem('expensesList');
    if (storedExpenses) {
      const expenses = JSON.parse(storedExpenses);

      // Calculate the expense analytics
      const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      const approvedExpenses = expenses.filter(expense => expense.status === 'Approved')
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);
      const pendingExpenses = expenses.filter(expense => expense.status === 'Pending')
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);
      const rejectedExpenses = expenses.filter(expense => expense.status === 'Declined')
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);

      setExpenseAnalytics({
        totalExpenses,
        approvedExpenses,
        pendingExpenses,
        rejectedExpenses,
      });
    }
  }, []);

  return (
    <div className="content">
      <h3>Expense Analytics Overview</h3>
      <p>Get a quick overview of your expense data and analytics:</p>

      <div className="overview">
        <div className="overview-item">
          <h4>Total Expenses</h4>
          <p>N{expenseAnalytics.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="overview-item">
          <h4>Approved Expenses</h4>
          <p>N{expenseAnalytics.approvedExpenses.toFixed(2)}</p>
        </div>
        <div className="overview-item">
          <h4>Pending Expenses</h4>
          <p>N{expenseAnalytics.pendingExpenses.toFixed(2)}</p>
        </div>
        <div className="overview-item">
          <h4>Rejected Expenses</h4>
          <p>N{expenseAnalytics.rejectedExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
