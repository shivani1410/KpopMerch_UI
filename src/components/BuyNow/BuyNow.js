import React, { useEffect, useState,useContext,useRef } from 'react'
import {Accordion,Card,Form,Row,ButtonGroup,ToggleButton,Container,Col,Table,Button} from 'react-bootstrap'
import './BuyNow.css'
import { useHistory } from 'react-router'

import Nav from '../Nav/Nav'

import {UserDetailsContext} from '../../Context/UserDetailsContext'
import axios from 'axios'
import {LoginContext} from '../../Context/LoginContext'

function loadScript(src){
  return new Promise(resolve=>{
  const script=document.createElement('script')
  script.src='https://checkout.razorpay.com/v1/checkout.js'
  setTimeout(()=>{console.log(window.Razorpay)},10000)
  document.body.appendChild(script)
})
}

function BuyNow(match) {


const [customerName,setCustomerName]=useState('')
const [customerAddress,setCustomerAddress]=useState('')
const [customerPhone,setCustomerPhone]=useState('')
const [customerPin,setCustomerPin]=useState('')
const [customerCity,setCustomerCity]=useState('')
const [customerState,setCustomerState]=useState('')
const [customerCountry,setCustomerCountry]=useState('')
const [addType,setAddType]=useState('')
const [albumId,setAlbumId]=useState()
const [userId,setUserId]=useState('')
const [totalPrice,setTotalPrice]=useState(0)
const [details,setDetails]=useContext(UserDetailsContext)
const [token,setToken]=useContext(LoginContext)
const [albumDetails,setAlbumDetails]=useState({})
const history=useHistory()
const [orderId,setOrderId]=useState()
const idOrder=useRef()
useEffect(()=>{
  const res=loadScript('https://checkout.razorpay.com/v1/checkout.js')
  if(!res){
      alert("error occured")
      return
  }
   setAlbumId(match.match.params.id)
   console.log(match.match);
  console.log(details)
  setUserId(details.userid)
  getAlbum()
  console.log(albumDetails.price)
  console.log(orderId)
  getOrder()
  
},[])
   
const getAlbum=()=>{
  
  console.log(albumId)
  axios.post(`http://localhost:8080/kpopMerch/getAlbumById?Authorization=Bearer:${window.localStorage.getItem('token')}`,{id:match.match.params.id}).then(res=>{
  
   setAlbumDetails(res.data)
   console.log(albumDetails.price)
    }).catch(error=>
        console.log(error))
}
const changeCustName=e=>{
  setCustomerName(e.target.value)
}
const changeCustAdd=e=>{
  setCustomerAddress(e.target.value)
}
const changeCustPhone=e=>{
  setCustomerPhone(e.target.value)
}
const changeCustPin=e=>{
  setCustomerPin(e.target.value)
}
const changeCustCity=e=>{
  setCustomerCity(e.target.value)
}
const changeCustState=e=>{
  setCustomerState(e.target.value)
}

const changeCustCountry=e=>{
  setCustomerCountry(e.target.value)
}
const changeAddType=e=>{
  setAddType(e.target.value)
}



    const  radios = [
        { name: 'Home', value: '1' },
        { name: 'Work', value: '2' },
       
      ];
      const payNow=()=>{
        // setAlbumId(event.target.name)
        history.push(`/kpopMerch/Payment/`)
      }
      const saveAddress=()=>{
        console.log(albumId)
        axios.post(`http://localhost:8080/kpopMerch/saveOrderDetails?Authorization=Bearer:${window.localStorage.getItem('token')}`,
        {customerName:customerName,customerPhone:customerPhone,cutomerCity:customerCity,
          customerPin:customerPin,customerAddress:customerAddress,
          customerState:customerState,customerRadio:addType,userId:window.localStorage.getItem('UserId'),albumId:albumId}).then(res=>{
        
         
         console.log(res.data)
          }).catch(error=>
              console.log(error))
      }
      
     
      async function displayRazorpay(){
        
          // const script=document.createElement('script')
          // script.src='https://checkout.razorpay.com/v1/checkout.js'
        
          
          // document.body.appendChild(script)
        
          const options = {
              "key":"rzp_test_58VLPUUblenqlA", // Enter the Key ID generated from the Dashboard
              "amount": albumDetails.totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Kpop Merch",
              "description": "Test Transaction",
              "image": 'data:image/PNG;base64,'+albumDetails.albumCover,
              "order_id":  idOrder.current, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "handler": function (response){
                  alert(response.razorpay_payment_id);
                  alert(response.razorpay_order_id);
                  alert(response.razorpay_signature)
              },
              "prefill": {
                  "name": customerName,
                  "email": "gaurav.kumar@example.com",
                  "contact": customerPhone
              },
              "notes": {
                  "address": "Razorpay Corporate Office"
              },
              "theme": {
                  "color": "#3399cc"
              }
          };
         
          const paymentObject = new window.Razorpay(options);
           
         
            paymentObject.open();
          
      }
      const getOrder=async()=>{
  
        console.log(albumId)
        // const data=await fetch(`http://localhost:8080/kpopMerch/orders?Authorization=Bearer:${token}`,{id:'1'},{method:'POST'});
        // console.log(data.json())
       axios.post(`http://localhost:8080/kpopMerch/orders?Authorization=Bearer:${window.localStorage.getItem('token')}`,{id:'1'}).then(res=>{
        console.log(res.data.id)
        idOrder.current=res.data.id
         setOrderId(res.data.id)
         console.log(orderId)
          }).catch(error=>
              console.log(error))
       }
    return(
      <div>
        <Nav/>
       
        <Container fluid >
            <Row  >
            <Col sm={8}>
<Accordion defaultActiveKey="0">
    <Card  className='bgColor' style={{marginTop:'25px'}}>
<Accordion.Toggle as={Card.Header} eventKey="1">
    Add Address
</Accordion.Toggle>
<Accordion.Collapse eventKey="1">
<Card.Body style={{backgroundColor:'white'}}>
<Form>
            <Form.Group controlId="customerNameControl">
                <Row>
              
                <Form.Control className="col-sm-4 common"placeholder="Name"
                 style={{marginRight:'20px'}}type="text" name="customerName" value={customerName} onChange={changeCustName}></Form.Control>
              
                <Form.Control type="text"  className="col-sm-4 common" placeholder="Phone"
                  name="customerPhone" value={customerPhone} onChange={changeCustPhone}></Form.Control>
                </Row>
                <Row style={{margin:'20px'}}></Row>
                <Row>
               
                <Form.Control className="col-sm-4 common" placeholder="Pin"
                style={{marginRight:'20px'}}type="text" name="customerPin" value={customerPin} onChange={changeCustPin}></Form.Control>
               
                <Form.Control type="text"  className="col-sm-4 common" placeholder="City" 
                 name="customerCity" value={customerCity} onChange={changeCustCity}></Form.Control>
                </Row>
                <Row style={{margin:'20px'}}></Row>
                <Row>
             
                <Form.Control className="common" style={{marginRight:'20px', width:'925px' , height:'100px'}}type="text" placeholder="Adress"
                 name="customerAddress" value={customerAddress} onChange={changeCustAdd}></Form.Control>
                
                </Row>
                <Row style={{margin:'20px'}}></Row>
                <Row>
                <Form.Control className="col-sm-4 common" placeholder="State"
                style={{marginRight:'20px'}}type="text" name="customerState" value={customerState} onChange={changeCustState}></Form.Control>
               
               <ButtonGroup toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="addType"
            value={addType}
            checked={addType === radio.value}
            onChange={changeAddType} style={{marginRight:'15px', backgroundColor:'#7ee8fa', border:'#7ee8fa'}}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
               <Button onClick={saveAddress}>Submit</Button>
                </Row>
              
                 </Form.Group></Form>
</Card.Body>
</Accordion.Collapse>
</Card>
</Accordion>
<Accordion defaultActiveKey="0">
    <Card  className='bgColor' style={{marginTop:'25px'}}>
    <Accordion.Toggle as={Card.Header} eventKey="1">
    Payment
</Accordion.Toggle>

<Accordion.Collapse eventKey="1">
<Card.Body style={{backgroundColor:'white'}}>
<Button style={{display:'flex'}}onClick={displayRazorpay}>Payment Options</Button>
</Card.Body>
</Accordion.Collapse>
</Card>
</Accordion>
</Col>
<Col sm={3} style={{marginLeft:'50px'}}>
<Card style={{width:'20rem',height:'450px',marginTop:'25px',marginBottom:'15px'}}>
  <Card.Img variant="top" src={'data:image/PNG;base64,'+albumDetails.albumCover}  
className='albumCard' />
  <Card.Body className='albumText' >
    <Card.Title style={{fontSize:'30px'}}>{albumDetails.albumName}</Card.Title>
    <Card.Text>
    {albumDetails.artistName}
  <br/> 
    {albumDetails.releaseDate}
  
    </Card.Text>
   
  </Card.Body>

</Card>
<Card style={{width:'20rem',height:'240px',marginTop:'25px',marginBottom:'15px'}}>
  
  <Card.Body  >
  <Card.Title className='priceTitle'>Price Details</Card.Title>
    <Card.Text  >
    <Table responsive >
    <tbody style={{color:'#7ee8fa',fontSize:'15px'}}>
    <tr >
      <td  >Price</td>
      <td >Rs. {albumDetails.price}</td></tr>
      <tr>
      <td>Delivery Charges</td>
      <td>Rs. 50</td></tr>
      <tr>
      <td>Total Payable</td>
      <td>Rs. {albumDetails.totalPrice}</td></tr>
      </tbody>

      </Table>
  
   
    </Card.Text>
   
  </Card.Body>

</Card>
</Col>
</Row>
</Container>
</div>
)
}
export default BuyNow