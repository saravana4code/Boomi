import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../components/AGCompanyDetailPage.css'
import EditCompanyPopup from './EditCompanyPopup'; // Replace with the correct path to your EditCompanyPopup component
import NewCompanydetailPage from './NewCompanydetailPage';
import EditCompanyPage from './EditCompanyPage';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import CompanyRoletypeForm from '../Principle/CompanyRoletype/CompanyRoletypeForm';
import CompanyOperatingForm from '../Principle/Company Operating/CompanyOperatingForm';



function AGCompanyDetailPage() {
  const [rowData, setRowData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [editedRow, setEditedRow] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [gridReady, setGridReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUpdate, setUpdated] = useState(false);

  useEffect(() => {
    // Fetch your data and set it in the state using setRowData
    fetchData();
  }, [dataUpdate]);
  
  
  const EditButtonRenderer = (props) => {
    
    const editdata = props.data;
      
       const handleEditClick = () => {
        setSelectedRowData(editdata);
        setIsEditing(true);
        setIsModalOpen(true);
      };
      
      return (
        <div className="actions-cell">
     <i
        className="fas fa-edit"
        style={{ color: "#47A547", margin: "0 8px", cursor: "pointer" }}
        onClick={handleEditClick}
      ></i>
        </div>
      );
       
    }
    const closeModal = () => {
      setIsModalOpen(false);
    };
    


  const gridRef = useRef();
  
  const handleCheckboxClick = (params) => {
    // Get the selected rows with checkboxes
    const selectedRows = gridRef.current.getSelectedRows();
  
    // Do something with the selected rows (e.g., navigate to row data)
    if (selectedRows.length > 0) {
      const selectedRowData = selectedRows[0]; // Assuming single selection
      console.log('Selected Row Data:', selectedRowData);
      setEditedRowData(selectedRowData);
      setIsEditing(true); // Show the edit popup
      // setSelectedRowData(selectedRowData);
      // setIsEditing(true);
      // setIsModalOpen(true);
    }
  };
  const [isOperatingFormOpen, setIsOperatingFormOpen] = useState(false);


  const columnDefs = [
    // { headerName: 'Id', field: 'id', sortable: true, filter: true },
    { headerName: 'Process Code', field: 'ProcessCode', sortable: true, filter: true},
    { headerName: 'Company Name', field: 'CompanyName', sortable: true, filter: true},
    { headerName: 'Company Short Name', field: 'CompanyNameShort', sortable: true, filter: true},
    { headerName: 'Company Code', field: 'CompanyCode', sortable: true, filter: true},
    { headerName: 'Company Email', field: 'CompanyEmail', sortable: true, filter: true},
    { headerName: 'WebAddress', field: 'WebAddress', sortable: true, filter: true},
    { headerName: 'Operating Entity', field: 'OperatingEntityCode', sortable: true, filter: true},
    { headerName: 'IsISSOffice', field: 'IsISSOffice', sortable: true, filter: true},
    { headerName: 'Telephone', field: 'Telephone', sortable: true, filter: true},
    { headerName: 'Registration Number', field: 'RegistrationNumber', sortable: true, filter: true},
    { headerName: 'Currency', field: 'CurrencyCode.currency', sortable: true, filter: true}, 
    { headerName: 'Registered Address', field: 'RegisteredAddress', sortable: true, filter: true},
    { headerName: 'Flag', field: 'Flag', sortable: true, filter: true},
    {
      headerName: "AddRoletype",
      field: "Edit",
      cellRenderer: EditButtonRenderer,
        },
 
   
  ];
  

  const fetchData = async () => {
    try {
      // Replace this with your actual API call to fetch company data
      const response = await fetch(
        'https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/formsubmit '
      );
      const data = await response.json();
      const responsedata = data.body;
      const apiResponse = JSON.parse(responsedata);
      console.log(apiResponse);
      setRowData(apiResponse);
      sessionStorage.setItem("companyData",JSON.stringify(apiResponse));
      console.log(sessionStorage);
      setOriginalData(apiResponse);
      // setApiResponseData(apiResponse);
      console.log(rowData);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  
  

  const handleEdit = (data) => {
    // Set the selected row for editing
    setSelectedRow(data);
    setEditedRow({ ...data });
  };
// this is were we save roletype buy calling api post merthod
  const handleSave = async(saveData) => {

    console.log(saveData);
  
    const apiUrl = 'https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/createRoleType';
    const apiKey = 'VhbIH1ut7y4t17XxxKF0i36nNnRJGWd8KiJmWCgi';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(saveData),
      });
  
    
      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      // const updatedRowData = rowData.map((row) =>
      //   row.companyCode === saveData.companyCode ? saveData : row
      // );
      console.log("Data store");
      // setRowData(updatedRowData);
      setIsEditing(false);
      setSelectedRowData(null);
      setIsModalOpen(false);
      window.location.replace('/Accordion');
      // setUpdated(!dataUpdate);
    } catch (error) {
      console.error('Error updating data:', error);
    }

    // Save the edited row data and update the state
    // const updatedRowData = rowData.map((row) =>
    //   row.id === editedRow.id ? editedRow : row
    // );
    // setRowData(updatedRowData);
    // setEditedRow(null);
    // fetchData();

    // setIsEditing(false);
    // setSelectedRowData(null);
    // closeModal();
    // window.location = window.location.origin+"/AGCompanydetailPage";
    


  };

  const onGridReady = (params) => {
    // Store the grid API reference
    gridRef.current = params.api;
    
    setGridReady(true);
    console.log(onGridReady);
     
  };
  

  
  const handleSearch = () => {
    const searchTextLower = searchText.toLowerCase().trim();

    if (searchTextLower === '') {
      setRowData(originalData);
    } else {
      const filteredData = originalData.filter((row) => {
        return (
          row.ProcessCode.toLowerCase().includes(searchTextLower) ||
          row.CompanyEmail.toLowerCase().includes(searchTextLower) ||
          row.CompanyName.toLowerCase().includes(searchTextLower) ||
          row.CompanyNameShort.toLowerCase().includes(searchTextLower)
          // Add similar conditions for other columns
        );
      });

      setRowData(filteredData);
    }
  };

  const handleOperatingFormOpen = () => {
    setIsOperatingFormOpen(true);
  };

 const handleCreateCompany=()=>{
  window.location.replace('/Company');
 }

  const handleback =()=>{
    window.location.replace('/DashboardPage');
  }
  
  const handleRoleType =()=>{
    window.location.replace('/CompanyRoleType');
  }
  
    
  return (
    <div className='company-grid'>
   
    <div className="company-detail-page">
      <h2>Company Detail</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleback}>Back</button>

        <button onClick={handleCreateCompany }>+AddCompany</button>
        {/* <button onClick={handleRoleType }>+RoleType</button> */}
      </div>
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={() => setSelectedRow(gridRef.current.getSelectedRows()[0])}
          suppressCellSelection={true}
          stopEditingWhenGridLosesFocus={true}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          rowClassRules={{
            'edited-row': (params) => params.data.companyCode === editedRow?.companyCode,
          }}
        ></AgGridReact>
      </div>
      {/* {isEditing && selectedRowData && (
  <EditCompanyPopup
    rowData={selectedRowData}
    onSave={handleSave}
    onCancel={() => {
      setIsEditing(false);
      setSelectedRowData(null); // Clear the selected row data when canceling
    }}
  />
)} */}


      {/* {isEditing && editedRowData && (
      <EditCompanyPopup
        rowData={editedRowData}
        onSave={handleSave}
        onCancel={() => {
          setIsEditing(false); // Hide the edit popup
        }}
        apiUrl="https://emsf2i1ts8.execute-api.us-east-1.amazonaws.com/prod/edit" // Pass the edit API URL
      />
    )} */}

<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Edit Company"
>
  {isEditing && selectedRowData && (
    <CompanyRoletypeForm
      rowData={selectedRowData}
      onSave={(saveData)=>{

        console.log(saveData);
        handleSave(saveData);
        //have to write the save code

        
      }}
      onCancel={() => {
        console.log('method cancel is called');
        setIsEditing(false);
        setSelectedRowData(null);
        closeModal(); // Close the modal when canceling
      }}
    />
  )}
</Modal>

<Modal
        isOpen={isOperatingFormOpen}
        onRequestClose={() => setIsOperatingFormOpen(false)}
        contentLabel="Company Operating Form"
      >
        <CompanyOperatingForm companydata={rowData} />
      </Modal>

</div>
    </div>
  );
}

export default AGCompanyDetailPage;
