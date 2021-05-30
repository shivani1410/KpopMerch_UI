import React, { useState ,useContext, useEffect} from 'react'
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

function Payment(){
    const [orderId,setOrderId]=useState()
    const [details,setDetails]=useContext(UserDetailsContext)
    const [token,setToken]=useContext(LoginContext)
    const [albumId,setAlbumId]=useState()
    async function displayRazorpay(){
        const res=loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res){
            alert("error occured")
            return
        }
        const options = {
            "key":"rzp_test_58VLPUUblenqlA", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Kpop Merch",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
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
    useEffect(()=>{
        getOrder()
    },[])
    const getOrder=()=>{
  
        console.log(albumId)
        axios.post(`http://localhost:8080/kpopMerch/orders?Authorization=Bearer:${token}`,{id:'1'}).then(res=>{
        console.log(res.data.id)
          setOrderId(res.data.id)
         console.log(orderId)
          }).catch(error=>
              console.log(error))
      }
    return(
        <div>
            <button onClick={displayRazorpay}>Pay Now</button>
        </div>
    )
}
export default Payment