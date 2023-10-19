import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tablelist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('https://api.example.com/api/data1');
        const response2 = await axios.get('https://api.example.com/api/data2');
        const response3 = await axios.get('https://api.example.com/api/data3');

        // Assuming the API response is an array with a unique "id" field
        const combinedData = [
          ...response1.data,
          ...response2.data,
          ...response3.data,
        ];

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const logstatus = sessionStorage.getItem("Login_status");
  console.log("Result1 "+ logstatus);
  if (logstatus=="false") {
    console.log("Result2"+logstatus);
    // User is not logged in
    window.location.replace('/');
  }

else{  
  return (
    <div className="App">
      <h1>Combined API Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
}
export default Tablelist;
    