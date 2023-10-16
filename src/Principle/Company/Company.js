import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
// import '../components/NewCompanydetailPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Company.css'

function Company() {
  // Create a form with dropdowns and handle saving data to your MySQL database
  // Navigate to the Company Detail page on successful save

  const [formData, setFormData] = useState({
    ProcessCode : '',
    CompanyName : '',
    CompanyNameShort : '',
    CompanyEmail :'',
    WebAddress :'',
    OperatingEntityCode :'',
    IsISSOffice :'',
    Telephone : '',       
    RegistrationNumber : '',
    CurrencyCode : '',
    RegisteredAddress: '',
    Flag : '',
    statu_s:'',
   
  });
  const [statusSelectedOption, setStatusSelectedOption] = useState('new');
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [options1, setOptions1] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState(null);

  const [options2, setOptions2] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const [options3, setOptions3] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState(null);

  const handleChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
    setFormData({ ...formData, OperatingEntityCode: selectedOption ? selectedOption.label : '' });
  };
  
  const handleChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    setFormData({ ...formData, RegisteredAddress: selectedOption ? selectedOption.label : '' });
  };
  
  const handleChange3 = (selectedOption) => {
    setSelectedOption3(selectedOption);
    setFormData({ ...formData, CurrencyCode: selectedOption ? selectedOption.value : '' });
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
 
  useEffect(() => {
    // Fetch data for dropdown 1
    axios
      .get('https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/operatingEntity')
      .then((response) => {
        const data = JSON.parse(response.data.body);
        const formattedOptions = data.map((item) => ({
          value: item.id,
          label: item.operationEntity,
        }));
        setOptions1(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data for dropdown 1:', error);
      });

    // Fetch data for dropdown 2
    axios
      .get('https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/registeredAddress')
      .then((response) => {
        const data = JSON.parse(response.data.body);

        const formattedOptions = data.map((item) => ({
         
          value: item.id,
          label: item.registeredaddress,
        }));

        setOptions2(formattedOptions);
        
      })
      .catch((error) => {
        console.error('Error fetching data for dropdown 2:', error);
      });

    // Fetch data for dropdown 3
    axios
      .get('https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/currency')
      .then((response) => {
        const data = JSON.parse(response.data.body);

       console.log(data);

        const formattedOptions = data.map((item) => ({
          value: item.guid,
          label: item.currency,
          
        }));
        
       console.log(formattedOptions.value);
        setOptions3(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data for dropdown 3:', error);
      });
  }, []);



  const handleSelectChange =(e)=>{
    const selectedOption = e.target.value;
  setSelectedOption(selectedOption);
  setFormData({ ...formData, Flag: selectedOption }); 
}

  const handleStatusChange =(e)=>{
    const statusSelectedOption = e.target.value;
    console.log(statusSelectedOption);

  setStatusSelectedOption(statusSelectedOption);
  setFormData({ ...formData, statu_s: statusSelectedOption }); 
}


  const [validationErrors, setValidationErrors] = useState({});

  const isValidPhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
  };
  const handleInputChange = (e) => {
   
    const { name, value, type } = e.target;

  if (type === "checkbox") {
    // Handle checkbox input separately
    const checkboxValue = value === "1" ? true : false;
    setFormData({ ...formData, [name]: checkboxValue });
  } else {
    // Handle other input types
    setFormData({ ...formData, [name]: value });
  }

  // Reset validation errors for the field
  setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(e);
    const apiKey = 'VhbIH1ut7y4t17XxxKF0i36nNnRJGWd8KiJmWCgi';
    const apiUrl = 'https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/formsubmit';

    const errors = {};

    console.log(formData);

   

    if (!formData.CompanyName.trim()) {
      errors.companyName = 'Company Name is required';
    }

    if (!formData.CompanyEmail.trim()) {
      errors.CompanyEmail = 'Company Email is required';
    } else if (!isValidEmail(formData.CompanyEmail)) {
      errors.CompanyEmail = 'Invalid email format';
    }

    if (!formData.Telephone.trim()) {
      errors.Telephone = 'Telephone is required';
    } else if (!isValidPhoneNumber(formData.Telephone)) {
      errors.Telephone = 'Invalid phone number format';
    }
    if (!formData.RegistrationNumber.trim()) {
      errors.RegistrationNumber = 'Registration Number is required';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
     
      try {
  const response = await fetch(apiUrl,{
    method: 'POST', // Adjust the method as needed
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  });
    
    if (response.ok) {
      const lambdaResponse = await response.json();
      // Handle the Lambda response here
      console.log(lambdaResponse);
      toast.success('Data saved successfully!');
      window.location.replace('/Accordion');
      console.log('Data submitted successfully:', response.data);
    } else {
      // Handle any errors here
      console.error('Error:', response.statusText);
      toast.error('Error occurred while saving data.');
    }

  
} catch (error) {
  console.error('Error:', error);
  toast.error('Error occurred while saving data.');
}

    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const [showForm, setShowForm] = useState(false);
  const handleCreateCompany =()=>{
    setShowForm(true);
  }

  return (



    <form onSubmit={handleSubmit}>
        <div>
    <h2 className="text-center mb-4">Company-Company Model</h2>
      <div className="form-container">
    
      <div className="column">
      

    
        <div className="field">
          <label htmlFor="ProcessCode">ProcessCode <span className="required">*</span></label>
          <br/>
          <input
            type="text"
            id="ProcessCode"
            name="ProcessCode"
            value={formData.ProcessCode}
            onChange={handleInputChange}
            required
          />
          {validationErrors.ProcessCode && (
            <span className="error">{validationErrors.ProcessCode}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="CompanyName">Company Name <span className="required">*</span></label>
          <br/>
          <input
            type="text"
            id="CompanyName"
            name="CompanyName"
            value={formData.CompanyName}
            onChange={handleInputChange}
            required
          />
          {validationErrors.CompanyName && (
            <span className="error">{validationErrors.CompanyName}</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="CompanyNameShort">Company Short name</label>
          <br/>
          <input
            type="text"
            id="CompanyNameShort"
            name="CompanyNameShort"
            value={formData.CompanyNameShort}
            onChange={handleInputChange}
          />
        </div>
       
    <div className='field'>
      <label htmlFor="CompanyEmail">Company Email <span className="required">*</span></label>
      <br/>
      <input
        type="text"
        id="CompanyEmail"
        name="CompanyEmail"
        value={formData.CompanyEmail}
        onChange={handleInputChange}
        required
      />
      {validationErrors.CompanyEmail && (
        <span className="error">{validationErrors.CompanyEmail}</span>
      )}
    </div>
   
    <div className='field'>
      <label htmlFor="OperatingEntityCode">Operating Entity  <span className="required">*</span></label>
      <br/>
      <Select
   
        id="OperatingEntityCode"
        name="OperatingEntityCode"
        value={selectedOption1}
        onChange={handleChange1}
        options={options1}
        isClearable={true}
        placeholder="Select an option..."
        required

      />
        {validationErrors.OperatingEntityCode && (
        <span className="error">{validationErrors.OperatingEntityCode}</span>
      )}
    </div>
    {/* <div className='field'>
      <label htmlFor='statu_s'>Status</label>
      <br/>
      <select id='statu_s' name='statu_s' value={statusSelectedOption} onChange={handleStatusChange}>
  
        <option value="New">New</option>
        <option value="Closed">Closed</option>
      </select>
    </div> */}
  

        {/* Add more fields for the first column here */}
      </div>

      <div className="column">
      
      <div className='field'>
        <label htmlFor="Telephone">Telephone <span className="required">*</span></label>
        <br/>
        <input
          type="tel"
          id="Telephone"
          name="Telephone"
          value={formData.Telephone}
          onChange={handleInputChange}
          required
        />
        {validationErrors.Telephone && (
          <span className="error">{validationErrors.Telephone}</span>
        )}
      </div>
      <div className='field'>
        <label htmlFor="RegistrationNumber">Registration Number</label>
        <br/>
        <input
          type="text"
          id="RegistrationNumber"
          name="RegistrationNumber"
          value={formData.RegistrationNumber}
          onChange={handleInputChange}
          
        />
        
      </div>

      <div className='field'>
      <label htmlFor="WebAddress">Web Address <span className="required">*</span></label>
      <br/>
      <input
        type="text"
        id="WebAddress"
        name="WebAddress"
        value={formData.WebAddress}
        onChange={handleInputChange}
      />
        {validationErrors.WebAddress && (
        <span className="error">{validationErrors.WebAddress}</span>
      )}
    </div>

      <div className='field'>
      <label htmlFor='CurrencyCode'>Currency <span className="required">*</span></label>
      <br/>
      <Select
        id="CurrencyCode"
        name="CurrencyCode"
        value={selectedOption3}
        onChange={handleChange3}
        options={options3}
        isClearable={true}
        placeholder="Select an option..."
        required
      />
    </div>
   

      <div className='field'>
      <label htmlFor='registeredaddress'>Registered Address<span className="required">*</span></label>
      <br/>
      <Select
        id="registeredaddress"
        name="registeredaddress"
        value={selectedOption2}
        onChange={handleChange2}
        options={options2}
        isClearable={true}
        placeholder="Select an option..."
        required
      />
    </div>
    <div className='field'>
      <label htmlFor='Flag'>Flag<span className="required">*</span></label>
      <br/>
      <select id='Flag' name='Flag' value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="New">New</option>
        <option value="Update">Update</option>
      </select>
    </div>
   
    <div  className='field'>
        <input
          type="checkbox"
          id="IsISSOffice"
          name="IsISSOffice"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="IsISSOffice">IsISSOffice</label>
        <br />
      </div>
        {/* Add more fields for the second column here */}
      </div>
    </div>

    {/* ... Add your remaining fields here */}

    <div className="savebutton">
      <button type="submit">Submit</button>
      <button
          type="cancel"
          onClick={() => {
            // Redirect to DashboardPage on "Cancel" button click
            window.location.replace('/Accordion');
          }}
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
      </div>
  </form>
  
);
}

export default Company;