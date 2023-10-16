import{ useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function EditCompanyPage() {
    const Updateddata = {
        companyCode: '',
        companyName: '',
        CompanyShortname: '',
        companyMediumname: '',
        companyemail: '',
        operatingentity: '',
        webaddress: '',
        issoffice: '',
        telephone: '',
        fax: '',
        registeredaddress: '',
        currency: '',
        registrationnumber: '',
        coverage: '',
      };
    

      
  // To set the Data into a usestate for Updating Issues
  const [empId,setId] = useState('');
  const [CompanyShortname, setCompanyShortname] = useState("");
  const [companyCode, setcompanyCode] = useState('');
  const [companyMediumname, setcompanyMediumname] = useState("");
  const [companyName, setcompanyName] = useState('');
  const [companyemail, setcompanyemail] = useState();

  const [coverage, setcoverage] = useState('');
  const [currency, setcurrency] = useState('');
  const [issoffice, setissoffice] = useState('');
  const [fax, setfax] = useState('')
  const [operatingentity,setoperatingentity] = useState('');
  const [registeredaddress,setregisteredaddress] = useState('');

  const [registrationnumber, setregistrationnumber] = useState('')
  const [telephone,settelephone] = useState('');
  const [webaddress,setwebaddress] = useState('');


      const [validationErrors, setValidationErrors] = useState({});
      const [isFormSubmitted, setIsFormSubmitted] = useState(false);
      const [selectedOption1, setSelectedOption1] = useState(null);
      const [selectedOption2, setSelectedOption2] = useState(null);
      const [selectedOption3, setSelectedOption3] = useState(null);
    
      const [options1, setOptions1] = useState([]);
      const [options2, setOptions2] = useState([]);
      const [options3, setOptions3] = useState([]);
    
    
    
       const handleSubmit = async (e) => {
        //e.preventDefault();
        const apiKey = 'VhbIH1ut7y4t17XxxKF0i36nNnRJGWd8KiJmWCgi';
        const apiUrl = 'https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/formsubmit';
        const errors = {};
       

        if (Object.keys(errors).length === 0) {
          try {
            const response = await fetch(apiUrl,{
              method: 'POST',
              body: JSON.stringify(Updateddata),
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
              },
            });
    
            if (response.ok) {
              const lambdaResponse = await response.json();

              console.log(lambdaResponse);
              console.log('Data submitted successfully:', response.data);
              setIsFormSubmitted(true);
              window.location.reload();
            } else {
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };
    
    
      // 1 drop down
    
      useEffect(() => {
        // Fetch data from your API and populate the options array
        const fetchData = async () => {
          try {
            axios
              .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/OperEntity')
              .then((response) => {
                const responseBody = response.data.body;
                const data = JSON.parse(responseBody);
                console.log(data);
                try {
                  // Parse the API response body as JSON
    
                  console.log('res' + data);
                  // if (Array.isArray(data)) {
                  if (data.length > 0) {
                    // Map the data to the format expected by the Select component
                    const formattedOptions = data.map((item) => ({
                      value: item.id,
                      label: item.operationEntity,
                    }));
                    // Set the options in the state
                    setOptions1(formattedOptions);
                  } else {
                    console.error('API response data is not an array:', data);
                  }
                } catch (error) {
                  console.error('Error parsing API response:', error);
                }
              });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
    
      // 2 drop down
    
      useEffect(() => {
        // Fetch data from your API and populate the options array
        const fetchData = async () => {
          try {
            axios
              .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/RegAddress')
              .then((response) => {
                const data = JSON.parse(response.data.body); // Parse the API response body
    
                // Map the data to the format expected by the Select component
                const formattedOptions = data.map((item) => ({
                  value: item.id,
                  label: item.registeredaddress,
                }));
    
                // Set the options in the state
                setOptions2(formattedOptions);
              });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
    
      
      
      useEffect(() => {
        // Fetch data from your API and populate the options array
        const fetchData = async () => {
          try {
            axios
              .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/Currency')
              .then((response) => {
                const data = JSON.parse(response.data.body); // Parse the API response body
    
                // Map the data to the format expected by the Select component
                const formattedOptions = data.map((item) => ({
                  value: item.id,
                  label: item.currency,
                }));
                // Set the options in the state
                setOptions3(formattedOptions);
              });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
 // Just Display in Grid
  const [gridApi, setGridApi] = useState(null);
  
  const [columnDefs] = useState([
    { headerName: 'ID', field: 'id',editable: true, },
    { headerName: 'Company code', field: 'companyCode',editable:true},
    { headerName: 'Company Name', field: 'companyName',editable: true,},
    { headerName: 'Company Short Name', field: 'CompanyShortname',editable: true, },
    { headerName: 'company Mediumname', field: 'companyMediumname',editable: true, },
    { headerName: 'company Email', field: 'companyemail',editable: true, },
    { headerName: 'Web Address', field: 'webaddress',editable: true,},
    { headerName: 'Is Office', field: 'issoffice',editable: true, },
    { headerName: 'Telephone ', field: 'telephone',editable: true, },
    { headerName: 'Fax ', field: 'fax',leditable: true,},
    { headerName: 'Registered Address', field: 'registeredaddress',editable: true,},
    { headerName: 'Currency', field: 'currency',editable: true,},
    { headerName: 'Registration Number', field: 'registrationnumber',editable: true,},
    { headerName: 'Coverage', field: 'coverage',editable: true,},
    { headerName: 'Operating Entity', field: 'operatingentity',editable: true,},
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => 
        <div>
          <button  onClick={() => editButton(params)}>Edit</button>
         
        </div>
      ,
    },
  ]);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Number of rows per page
  const [rowdata ,setrowdata] =useState([]);
  const [editingRow, setEditingRow] = useState(null);
  useEffect(() => { 
   
    axios
      .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/formsubmit')
      .then((res) => {
        // Check if the response is valid and contains data
        if (res.data && res.data.statusCode) {
          try {
            const responseData = JSON.parse(res.data.body);

            // Ensure that responseData is an array before setting it in state
            if (Array.isArray(responseData)) {
              setData(responseData);
              setError(null);
            } else {
              // If it's not an array, attempt to convert it into an array
              if (Array.isArray(responseData.body)) {
                setData(responseData.body);
                setError(null);
              } else {
                setError("Data received is not an array.");
              }
            }
          } catch (e) {
            setError("Error parsing response data.");
          }
        } else {
          setError("Invalid response from the server.");
        }
      })
      
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error gracefully
        setError(error.message);
      });
    
   
  },[]);

  
  // Calculate the index of the first and last rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Slice the data array to display only the rows for the current page
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  
    const filteredData = currentRows.filter(item => {
    const companyCode = item.companyCode.toLowerCase();
    const companyName = item.companyName.toLowerCase();
    const companyShortname = item.CompanyShortname.toLowerCase();
    const companyMediumname = item.companyMediumname.toLowerCase();
    const query = searchQuery.toLowerCase();
    return companyCode.includes(query) || companyName.includes(query) || companyShortname.includes(query) || companyMediumname.includes(query);
  });

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleEdit = (rowData) => {
    setEditingRow(rowData);
  };



  
  const[showupdate, setshowupdate] = useState(false);

  

  const editButton = (params) => {
    setshowupdate(true);
    console.log(params);

    setId(`${params.data.id}`)
    setCompanyShortname(`${params.data.CompanyShortname}`)
    setcompanyCode(`${params.data.companyCode}`)
    setcompanyMediumname(`${params.data.companyMediumname}`)
    setcompanyName(`${params.data.companyName}`)
    setcompanyemail(`${params.data.companyemail}`)

    setcoverage(`${params.data.coverage}`)
    setcurrency(`${params.data.currency}`)
    setfax(`${params.data.fax}`)
    setissoffice(`${params.data.issoffice}`)
    setoperatingentity(`${params.data.operatingentity}`)
    setregisteredaddress(`${params.data.registeredaddress}`)


    setregistrationnumber(`${params.data.registrationnumber}`)
    settelephone(`${params.data.telephone}`)
    setwebaddress(`${params.data.webaddress}`)

  }
  



  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      
        <AgGridReact
          columnDefs={columnDefs}
          rowData={filteredData}
          onGridReady={onGridReady}
          pagination={true}
          suppressCsvExport={true}
          rowMultiSelectWithClick={true}
          paginationAutoPageSize={true} // Use the custom cell renderer
     
      />
      </div>
      {editingRow && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={editingRow.name}
            onChange={(e) => setEditingRow({ ...editingRow, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Age"
            value={editingRow.age}
            onChange={(e) => setEditingRow({ ...editingRow, age: e.target.value })}
          />
          <button>Save</button>
        </div>
      )}
      {showupdate && (
          <div className="modal">
            <div className="modal_container">
              <button className="modal_close2" onClick={() => setshowupdate(false)}>&times;</button>

              <div className="modal_content">
                <br></br>
                <div className="modal_contentleft col-md-6">
                  
                <div className="container">
      <form onSubmit={handleSubmit}>

        <h1 className="premium-header">Company-Company Model</h1>

        <div className="row">
          <div className="col-md-6">

            <div className="form-group">
              <label htmlFor="companyCode">Company Code:</label>
              <input
                type="text"
                id="companyCode"
                name="companyCode"
                value={companyCode}
               
                onChange={event => setcompanyCode(event.target.value)}
                 
                className="form-control premium-input"
              />
              {validationErrors.companyCode && (
                <div className="alert alert-danger">{validationErrors.companyCode}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder='Changepond'
                value={companyName}
                onChange={event => setcompanyName(event.target.value)}
                 
                className="form-control premium-input"
              />
              {validationErrors.companyName && (
                <div className="alert alert-danger">{validationErrors.companyName}</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="CompanyShortname">Company Short name:</label>
          <input
            type="text"
            id="CompanyShortname"
            name="CompanyShortname"
            placeholder='Change'
            value={CompanyShortname}
            onChange={event => setCompanyShortname(event.target.value)}
            className="form-control premium-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyMediumname">Company Medium name:</label>
          <input
            type="text"
            id="companyMediumname"
            name="companyMediumname"
            placeholder='Pond'
            value={companyMediumname}
            onChange={event => setcompanyMediumname(event.target.value)}
            className="form-control premium-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyemail">Company Email:</label>
          <input
            type="text"
            id="companyemail"
            name="companyemail"
            placeholder='ABcd'
            value={companyemail}
            onChange={event => setcompanyemail(event.target.value)}
            className="form-control premium-input"
          />
          {validationErrors.companyemail && (
            <div className="alert alert-danger">{validationErrors.companyemail}</div>
          )}
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="operatingentity">Operating Entity:</label>
              <input
                id="operatingentity"
                name="operatingentity"
                value={operatingentity}
                onChange={event => setoperatingentity(event.target.value)}
                className="form-control premium-input"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="webaddress">Web Address:</label>
              <input
                type="text"
                id="webaddress"
                name="webaddress"
                placeholder='ABcd'
                value={webaddress}
                onChange={event => setwebaddress(event.target.value)}
                className="form-control premium-input"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              id="issoffice"
              placeholder='ABcd'
              name="issoffice"
              
              value={issoffice}
              onChange={event => setissoffice(event.target.value)}
            />{' '}
            Is ISS Office
          </label>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="telephone">Telephone:</label>
              <input
                type="number"
                id="telephone"
                placeholder='ABcd'
                name="telephone"
                value={telephone}
                
                onChange={event => settelephone(event.target.value)}
                 
                className="form-control premium-input"
              />
              {validationErrors.telephone && (
                <div className="alert alert-danger">{validationErrors.telephone}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="fax">FAX:</label>
              <input
                type="text"
                id="fax"
                name="fax"
                placeholder='ABcd'
                value={fax}
                onChange={event => setfax(event.target.value)}
                 
                className="form-control premium-input"
              />
              {validationErrors.fax && (
                <div className="alert alert-danger">{validationErrors.fax}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="registeredaddress">Registered Address:</label>
              <input
                id="registeredaddress"
                name="registeredaddress"
                onChange={event => setregisteredaddress(event.target.value)}
                options={options2}
                isClearable={true}
                value={registeredaddress}
                placeholder="Select an option..."
                className="form-control premium-input"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="currency">Currency:</label>
              <input
                id="currency"
                name="currency"
                onChange={event => setcurrency(event.target.value)}
                options={options3}
                isClearable={true}
                value={currency}
                placeholder="Select an option..."
                className="form-control premium-input"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="registrationnumber">Registration Number:</label>
          <input
            type="text"
            id="registrationnumber"
            name="registrationnumber"
            placeholder='ABcd'
            value={registrationnumber}

            onChange={event => setregistrationnumber(event.target.value)}  

            className="form-control premium-input"
          />
          {validationErrors.registrationnumber && (
            <div className="alert alert-danger">{validationErrors.registrationnumber}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="coverage">Coverage:</label>
          <input
            type="text"
            id="coverage"
            name="coverage"
            value={coverage}
            onChange={event => setcoverage(event.target.value)}
             
            placeholder='ABcd'
            className="form-control premium-input"
          />
          {validationErrors.coverage && (
            <div className="alert alert-danger">{validationErrors.coverage}</div>
          )}
        </div>

        {isFormSubmitted && (
          <div className="alert alert-success">Data submitted successfully.</div>
        )}

        <button type="submit" className="btn btn-primary premium-button">
          Submit
        </button>
      </form>
    </div>

                </div>
              </div>
</div>
</div>
)}
    </div>
  );
}

export default EditCompanyPage;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import '../components/NewCompanydetailPage.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function EditCompanyPage({ rowData, onSave, onCancel }) {
//   const [formData, setFormData] = useState({ ...rowData }); // Initialize form data with selected row data
//   const [options1, setOptions1] = useState([]);
//   const [selectedOption1, setSelectedOption1] = useState({
//     value: rowData.operatingentity,
//     label: rowData.operatingentity,
//   });
//   const [options2, setOptions2] = useState([]);
//   const [selectedOption2, setSelectedOption2] = useState({
//     value: rowData.registeredaddress,
//     label: rowData.registeredaddress,
//   });
//   const [options3, setOptions3] = useState([]);
//   const [selectedOption3, setSelectedOption3] = useState({
//     value: rowData.currency,
//     label: rowData.currency,
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     // Fetch data for dropdown 1
//     axios
//       .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/OperEntity')
//       .then((response) => {
//         const data = JSON.parse(response.data.body);
//         const formattedOptions = data.map((item) => ({
//           value: item.operationEntity,
//           label: item.operationEntity,
//         }));
//         setOptions1(formattedOptions);
//       })
//       .catch((error) => {
//         console.error('Error fetching data for dropdown 1:', error);
//       });

//     // Fetch data for dropdown 2
//     axios
//       .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/RegAddress')
//       .then((response) => {
//         const data = JSON.parse(response.data.body);
//         const formattedOptions = data.map((item) => ({
//           value: item.registeredaddress,
//           label: item.registeredaddress,
//         }));
//         setOptions2(formattedOptions);
//       })
//       .catch((error) => {
//         console.error('Error fetching data for dropdown 2:', error);
//       });

//     // Fetch data for dropdown 3
//     axios
//       .get('https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/Currency')
//       .then((response) => {
//         const data = JSON.parse(response.data.body);
//         const formattedOptions = data.map((item) => ({
//           value: item.currency,
//           label: item.currency,
//         }));
//         setOptions3(formattedOptions);
//       })
//       .catch((error) => {
//         console.error('Error fetching data for dropdown 3:', error);
//       });
//   }, []);

//   const isValidPhoneNumber = (phoneNumber) => {
//     const phonePattern = /^[0-9]{10}$/;
//     return phonePattern.test(phoneNumber);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Set validation errors
//     setValidationErrors({ ...validationErrors, [name]: '' });
//   };
//   const handleChange1 = (selectedOption) => {
//     setSelectedOption1(selectedOption);
//     setFormData({ ...formData, operatingentity: selectedOption.value });
//   };

//   const handleChange2 = (selectedOption) => {
//     setSelectedOption2(selectedOption);
//     setFormData({ ...formData, registeredaddress: selectedOption.value });
//   };

//   const handleChange3 = (selectedOption) => {
//     setSelectedOption3(selectedOption);
//     setFormData({ ...formData, currency: selectedOption.value });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation logic
//     const errors = {};

//     if (!formData.companyCode.trim()) {
//       errors.companyCode = 'Company Code is required';
//     }

//     if (!formData.companyName.trim()) {
//       errors.companyName = 'Company Name is required';
//     }

//     if (!formData.companyemail.trim()) {
//       errors.companyemail = 'Company Email is required';
//     } else if (!isValidEmail(formData.companyemail)) {
//       errors.companyemail = 'Invalid email format';
//     }

//     if (!formData.telephone.trim()) {
//       errors.telephone = 'Telephone is required';
//     } else if (!isValidPhoneNumber(formData.telephone)) {
//       errors.telephone = 'Invalid phone number format';
//     }

//     if (!formData.registrationnumber.trim()) {
//       errors.registrationnumber = 'Registration Number is required';
//     }

//     setValidationErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       try {
//         const apiKey = 'VhbIH1ut7y4t17XxxKF0i36nNnRJGWd8KiJmWCgi';
//         const apiUrl =
//           'https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/formsubmit';

//         const response = await fetch(apiUrl, {
//           method: 'PUT', // Use PUT to update data
//           body: JSON.stringify(formData),
//           headers: {
//             'Content-Type': 'application/json',
//             'x-api-key': apiKey,
//           },
//         });

//         if (response.ok) {
//           const lambdaResponse = await response.json();
//           // Handle the Lambda response here
//           console.log(lambdaResponse);
//           toast.success('Data saved successfully!');
//           onSave(formData); // Call the onSave function with the updated data
//         } else {
//           // Handle any errors here
//           console.error('Error:', response.statusText);
//           toast.error('Error occurred while saving data.');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         toast.error('Error occurred while saving data.');
//       }
//     }
//   };

//   const isValidEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <h2 className="text-center mb-4">Edit Company-Company Model</h2>

//         {/* Fields start here */}
//         <div className="form-container">
//           <div className="column">
//             <div className="field">
//               <label htmlFor="companyCode">Company Code <span className="required">*</span></label>
//               <br/>
//               <input
//                 type="text"
//                 id="companyCode"
//                 name="companyCode"
//                 value={formData.companyCode}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.companyCode && (
//                 <span className="error">{validationErrors.companyCode}</span>
//               )}
//             </div>

//             <div className="field">
//               <label htmlFor="companyName">Company Name <span className="required">*</span></label>
//               <br/>
//               <input
//                 type="text"
//                 id="companyName"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.companyName && (
//                 <span className="error">{validationErrors.companyName}</span>
//               )}
//             </div>
//         <div className="field">
//           <label htmlFor="CompanyShortname">Company Short name</label>
//           <br/>
//           <input
//             type="text"
//             id="CompanyShortname"
//             name="CompanyShortname"
//             value={formData.CompanyShortname}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className='field'>
//       <label htmlFor="companyMediumname">Company Medium name</label>
//       <br/>
//       <input
//         type="text"
//         id="companyMediumname"
//         name="companyMediumname"
//         value={formData.companyMediumname}
//         onChange={handleInputChange}
//       />
//     </div>
//     <div className='field'>
//       <label htmlFor="companyemail">Company Email <span className="required">*</span></label>
//       <br/>
//       <input
//         type="text"
//         id="companyemail"
//         name="companyemail"
//         value={formData.companyemail}
//         onChange={handleInputChange}
//         required
//       />
//       {validationErrors.companyemail && (
//         <span className="error">{validationErrors.companyemail}</span>
//       )}
//     </div>
//     <div className='field'>
//       <label htmlFor="webaddress">Web Address <span className="required">*</span></label>
//       <br/>
//       <input
//         type="text"
//         id="webaddress"
//         name="webaddress"
//         value={formData.webaddress}
//         onChange={handleInputChange}
//       />
//         {validationErrors.webaddress && (
//         <span className="error">{validationErrors.webaddress}</span>
//       )}
//     </div>
//     <div className='field'>
//       <label htmlFor="operatingentity">Operating Entity  <span className="required">*</span></label>
//       <br/>
//       <Select
   
//         id="operatingentity"
//         name="operatingentity"
//         value={selectedOption1}
//         onChange={handleChange1}
//         options={options1}
//         isClearable={true}
//         placeholder="Select an option..."
//         required

//       />
//         {validationErrors.operatingentity && (
//         <span className="error">{validationErrors.operatingentity}</span>
//       )}
//     </div>
            
//             {/* ... (other fields in the first column) */}
//           </div>

//           <div className="column">
//             <div className="field">
//               <label htmlFor="telephone">Telephone <span className="required">*</span></label>
//               <br/>
//               <input
//                 type="tel"
//                 id="telephone"
//                 name="telephone"
//                 value={formData.telephone}
//                 onChange={handleInputChange}
//                 required
//               />
//               {validationErrors.telephone && (
//                 <span className="error">{validationErrors.telephone}</span>
//               )}
//             </div>

//             <div className="field">
//               <label htmlFor="fax">FAX</label>
//               <br/>
//               <input
//                 type="text"
//                 id="fax"
//                 name="fax"
//                 value={formData.fax}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className='field'>
//         <label htmlFor="registrationnumber">Registration Number <span className="required">*</span></label>
//         <br/>
//         <input
//           type="text"
//           id="registrationnumber"
//           name="registrationnumber"
//           value={formData.registrationnumber}
//           onChange={handleInputChange}
//           required
//         />
//         {validationErrors.registrationnumber && (
//           <span className="error">{validationErrors.registrationnumber}</span>
//         )}
//       </div>
//       <div className='field'>
//       <label htmlFor='currency'>Currency <span className="required">*</span></label>
//       <br/>
//       <Select
//         id="currency"
//         name="currency"
//         value={selectedOption3}
//         onChange={handleChange3}
//         options={options3}
//         isClearable={true}
//         placeholder="Select an option..."
//         required
//       />
//     </div>
//     <div className='field'>
//         <label htmlFor="coverage">Coverage</label>
//         <br/>
//         <input
//           type="text"
//           id="coverage"
//           name="coverage"
//           value={formData.coverage}
//           onChange={handleInputChange}
      
//         />
//         {validationErrors.coverage && (
//           <span className="error">{validationErrors.coverage}</span>
//         )}
//       </div>

//       <div className='field'>
//       <label htmlFor='registeredaddress'>Registered Address<span className="required">*</span></label>
//       <br/>
//       <Select
//         id="registeredaddress"
//         name="registeredaddress"
//         value={selectedOption2}
//         onChange={handleChange2}
//         options={options2}
//         isClearable={true}
//         placeholder="Select an option..."
//         required
//       />
//     </div>
//     <div  className='field'>
//         <input
//           type="checkbox"
//           id="vehicle1"
//           name="vehicle1"
//           value="Bike"
//           checked={formData.isISSOffice}
//           onChange={(e) => {
//             const { checked } = e.target;
//             setFormData({ ...formData, isISSOffice: checked });
//           }}
//         />
//         <label htmlFor="vehicle1">IsISSOffice</label>
//         <br />
//       </div>
//             {/* ... (other fields in the second column) */}
//           </div>
//         </div>
//         {/* Fields end here */}

//         <div className="savebutton">
//           <button type="submit">Save</button>
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//         </div>
//         <ToastContainer />
//       </div>
//     </form>
//   );
// }

// export default EditCompanyPage;
