import React, { useState } from 'react';
import '../components/LoginPage.css';
import { toast, ToastContainer } from 'react-toastify';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
      const [error, setError] = useState('');
      const [isAuthenticated, setIsAuthenticated] = useState(false);
    
      const APIGateway = 'https://cmk5lnh2s7.execute-api.us-east-1.amazonaws.com/prod/login';
    //   const history = useHistory(); // Create a history object to programmatically navigate
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${APIGateway}?username=${formData.username}`)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              return data;
            });
        console.log(response);
          if (response.statusCode === 200) {
            const userData = await response.body;
            var jsonsContent = JSON.parse(userData);
            var isUserVerified = false;
            for (var i = 0; i < jsonsContent.length; i++) {
              if (jsonsContent[i].username === formData.username && jsonsContent[i].password === formData.password) {
                setIsAuthenticated(true);
                setError('');
                isUserVerified = true;
                // Redirect to the next page (e.g., MyForm) upon successful login
                // history.push('/MyForm');
                break;
              } else {
                setIsAuthenticated(false);
                setError('Invalid username or password');
              }
            }
            if(isUserVerified)
            {
              toast.success('Login successfull!');
                window.location.replace('/DashboardPage');
            }
          } else {
            setIsAuthenticated(false);
            setError('User not found');
            toast.error('User not found');
          }
        } catch (error) {
          console.error('API Error:', error);
        
          if (error.statusCode === 500) {
            setError('Server error occurred');
            toast.error('Server error occurred');
          } else {
            setError('Network error occurred');
            toast.error('Network error occurred');
          }
          setIsAuthenticated(false);
        }
        
      };
      return(
      <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input
             className='usertxt'
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="button-container">
            <input type="submit" value="Login" />
            <ToastContainer />
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        {isAuthenticated && <div>User is successfully logged in</div>}
      </div>
    </div>
  );
}


export default LoginPage;
