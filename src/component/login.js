import axios from "axios";
import React, {useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import "./auth.css";

const Login = ()  =>{
    const userRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const confirm = () => {
        navigate('/register')
    }

    useEffect(() => {
        let user = localStorage.getItem('user');
        if(user){
            navigate('/home')
        }
    })

    const login =  () =>{
        const data = {email: email, password: password };
        if(email && password){
            axios.post(`http://localhost:8000/api/login`, data)
            .then(res =>{
                
                if(res.data.err) {
                    alert(res.data.err)
                }else{
                    console.log("User Logged In", data);
                    navigate("/Home")
                }
                localStorage.setItem("user", JSON.stringify(email));
            })
            .catch((err) => console.log(err));
        }else{
            alert("Invalid Input")
            
        }
    }

  return (
    <div id="Login">
    <section>
        <h1>Sign In</h1>   
            <label htmlFor="email"></label>
            <input 
                type="text" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                autoComplete="off"
                ref={userRef} 
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
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required
                placeholder="Enter Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Enter your password"
            />
            <br/>
            <div className="switch-btn" onClick={login}>Login</div>
                or
            <div className="switch-btn" onClick={confirm}>Register</div>
        
    </section>
    </div>
  );
}

export default Login;
