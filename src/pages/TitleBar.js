import React from 'react';
import '../components/TitleBar.css'; // Import your CSS file for styling

const TitleBar = () => {
    const handlelogout=()=>{
        window.location.replace('/');
    }
  return (
    <div className="title-bar">
      <div className="left-side">CompanyDashboard</div>
      <div className="right-side">
        <button className="logout-button" onClick={handlelogout}>Logout</button>
      </div>
    </div>
  );
};

export default TitleBar;
