import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import the Select component from the 'react-select' library
import axios from 'axios';
import '../components/EditCompanyPopup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



function EditCompanyPopup({ rowData, onSave, onCancel}) {

  console.log(rowData);

  const [editedData, setEditedData] = useState(rowData);

  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);

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
          value: item.id,
          label: item.currency,
        }));
        setOptions3(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data for dropdown 3:', error);
      });
  }, []);



  const handleChange1 = (selectedOption) => {
    setEditedData({ ...editedData, operatingentity: selectedOption });
  };

  const handleChange2 = (selectedOption) => {
    setEditedData({ ...editedData, registeredaddress: selectedOption });
  };

  const handleChange3 = (selectedOption) => {
    setEditedData({ ...editedData, currency: selectedOption });
  };
  

  // const handleSaveClick = async () => {
  //   const apiUrl='https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/edit';
  //   const apiKey = 'VhbIH1ut7y4t17XxxKF0i36nNnRJGWd8KiJmWCgi';
  //   console.log("method called");

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-api-key': apiKey,
  //       },
  //       body: JSON.stringify(editedData),
  //     })
  //     // .then(result=> console.log(result)).then(json=>console.log(json));

  //     if (response.ok) {
  //        onSave(editedData);
       
  //     //   const lambdaResponse = await response.json();
  //     // // Handle the Lambda response here
  //     // console.log(lambdaResponse);
  //     toast.success('Data Update successfully!');
      
  //     } else {
  //       // Handle error here
  //     }
  //   } catch (error) {
  //     toast.error('Data not Saved!');
  //     // Handle error here
  //   }
   


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const logstatus = sessionStorage.getItem("Login_status");
   console.log("Result1 "+ logstatus);
   if (logstatus=="false") {
     console.log("Result2"+logstatus);
     // User is not logged in
     window.location.replace('/');
   }
  
   else{
  return (
    <div className="edit-popup">
      <h2>Edit Company</h2>
      <label>
      Company Code:
        <input
          type="text"
          name="companyCode"
          value={editedData.companyCode}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={editedData.companyName}
          onChange={handleInputChange}
        />
      </label>
      <label>
      Company Short name:
        <input
          type="text"
          name="CompanyShortname"
          value={editedData.CompanyShortname}
          onChange={handleInputChange}
        />
      </label>
      <label>
      Company Medium name:
        <input
          type="text"
          name="companyMediumname"
          value={editedData.companyMediumname}
          onChange={handleInputChange}
        />
      </label>
      <label>
      Company Email:
        <input
          type="text"
          name="companyemail"
          value={editedData.companyemail}
          onChange={handleInputChange}
        />
      </label>
      <label>
      Web Address:
        <input
          type="text"
          name="webaddress"
          value={editedData.webaddress}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="operatingentity">Operating Entity  <span className="required">*</span></label>
      <br/>
      <Select
   
        id="operatingentity"
        name="operatingentity"
       
        onChange={handleChange1}
        options={options1}
         isClearable={true}
        placeholder={editedData.operatingentity}
        required

      />
       
    
      <label>
      Telephone:
        <input
          type="tel"
          name="telephone"
          value={editedData.telephone}
          onChange={handleInputChange}
        />
      </label>
      <label>
      FAX:
        <input
          type="text"
          name="fax"
          value={editedData.fax}
          onChange={handleInputChange}
        />
      </label>
      <label>
      Registration Number:
        <input
          type="text"
          name="registrationnumber"
          value={editedData.registrationnumber}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor='currency'>Currency <span className="required">*</span></label>
      <br/>
      <Select
        id="currency"
        name="currency"
        onChange={(selectedOption) => handleChange3(selectedOption.value)}
        options={options3}
        isClearable={true}
        placeholder={editedData.currency}
        required
      />
      
      <label>
      Coverage:
        <input
          type="text"
          name="coverage"
          value={editedData.coverage}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor='registeredaddress'>Registered Address<span className="required">*</span></label>
      <br/>
      <Select
        id="registeredaddress"
        name="registeredaddress"
        onChange={handleChange2}
        options={options2}
        isClearable={true}
        placeholder={editedData.registeredaddress}
        required
      />
   
      <label>
      IsISSOffice:
        <input
          type="checkbox"
          name="vehicle1"
          value={editedData.vehicle1}
          onChange={handleInputChange}
        />
      </label>
      {/* Add similar input fields for other fields you want to edit */}
      <button onClick={()=>{console.log(editedData)}}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
   }
}

export default EditCompanyPopup;
