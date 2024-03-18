import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
//import 'react-toastify/dist/ReactToastify.css';
import '../UserStyle/Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserid] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:8080/cus/login'; 

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
    .then((res) => res.text())
    .then((data) => {
        if (data === 'Login Successful'){
            toast.success('Login Successful, Welcome back', { autoClose: 1000 });
            const url = `http://localhost:8080/cus/getid/${email}`;
            fetch(url)
              .then((res) => res.json())
              .then((data) => {
                  setUserid(data);
                  localStorage.setItem('userid', data);
                  setTimeout(() => navigate('/all'), 2000);
              })
              .catch((err) => {
                console.error(err);
              });
          }else{
            toast.error(data);
            setEmail('');
            setPassword('');
          }
          
    }).catch((err) => {
        toast.error('Failed :' + err.message);
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">User Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;