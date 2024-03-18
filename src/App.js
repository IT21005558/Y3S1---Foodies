//import logo from './logo.svg';
import './App.css';
import AddPostForm from './Component/PostCreation';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Allpost from './Component/Allpost';
import Editpost from './Component/Editpost';
import PostList from './Component/All';
import DeleteUser from './Component/UserManegement/UserDelete';
import UpdateUser from './Component/UserManegement/UserUpdate';


import Login from './Component/UserManegement/Login';
import RegistrationForm from './Component/UserManegement/UserRegister';
import HomePage from './Component/UserManegement/UserHome';

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/home" element={<PostList />} />
        <Route path="/add" element={<AddPostForm />} />
        <Route path="/all" element={<Allpost />} />
        <Route path="/edit/:id" element={<Editpost />} />

        <Route path="/log" element={<Login/>} />
        <Route path="/Reg" element={<RegistrationForm/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/del" element={<DeleteUser/>} />
        <Route path="/update" element={<UpdateUser/>} />
       


      </Routes>
    </Router>
  );
}

export default App;
