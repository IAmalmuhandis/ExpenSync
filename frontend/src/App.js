import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Setting from './Pages/Setting/Setting';
import ReviewExpense from './Pages/ReviewExpense/ReviewExpense';
import ManageStaff from './Pages/ManageStaff/ManageStaff';
import AddExpenses from './Pages/AddExpenses/AddExpenses';
import StaffDashboard from './Pages/StaffDashboard/StaffDashboard';

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="*" element={<Home/>} />
          <Route path="review-expense" element={<ReviewExpense />} />
          <Route path="manage-staff" element={<ManageStaff />} />
        </Route>
        <Route path="/staff-dashboard/*" element={<StaffDashboard />}>
          <Route path="*" element={<Home/>} />
          <Route
          path="add-expenses"
          element={<AddExpenses loggedInUsername={localStorage.getItem('loggedInStaff')} />}
        />
        </Route>
       
        </Routes>
    </>
  );
}

export default App;
