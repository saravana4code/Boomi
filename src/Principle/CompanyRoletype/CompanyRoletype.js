import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../components/AGCompanyDetailPage.css'
// import EditCompanyPopup from '../pages/EditCompanyPopup'; // Replace with the correct path to your EditCompanyPopup component
import EditCompanyPopup from '../../pages/EditCompanyPopup';

import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import CompanyOperatingForm from '../Company Operating/CompanyOperatingForm'




function CompanyRoleType() {
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

  const gridData =[{ AuditNotes: "Language", 
  CompanyCode: 100001, 
  IsDeleted: "1", 
  ProcessCode: "HY765",
  RoleSubTypeCode: "Development",
  RoleTypeCode: "RT876"
  },
  {AuditNotes: "Language", 
  CompanyCode: 100001, 
  IsDeleted: "1", 
  ProcessCode: "HY765",
  RoleSubTypeCode: "Development",
  RoleTypeCode: "RT876"}
];
  
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

 



  const columnDefs = [
    // { headerName: 'Id', field: 'id', sortable: true, filter: true },
    { headerName: 'Process Code', field: 'ProcessCode', sortable: true, filter: true},
    { headerName: 'RoleType', field: 'RoleTypeCode', sortable: true, filter: true},
    { headerName: 'Company Code', field: 'CompanyCode', sortable: true, filter: true},
    { headerName: 'RoleSubType', field: 'RoleSubTypeCode', sortable: true, filter: true},
    { headerName: 'AuditNotes', field: 'AuditNotes', sortable: true, filter: true},
    { headerName: 'IsDeleted', field: 'IsDeleted', sortable: true, filter: true},
    
    {
      headerName: "Add Operating",
      field: "Edit",
      cellRenderer: EditButtonRenderer,
      maxWidth: 200,
    },
 
   
  ];
  

  const fetchData = async () => {
   
    try {
      // Replace this with your actual API call to fetch company data
      const response = await fetch(
        'https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/createRoleType'
      );
      const data = await response.json();
      const responsedata = data.body;
      const apiResponse = JSON.parse(responsedata);
      console.log(apiResponse);
      setRowData(apiResponse);
      // setOriginalData(apiResponse); 
      console.log(rowData);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  useEffect(() => {
    // Fetch your data and set it in the state using setRowData
    fetchData();
  },[dataUpdate] );
  
  

  const handleEdit = (data) => {
    // Set the selected row for editing
    setSelectedRow(data);
    setEditedRow({ ...data });
  };

  const handleSave = async(editedData) => {
  console.log(editedData);
    const apiUrl = 'https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/createOperating';
    const apiKey = 'VhbIH1ut7y4t17XxxKF0i36nNnRJGWd8KiJmWCgi';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(editedData),
      });
  
    
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      console.log("Data store");
      // setRowData(updatedRowData);
      setIsEditing(false);
      setSelectedRowData(null);
      setIsModalOpen(false);
      window.location.replace('/Accordion');
      // const updatedRowData = rowData.map((row) =>
      //   row.id === editedData.id ? editedData : row
      // );
      // console.log(updatedRowData);
      // // setRowData(updatedRowData);
      // setIsEditing(false);
      // setSelectedRowData(null);
      // setIsModalOpen(false);
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
    // const searchTextLower = searchText.toLowerCase().trim();

    // if (searchTextLower === '') {
    //   // setRowData(originalData);
    // } else {
    //   const filteredData = originalData.filter((row) => {
    //     return (
    //       row.companyCode.toLowerCase().includes(searchTextLower) ||
    //       row.companyName.toLowerCase().includes(searchTextLower) ||
    //       row.CompanyShortname.toLowerCase().includes(searchTextLower) ||
    //       row.companyMediumname.toLowerCase().includes(searchTextLower)
    //       // Add similar conditions for other columns
    //     );
    //   });

    //   // setRowData(filteredData);
    // }
  };

  
 const handleCreateCompany=()=>{

 }

  const handleback =()=>{
    window.location.replace('/Accordion');
  }
  
  const handleRoleType =()=>{
    window.location.replace('/CompanyOperating');
  }
  
  
  return (
    <div className='company-grid'>
     
    <div className="company-detail-page">
      <h4>Company Roletype </h4>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {/* <button onClick={handleback}>Back</button> */}
        {/* <button onClick={handleRoleType }>+CompanyOperating</button> */}
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
    <CompanyOperatingForm
      rowData={selectedRowData}
    
      onSave={(editedData) => {
        console.log(editedData);
        // Handle the saved data in AGCompanyDetailPage
        handleSave(editedData);
        // Close the modal
        // setIsEditing(false);
        // setSelectedRowData(null);
        // closeModal();
       
      }}
      onCancel={() => {
        setIsEditing(false);
        setSelectedRowData(null);
        closeModal(); // Close the modal when canceling
      }}
    />
  )}
</Modal>

</div>
    </div>
  );
}

export default CompanyRoleType;
