import React,{Component} from 'react'
import { Button,Form } from 'react-bootstrap'
import axios from 'axios'
import {Modal} from'react-bootstrap'
import {Link} from 'react-router-dom'
import {CloseButton} from 'react-bootstrap';
import Home from '../Home/Home'
class UserLogin extends Component{
    constructor(match){
        
        super()
        this.state={
            username:'',
            password:'',
            response:'',
            show:true
           
            
        }
        console.log(match)
    }
  
    changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
 
    login=(event)=>{
        event.preventDefault()
        axios.post(`http://localhost:8080/kpopMerch/Login`,this.state).then(res=>{
            console.log(res)
            // this.setState({
            //     response:res.data
            // })
            // if(res.data="Login Successful"){
            //     this.props.history.push('/kpopMerch');
              
            // }
            }).catch(error=>
                console.log(error))
        console.log(this.state)
    }
    handleClose=()=>{
        this.setState({
            show:false
        })
    }
    render(){
        const {username,password,response,show}=this.state
    return (
        <div>
        {/* <Card style={{ width: '18rem' }} className=''>
  <Card.Img variant="top" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title> */}
    <Modal show={show} onHide={this.handleClose}>
       
    <Modal.Header className='bgColor' >
        Login
        <Link to={'/kpopMerch'}>
        <CloseButton /></Link>
    </Modal.Header>
    <Modal.Body>
      
    <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" name="username" value={username} onChange={this.changeHandler}/>
               
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password" name="password" value={password} onChange={this.changeHandler}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.login}>
                Login
  </Button>{response}
  <span>New User?
 <Link to={'/kpopMerch/createAccount'}  >Create Account</Link>
 </span>
        </Form></Modal.Body>
        </Modal>
   
  {/* </Card.Body>
</Card> */}


      </div>
    )}
}
export default UserLogin