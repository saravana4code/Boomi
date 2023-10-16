import React,{useState,useEffect} from 'react';
import axios from 'axios';
import CompanyOperatingForm from '../Company Operating/CompanyOperatingForm';
import Select from 'react-select';
function CompanyRoletypeForm({ rowData, onSave, onCancel}) {

   

    const [editedData, setEditedData] = useState(rowData);
    const [saveData, setSaveData] = useState();

    const [formData, setFormData] = useState({
        ProcessCode : '',
        RoleTypeCode : '',
        CompanyCode : '',
        RoleSubTypeCode :'',
        AuditNotes :'',
        IsDeleted :'',
              
      });

    const [isChecked, setIsChecked] = useState(false);

    const [options1, setOptions1] = useState([]);
    const [selectedOption1, setSelectedOption1] = useState(null);
  
    const [options2, setOptions2] = useState([]);
    const [selectedOption2, setSelectedOption2] = useState(null);
  
  
    const handleChange1 = (selectedOption) => {
      setSelectedOption1(selectedOption);
      setFormData({ ...formData, RoleTypeCode: selectedOption ? selectedOption.label : '' });
    };
    
    const handleChange2 = (selectedOption) => {
      setSelectedOption2(selectedOption);
      setFormData({ ...formData, RoleSubTypeCode: selectedOption ? selectedOption.label : '' });
    };

  
    useEffect(() => {
        // Fetch data for dropdown 1
        axios
          .get('https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/getroletypedd')
          .then((response) => {
            const data = JSON.parse(response.data.body);
            const formattedOptions = data.map((item) => ({
              value: item.id,
              label: item.RoleTypeCode,
            }));
            setOptions1(formattedOptions);
          })
          .catch((error) => {
            console.error('Error fetching data for dropdown 1:', error);
          });
    
        // Fetch data for dropdown 2
        axios
          .get('https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/getsubtypedd')
          .then((response) => {
            const data = JSON.parse(response.data.body);
    
            const formattedOptions = data.map((item) => ({
             
              value: item.id,
              label: item.RoleSubTypeCode,
            }));
    
            setOptions2(formattedOptions);
            
          })
          .catch((error) => {
            console.error('Error fetching data for dropdown 2:', error);
          });
    
       
    
      }, []);

      const updateDataFor = (datas) =>{

        console.log(datas);

      };

    

    // <CompanyOperatingForm 
    // roletypedata={editedData}>

    // </CompanyOperatingForm>

// setFormData({...formData,ProcessCode:editedData.ProcessCode,
//     CompanyCode: editedData.CompanyCode
//     });
   

    
const SetDataForm = async() => {

//    await setFormData({...formData, ProcessCode: editedData.ProcessCode, CompanyCode: editedData.CompanyCode});
    var datas = formData;
    
    datas.CompanyCode = editedData.CompanyCode;
    datas.ProcessCode = editedData.ProcessCode;
    
    onSave(datas);

}

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    setIsChecked(checked);
  };
  
    return (
        <div>
    
   <div>
<h2 className="text-center mb-4">Company Role Type</h2>
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
   <label htmlFor="RoleTypeCode">Role Type  <span className="required">*</span></label>
      <br/>
      <Select
   
        id="RoleTypeCode"
        name="RoleTypeCode"
        value={selectedOption1}
        onChange={handleChange1}
        options={options1}
        isClearable={true}
        placeholder="Select an option..."
        required

      />
    </div>
   <div className="field">
     <label htmlFor="CompanyCode ">Company Code  <span className="required">*</span></label>
     <br/>
     <input
       type="text"
       id="CompanyCode "
       name="CompanyCode "
     value={editedData.CompanyCode}
       required
     />
    </div>
   
   <div className="field">
   <label htmlFor="RoleSubTypeCode">Role SubType  <span className="required">*</span></label>
      <br/>
      <Select
   
        id="RoleSubTypeCode" 
        name="RoleSubTypeCode"
        value={selectedOption2}
        onChange={handleChange2}
        options={options2}
        isClearable={true}
        placeholder="Select an option..."
        required

      />
    </div>
   <div className="field">
     <label htmlFor="AuditNotes">Audit Notes  <span className="required">*</span></label>
     <br/>
     <input
       type="text"
       id="AuditNotes"
       name="AuditNotes"
    //    value={formData.CompanyName}
       onChange={handleInputChange}
       required
     />
    </div>
   <div className="field">
     <label htmlFor="IsDeleted ">IsDeleted </label>
     <br/>
     <input
  type="checkbox"
  id="IsDeleted"
  name="IsDeleted"
  checked={isChecked}
  onChange={handleCheckboxChange}
/>

    
    </div>
   </div>
  </div>
  <div className="savebutton" >
      <button onClick={()=>{SetDataForm()}}>  Save          </button>
      <button
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      {/* <ToastContainer /> */}
      
   </div>
  
   </div>
    );
}

export default CompanyRoletypeForm;