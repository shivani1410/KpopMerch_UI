
import React,{Component} from 'react'
import { Form ,Modal,CloseButton,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav/Nav'
class Account extends Component{
    constructor(){
        super()
        this.state={
            nameOfUser:'',
            age:0,
            phone:0,
            username:'',
            password:'',
            show:true,
            response:'',
            resCheckUsername:''
        }
    }
    hadleClose=()=>{
        this.setState({
            show:false
        })
    }
    changeHandler=(e)=>{
        this.setState({
           [e.target.name]:e.target.value
        })
    }
    login=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8080/kpopMerch/createNewUser`,this.state).then(res=>{
            console.log(res)
         
           
            }).catch(error=>
                console.log(error))
        console.log(this.state)
    }
    checkUserName=(e)=>{
        e.preventDefault()
        console.log(this.state.username)
        let tempUsername={username:this.state.username}
        var qs=require('qs')
        var json=qs.parse(tempUsername)
        console.log(json)
        axios.post(`http://localhost:8080/kpopMerch/checkUsername`,json).then(res=>{
            console.log(res)
            this.setState({
                resCheckUsername:res.data
            })
            }).catch(error=>
                console.log(error))
        console.log(this.state)
    }
    render(){
        const {username,password,show,nameOfUser,age,phone,resCheckUsername}=this.state
        return(
            <div>
                   <Nav/>
            <Modal show={show} onHide={this.hadleClose}>
                <Modal.Header className="bgColor">
                Create Account
        <Link to={'/kpopMerch'}>
        <CloseButton /></Link>
                </Modal.Header>
                <Modal.Body>
                <Form>
            <Form.Group controlId="nameofUserControl">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="nameOfUser" value={nameOfUser} onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group controlId="ageControl">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" value={age} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
                <Form.Group  controlId="phoneControl">
                <Form.Label>Phone No</Form.Label>
                <Form.Control type="number" name="phone" value={phone} onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group  controlId="userControl">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={username} onChange={this.changeHandler}></Form.Control>
               </Form.Group>
               <Button onClick={this.checkUserName}> checkUserName</Button>{resCheckUsername}
               <Form.Group  controlId="passwordControl">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" value={password} onChange={this.changeHandler}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.login}>
                Login
  </Button>
                </Form>
                </Modal.Body>
            </Modal></div>
        )
    }
}
export default Account