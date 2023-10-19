import React from 'react';
function CompanyRole(){
    const Handlechange=()=>{

    }
    const logstatus = sessionStorage.getItem("Login_status");
    console.log("Result1 "+ logstatus);
    if (logstatus=="false") {
      console.log("Result2"+logstatus);
      // User is not logged in
      window.location.replace('/');
    }

  else{  
    return(
<div>
    <label>ProcessCode</label>
<input
          type="text"
          placeholder="Search..."
         
          onChange={Handlechange()}
        />
        <label>ProcessCode</label>
<input
          type="text"
          placeholder="Search..."
          
          onChange={Handlechange()}
        />
        <label>ProcessCode</label>
<input
          type="text"
          placeholder="Search..."
          
          onChange={Handlechange()}
        />
        <label>ProcessCode</label>
<input
          type="text"
          placeholder="Search..."
          
          onChange={Handlechange()}
        />
        <label>ProcessCode</label>
<input
          type="text"
          placeholder="Search..."
          
          onChange={Handlechange()}
        />
</div>
    );
  }
}
export default CompanyRole;