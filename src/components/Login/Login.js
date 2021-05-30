import React, { useContext, useEffect, useState ,useRef} from 'react'
import { Button,Form,Card ,CloseButton,Modal} from 'react-bootstrap'
import axios from 'axios'
import './Login.css';
import { useHistory } from 'react-router'
import {LoginContext} from '../../Context/LoginContext'
import {UserDetailsContext} from '../../Context/UserDetailsContext'
import {Link} from 'react-router-dom'
function Login() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
 
  const [show,setShow]=useState(true)
  const history=useHistory()
const [token,setToken]=useContext(LoginContext)
const [details,setDetails]=useContext(UserDetailsContext)
const newToken=useRef('')
const newResponse=useRef('')
const changeUsername=(e)=>{
setUsername(e.target.value)
}
const changePassword=e=>{
    setPassword(e.target.value)
}
const login=(event)=>{
    event.preventDefault()
     axios.post(`http://localhost:8080/kpopMerch/Login`,{username:username,password:password}).then(res=>{
        newResponse.current=res.data
  console.log(res.data)
  
      newToken.current= newResponse.current.User_Details[1].jwtToken
      console.log(newToken)       
        setToken(newToken.current)
        window.localStorage.setItem("token",newToken.current);
        const detailsOfUser=newResponse.current.User_Details[0]
        setDetails(detailsOfUser)
        console.log(detailsOfUser)
        window.localStorage.setItem("UserId",newResponse.current.User_Details[0].userid)
        window.localStorage.setItem("UserName",newResponse.current.User_Details[0].name)
        history.push("/kpopMerch")
        }).catch(error=>
            console.log(error))
   
}

const handleClose=()=>{
    setShow(false)}
 return(
    <div>
    {/* <Card style={{ width: '18rem' }} className=''>
<Card.Img variant="top" />
<Card.Body>
<Card.Title>Card Title</Card.Title> */}
<Modal show={show} onHide={handleClose}>
   
<Modal.Header className='bgColor' >
    Login
    <Link to={'/kpopMerch'}>
    <CloseButton /></Link>
</Modal.Header>
<Modal.Body>
  
<Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" name="username" value={username} onChange={changeUsername}/>
           
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" name="password" value={password} onChange={changePassword}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={login}>
            Login
</Button>
<span>New User?
<Link to={'/kpopMerch/createAccount'}  >Create Account</Link>
</span>
    </Form></Modal.Body>
    </Modal>

{/* </Card.Body>
</Card> */}


  </div>
 )
}
export default Login