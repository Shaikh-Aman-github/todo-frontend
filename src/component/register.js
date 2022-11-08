import React, {useRef, useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./auth.css";

const Register = ()  =>{
     const userRef = useRef();
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const navigate = useNavigate();
     const confirm = () => {
         navigate('/')
     }

    useEffect(() => {
        let user = localStorage.getItem('user');
        if(user){
            navigate('/home')
        }
    })

    const register =  () =>{
        const data = {name, email, password };
        if(name && email && password){
            axios.post(`http://localhost:8000/api/users`, data)
            .then(res =>{ 
                if(res.data.err){
                    alert(res.data.err)
                }else{
                console.log("User Created", data);
                navigate("/home")
                }
            })
        .catch((err) => console.log(err));
        }else{
            alert("Invalid Input")
            
        }
    }

  return (
    <div id="Login">
    <section>
        <h1>Sign Up</h1>   
        
        <label htmlFor="name"></label>
            <input 
                type="text" 
                id="name" 
                name="name"
                autoComplete="off"
                ref={userRef} 
                onChange={(e) => {setName(e.target.value)}}
                required
                placeholder="Enter your Name"
                title="Enter your Name"
            />
            <br/>
            <label htmlFor="email"></label>
            <input 
                type="text" 
                id="email" 
                name="email"
                onChange={(e) => {setEmail(e.target.value)}}
                required
                placeholder="Enter Email id"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="Enter your Email Id"
            />
            <br/>
            <label htmlFor="password"></label>
            <input 
                type="password" 
                id="password" 
                name="password"
                onChange={(e) => {setPassword(e.target.value)}}
                required
                placeholder="Enter Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <br/>
            <div className="switch-btn" onClick={register} >Register</div>
                or
            <div className="switch-btn" onClick={confirm}>Login</div>
    </section>
    </div>
  );
}

export default Register;
