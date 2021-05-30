import React, { useEffect,useRef,useState } from 'react'
import top from '../../asset/top10.PNG'
import Nav from '../Nav/Nav'
import {Row,Container,Col,Card} from 'react-bootstrap'

import axios from 'axios'
import './Charts.css'
import { CircularProgressbar ,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Charts(){
    const albums=useRef([])
//    const playVideo=(event)=> {
//         // access to player in all event handlers via event.target
//         event.target.pauseVideo()
//       }
    useEffect(()=>{
        getTopCharts()  
    },[])
    const getTopCharts=()=>{
        axios.get(`http://localhost:8080/kpopMerch/getTopCharts?Authorization=Bearer:${window.localStorage.getItem('token')}`).then(res=>{
        
            albums.current=res.data
            console.log(albums.current)
           
        }).catch(error=>{
            console.log(error)
        })
    }
    const percentage = 66;
   //https://youtu.be/_5GsoyqLns4
return (
    
    <div>
        <Nav/>
        <Container>
            <Col>
            <Row style={{marginTop:'20px'}}>
        <img src={top}  style={{height:'300px',width:'1110px'}} /> 
    
       
        </Row>
        </Col>
        <Row>
            <Col>
            <div style={{marginTop:'20px'}}>
      
        { albums.current.map((album,index)=>(
          <Card key={album.albumId}>
               <Card.Header  style={{display:'flex'}} id={"album"+index+1} className="head1"> 
               <span style={{fontSize:'32px'}}> {album.albumName} 
               
               </span>
               <span style={{fontSize:'20px',justifyContent: 'flex-start',position:'absolute',marginTop:'50px', borderTop: '1px solid white'}} > {album.artistName}  
            
            </span>
               <span style={{marginTop:'120px',justifyContent: 'flex-start',marginRight:'auto',fontSize:'20px'}} className='hover-content'>
               <iframe src={album.url} style={{width:'500px',height:'250px'}}
        frameborder='0' className='hover-content'
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
/>
<div style={{height:'150px',width:'150px', marginLeft:'600px',marginTop:'50px'}}>
<CircularProgressbar value={100-(index)*10} text={`${index+1}`} 
 styles={buildStyles({
    textColor: "white",
    pathColor: "white",
    trailColor: "#7ee8fa"
  })}
/>
<span>Rank</span>


</div>  
<div style={{height:'150px',width:'150px', justifyContent:'flex-end',position:'absolute',left:'800px',top:'47px'}}  className='ml-auto'> 
<CircularProgressbar value={100-(album.count)*10} text={`${album.count}`} 
 styles={buildStyles({
    textColor: "white",
    pathColor: "white",
    trailColor: "#eec0c6"
  })}
/>
<span>Albums Sold</span>


</div>
 </span>
    
               
              
               <img src={'data:image/PNG;base64,'+album.albumCover}  className='ml-auto'/>
            
            </Card.Header>
              
              </Card>  
         
        ))}
           </div>
           </Col>  
        </Row>
        </Container>

    </div>
)
}export default Charts