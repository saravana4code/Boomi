import React, { useEffect, useState } from 'react';
import '../components/Accordion.css'; // Updated import path 

import AGCompanyDetailPage from './AGCompanyDetailPage';
import CompanyRoletype from '../Principle/CompanyRoletype/CompanyRoletype';
import CompanyOperating from '../Principle/Company Operating/CompanyOperating';
 
function Accordion() {

useEffect(()=>{

  //1.api
  //var oneapi

  //2.api
  //var secapi

  //3.api
  //var thridapi

});

  const accordionData = [
    {
      title: 'Company',
      component: <AGCompanyDetailPage />,
    },
    {
      title: 'Company Roletype',
      component: <CompanyRoletype />,
    },
    {
      title: 'Company Operating',
      component: <CompanyOperating />,
    },
  ];

  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    if (activeAccordion === index) {
      // Clicking on the currently open accordion should close it.
      setActiveAccordion(null);
    } else {
      // Clicking on a closed accordion should open it and close others.
      setActiveAccordion(index);
    }
  };
  const handleButtonClick=()=>{
    window.location.replace('/DashboardPage');
   }
  

  return (
    <div>
    <div>
    <button className="top-right-button" onClick={handleButtonClick}>
      Back
    </button>
    </div>
    <div className="accordion-container">
      {accordionData.map((accordion, index) => (
        <div key={index}>
          <button
            className={`accordion-button ${activeAccordion === index ? 'active' : ''}`}
            onClick={() => handleAccordionClick(index)}
          >
            <h1>{accordion.title}</h1>
            <span className="arrow-icon">{activeAccordion === index ? '▼' : '▶'}</span>
          </button>
          <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
            {accordion.component}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Accordion;
