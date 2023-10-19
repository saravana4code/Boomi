import React from 'react';
import '../components/TitleBar.css'; // Import your CSS file for styling

const TitleBar = () => {
    const handlelogout=()=>{
      sessionStorage.setItem("Login_status",false);
      window.location.replace('/');
    }

    const logstatus = sessionStorage.getItem("Login_status");
    //console.log("Result1 "+ logstatus);
    if (logstatus=="false") {
      //console.log("Result2"+logstatus);
      // User is not logged in
      window.location.replace('/');
    } 

  else{  
  return (
    <div className="title-bar">
      <div className="left-side">Title Name</div>
      <div className="right-side">
        <button className="logout-button" onClick={handlelogout}>Logout</button>
      </div>
    </div>
  );
}
}

export default TitleBar;
