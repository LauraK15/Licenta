import {Routes,Route } from "react-router-dom"
import Login from "./components/Auth/login";
import AuthBody from "./components/Auth/AuthBody";

import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Attendace from './pages/Attendance';
import Candidates from './pages/Candidates';
import Holidays from './pages/Holidays';
import Jobs from './pages/Jobs';
import Leaves from './pages/Leaves';
import Payroll from './pages/Payroll';
import Settings from './pages/Settings';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
      <div className="App">
         <Toaster position="top-right" />
         
       <Routes>
         <Route exact path="/auth" element={<AuthBody/>}/>
         <Route path="/*" element={<MainLayout />}/>
       </Routes>
      </div>
      
  );
}

export default App;
