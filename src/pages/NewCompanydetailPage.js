import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../components/NewCompanydetailPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function NewCompanydetailPage() {
  // Create a form with dropdowns and handle saving data to your MySQL database
  // Navigate to the Company Detail page on successful save

  const [formData, setFormData] = useState({
    companyCode: '',
    companyName: '',
    CompanyShortname: '',
    companyMediumname: '',
    operatingentity:'',
    isISSOffice:'',
    registeredaddress:'',
    currency:'',
    companyemail: '',       
    salesforce: '',
    webaddress: '',
    telephone: '',
    fax: '',
    registrationnumber: '',
    coverage: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const [options1, setOptions1] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState(null);

  const [options2, setOptions2] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const [options3, setOptions3] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState(null);

  const handleChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
    setFormData({ ...formData, operatingentity: selectedOption ? selectedOption.label : '' });
  };
  
  const handleChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    setFormData({ ...formData, registeredaddress: selectedOption ? selectedOption.label : '' });
  };
  
  const handleChange3 = (selectedOption) => {
    setSelectedOption3(selectedOption);
    setFormData({ ...formData, currency: selectedOption ? selectedOption.value : '' });
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
 
  useEffect(() => {
    // Fetch data for dropdown 1
    axios
      .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/OperEntity')
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
      .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/RegAddress')
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
      .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/Currency')
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
    const apiUrl = 'https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/formsubmit';

    const errors = {};

    console.log(formData);

    if (!formData.companyCode.trim()) {
      errors.companyCode = 'Company Code is required';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company Name is required';
    }

    if (!formData.companyemail.trim()) {
      errors.companyemail = 'Company Email is required';
    } else if (!isValidEmail(formData.companyemail)) {
      errors.companyemail = 'Invalid email format';
    }

    if (!formData.telephone.trim()) {
      errors.telephone = 'Telephone is required';
    } else if (!isValidPhoneNumber(formData.telephone)) {
      errors.telephone = 'Invalid phone number format';
    }
    if (!formData.registrationnumber.trim()) {
      errors.registrationnumber = 'Registration Number is required';
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
      window.location.replace('/AGCompanyDetailPage');
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

  const logstatus = sessionStorage.getItem("Login_status");
  console.log("Result1 "+ logstatus);
  if (logstatus=="false") {
    console.log("Result2"+logstatus);
    // User is not logged in
    window.location.replace('/');
  }

  else {
  return (





    <form onSubmit={handleSubmit}>
        <div>
    <h2 className="text-center mb-4">Company-Company Model</h2>
      <div className="form-container">
    
      <div className="column">
      

    
        <div className="field">
          <label htmlFor="companyCode">Company Code <span className="required">*</span></label>
          <br/>
          <input
            type="text"
            id="companyCode"
            name="companyCode"
            value={formData.companyCode}
            onChange={handleInputChange}
            required
          />
          {validationErrors.companyCode && (
            <span className="error">{validationErrors.companyCode}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="companyName">Company Name <span className="required">*</span></label>
          <br/>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
          {validationErrors.companyName && (
            <span className="error">{validationErrors.companyName}</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="CompanyShortname">Company Short name</label>
          <br/>
          <input
            type="text"
            id="CompanyShortname"
            name="CompanyShortname"
            value={formData.CompanyShortname}
            onChange={handleInputChange}
          />
        </div>
        <div className='field'>
      <label htmlFor="companyMediumname">Company Medium name</label>
      <br/>
      <input
        type="text"
        id="companyMediumname"
        name="companyMediumname"
        value={formData.companyMediumname}
        onChange={handleInputChange}
      />
    </div>
    <div className='field'>
      <label htmlFor="companyemail">Company Email <span className="required">*</span></label>
      <br/>
      <input
        type="text"
        id="companyemail"
        name="companyemail"
        value={formData.companyemail}
        onChange={handleInputChange}
        required
      />
      {validationErrors.companyemail && (
        <span className="error">{validationErrors.companyemail}</span>
      )}
    </div>
    <div className='field'>
      <label htmlFor="webaddress">Web Address <span className="required">*</span></label>
      <br/>
      <input
        type="text"
        id="webaddress"
        name="webaddress"
        value={formData.webaddress}
        onChange={handleInputChange}
      />
        {validationErrors.webaddress && (
        <span className="error">{validationErrors.webaddress}</span>
      )}
    </div>
    <div className='field'>
      <label htmlFor="operatingentity">Operating Entity  <span className="required">*</span></label>
      <br/>
      <Select
   
        id="operatingentity"
        name="operatingentity"
        value={selectedOption1}
        onChange={handleChange1}
        options={options1}
        isClearable={true}
        placeholder="Select an option..."
        required

      />
        {validationErrors.operatingentity && (
        <span className="error">{validationErrors.operatingentity}</span>
      )}
    </div>
  

        {/* Add more fields for the first column here */}
      </div>

      <div className="column">
      
      <div className='field'>
        <label htmlFor="telephone">Telephone <span className="required">*</span></label>
        <br/>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          required
        />
        {validationErrors.telephone && (
          <span className="error">{validationErrors.telephone}</span>
        )}
      </div>
      <div className='field'>
        <label htmlFor="fax">FAX</label>
        <br/>
        <input
          type="text"
          id="fax"
          name="fax"
          value={formData.fax}
          onChange={handleInputChange}
          
        />
        
      </div>
      <div className='field'>
        <label htmlFor="registrationnumber">Registration Number <span className="required">*</span></label>
        <br/>
        <input
          type="text"
          id="registrationnumber"
          name="registrationnumber"
          value={formData.registrationnumber}
          onChange={handleInputChange}
          required
        />
        {validationErrors.registrationnumber && (
          <span className="error">{validationErrors.registrationnumber}</span>
        )}
      </div>
      <div className='field'>
      <label htmlFor='currency'>Currency <span className="required">*</span></label>
      <br/>
      <Select
        id="currency"
        name="currency"
        value={selectedOption3}
        onChange={handleChange3}
        options={options3}
        isClearable={true}
        placeholder="Select an option..."
        required
      />
    </div>
    <div className='field'>
        <label htmlFor="coverage">Coverage</label>
        <br/>
        <input
          type="text"
          id="coverage"
          name="coverage"
          value={formData.coverage}
          onChange={handleInputChange}
      
        />
        {validationErrors.coverage && (
          <span className="error">{validationErrors.coverage}</span>
        )}
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
    <div  className='field'>
        <input
          type="checkbox"
          id="vehicle1"
          name="vehicle1"
          value="Bike"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="vehicle1">IsISSOffice</label>
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
}

export default NewCompanydetailPage;