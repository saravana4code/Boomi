import React, { useState, useEffect } from 'react';



function CompanyOperatingForm({ rowData, onSave, onCancel}) {


  // const [companyData, setCompanyData] = useState(JSON.parse(companydata));
  const [editedData, setEditedData] = useState(rowData);
  
  const [isChecked, setIsChecked] = useState(false);
  // useEffect(() => {
  //   // try {
  //   //   const parsedCompanyData = JSON.parse(companydata);
  //   //   setCompanyData(parsedCompanyData);
  //   // } catch (error) {
  //   //   console.error('Error parsing companydata:', error);
  //   // }
  //   console.log(companyData);
  // }, [companyData]);

console.log(rowData);
// console.log(companyData);

// console.log(apiResponseData);
    const [formData, setFormData] =useState({
      ProcessCode: '',
      OperatingEntityCode: '',
      CompanyCode: '',
      RoleTypeCode: '',
      RoleSubTypeCode: '',
      CurrencyCode: '',
      IsTaxLiable: '',
      PersonalEmail: '',
      Telephone: '',

    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
 
 const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setFormData({ ...formData, [name]: checked });
  setIsChecked(checked);
};
console.log(formData);

const SetDataForm = async() => {

  //    await setFormData({...formData, ProcessCode: editedData.ProcessCode, CompanyCode: editedData.CompanyCode});
      var datas = formData;
      
      datas.OperatingEntityCode  = editedData.OperatingEntityCode ;
      datas.ProcessCode = editedData.ProcessCode;
      datas.CompanyCode = editedData.CompanyCode;
      datas.RoleTypeCode  = editedData.RoleTypeCode ;
      datas.RoleSubTypeCode  = editedData.RoleSubTypeCode ;
      datas.CurrencyCode  = editedData.currency ;

      console.log(datas);
      
      onSave(datas);
  
  }
  


    return ( 
       
        <div>
    <h2 className="text-center mb-4">Company Operating Form</h2>
      <div className="form-container">
    
      <div className="column">
       

    
        <div className="field">
          <label htmlFor="ProcessCode">ProcessCode <span className="required">*</span></label>
          <br/>
          <input
            type="text"
            id="ProcessCode"
            name="ProcessCode"
            value={editedData.ProcessCode}
            
            required
          />
         
        </div>

        <div className="field">
          <label htmlFor="OperatingEntityCode">Operating Entity <span className="required">*</span></label>
          <br/>
          <input
            type="text"
            id="OperatingEntityCode"
            name="OperatingEntityCode"
            value={editedData.OperatingEntityCode}
           
            required
          />
         
        </div>
        <div className="field">
          <label htmlFor="RoleTypeCode  ">Role Type </label>
          <br/>
          <input
            type="text"
            id="RoleTypeCode  "
            name="RoleTypeCode  "
            value={editedData.RoleTypeCode}
            
          />
        </div>
        <div className='field'>
      <label htmlFor="RoleSubTypeCode ">Role SubType </label>
      <br/>
      <input
        type="text"
        id="RoleSubTypeCode "
        name="RoleSubTypeCode "
        value={editedData.RoleSubTypeCode }
        
      />
    </div>
    <div className='field'>
      <label htmlFor="CurrencyCode ">Currency <span className="required">*</span></label>
      <br/>
      <input
        type="text"
        id="CurrencyCode "
        name="CurrencyCode "
        value={editedData.currency}
       
        required
      />
     
    </div>
   
    <div className='field'>
      <label htmlFor="IsTaxLiable ">IsTaxLiable  <span className="required">*</span></label>
      <br/>
      <input
  type="checkbox"
  id="IsTaxLiable"
  name="IsTaxLiable"
  checked={isChecked}
  onChange={handleCheckboxChange}
/>
      
    </div>
  

        {/* Add more fields for the first column here */}
      </div>

      <div className="column">
      
      <div className='field'>
        <label htmlFor="PersonalEmail">Personal Email  <span className="required">*</span></label>
        <br/>
        <input
          type="text"
          id="PersonalEmail"
          name="PersonalEmail"
          value={formData.PersonalEmail}
          onChange={handleInputChange}
          required
        />
       
      </div>
      <div className='field'>
        <label htmlFor="Telephone">Telephone </label>
        <br/>
        <input
          type="tel"
          id="Telephone"
          name="Telephone"
         value={formData.Telephone}
          onChange={handleInputChange}
          
        />
        
      </div>

     
        {/* Add more fields for the second column here */}
      </div>
    </div>

    {/* ... Add your remaining fields here */}
  
    <div className="savebutton">
    <button onClick={()=>{SetDataForm()}} >  Save         </button>
      <button
     
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      {/* <ToastContainer /> */}
      </div>
 
     );
}

export default CompanyOperatingForm;