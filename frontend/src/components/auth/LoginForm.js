import React, { useState } from 'react';
import Navbar from '../Navbar';
const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState(""); // change to name
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("oop")
      alert("Username or password are incorrect")
      navigate('/login')
    } else {
      console.log("yay")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("userEmail", email) // change to name
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

    return (
  <>
  <Navbar currentPage="login" />{
    <div className="d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="d-inline-flex flex-column justify-content-center align-items-center">
        <h3 className="d-flex justify-content-center ml-5 text-primary display-3 p-3">Log In</h3>
        <input placeholder='Email' id="email" className="d-inline-flex form-control" type='text' value={ email } onChange={handleEmailChange} />
        <input placeholder='Password' id="password" className=" d-inline-flex form-control" type='password' value={ password } onChange={handlePasswordChange} />
        <div className="d-flex justify-content-end p-3">
          <input role='submit-button' className="btn btn-primary" id='submit' type="submit" value="Submit" />
        </div>
      </form>
      </div>
      
  }</>
    );
}


export default LogInForm;
