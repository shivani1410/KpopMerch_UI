import React, { useState,useEffect ,useContext} from 'react'
import axios from 'axios' 
import {Container,Row,Col,Card} from 'react-bootstrap'
import ArtistStyle from './ArtistStyle.module.css'

import {LoginContext} from '../../Context/LoginContext'
import Nav from '../Nav/Nav'
function ArtistDesc( match)
{ const [artistId,setArtistId]=useState({artistname:match.match.params.id})
const [artistData,setArtistData]=useState({})
const [base64Image,setBase64Image]=useState()
const [token,setToken]=useContext(LoginContext)
const fetchArtist=async()=>{
    axios.post(`http://localhost:8080/kpopMerch/getArtistByName?Authorization=Bearer:${window.localStorage.getItem("token")}`,{artistname:match.match.params.id}).then(res=>{
        console.log(res.data)
        setArtistData(res.data)
        
         setBase64Image(<img src={'data:image/PNG;base64,'+res.data.artist_img} style={{width: '16.5rem',height:'400px',  display:'flex',flexWrap:'wrap'}} /> )
      

        }).catch(error=>{
            console.log(error)
    })

}

useEffect(()=>{
  
    console.log(artistId)
    
     console.log(match.match.params.id)
     fetchArtist();
     
    
},[match.match.params.id])

    return(
    <div>
             {/* <NavigationBar/> */}
             <Nav/>
            <Container fluid >
         <Row className={ArtistStyle.heading}><Col className="justify-content-center">{artistData.artistname}</Col></Row>
         <Row  className={ArtistStyle.desc}>
                <Col sm={3}  > 
                <Card style={{ width: '19rem' }}>
                <Card.Header> {base64Image} </Card.Header>
                </Card>
                </Col>
                <Col sm={9}>
                    {artistData.desc}</Col>
              
                    </Row></Container>
            
             
                    </div>
        
    )

}
export default ArtistDesc