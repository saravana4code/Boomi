import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NewCompanydetailPage from './pages/NewCompanydetailPage';
import DashboardPage from './pages/DashboardPage';
import AGCompanyDetailPage from './pages/AGCompanyDetailPage';
import Accordion from './pages/Accordion';
import Company from './Principle/Company/Company';
import GoldenRecord from './Principle/Golden Record/GoldenRecord';
import Modal from 'react-modal';
import CompanyRole from './pages/CompanyRole';
import CompanyRoletype from './Principle/CompanyRoletype/CompanyRoletype';
import CompanyOperating from './Principle/Company Operating/CompanyOperating';
import CompanyOperatingForm from './Principle/Company Operating/CompanyOperatingForm';
import CompanyRoletypeForm from './Principle/CompanyRoletype/CompanyRoletypeForm';

Modal.setAppElement('#root'); 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/DashboardPage" element={<DashboardPage/>} />
        <Route path="/NewCompanydetailPage" element={<NewCompanydetailPage/>} />
        <Route path="/AGCompanyDetailPage" element={<AGCompanyDetailPage/>} />
        <Route path="/CompanyRole" element={<CompanyRole/>} />
        <Route path="/Accordion" element={<Accordion/>} />
        <Route path="/Company" element={<Company/>} />
        <Route path="/CompanyRoletype" element={<CompanyRoletype/>} />
        <Route path="/CompanyOperating" element={<CompanyOperating/>} />
        <Route path="/CompanyOperatingForm" element={<CompanyOperatingForm/>} />
        <Route path="/CompanyRoletypeForm" element={<CompanyRoletypeForm/>} />
        <Route path="/GoldenRecord" element={<GoldenRecord/>} />

       
      </Routes>
      </BrowserRouter> 
  );
}

export default App;
