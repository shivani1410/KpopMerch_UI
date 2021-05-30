import React from 'react'
import './AlbumDetails.css'
import {Card,Row,Col,Container,Button,Spinner} from 'react-bootstrap'
import Nav from '../Nav/Nav'
import { useHistory } from 'react-router'
const AlbumDetails=({allAlbums,loading})=>{
  const history=useHistory()

   if(loading){
    return  <div  style={{justifyContent:'center',marginTop:'20%'}}>
      <Spinner animation="border" size="sm" />
    <Spinner animation="grow" />
  
    <Spinner animation="border" size="sm" />
    <Spinner animation="grow" /></div>
  //   <Spinner animation="border" role="status" style={{justifyContent:'center',marginTop:'20%'}} >
  //   <span className="sr-only">Loading...</span>
  // </Spinner>
        // <h2>loading....</h2>
   }
   const buyNow=(event)=>{
    // setAlbumId(event.target.name)
    history.push(`/kpopMerch/orderNow/${event.target.name}`)
  }
   return <Container><Row>
   <Col sm={2} >
       <div></div>
   </Col>
<Col sm={10} > 
   <Row style={{alignContent:'center'}}>
   { allAlbums.map(newAlbumImg=>(
                  <div key={newAlbumImg.albumId } className='col-sm-4'>
                    
                  <Card style={{width:'15rem',height:'350px',margin:'20px'}} >
  <Card.Img variant="top" src={'data:image/PNG;base64,'+newAlbumImg.albumCover}  
className="albumDetails"  />
  <Card.Body className="albumText">
    <Card.Title style={{fontSize:'20px'}}>{newAlbumImg.albumName}</Card.Title>
    <Card.Text>
    {newAlbumImg.artistName}
   
    <br/> {newAlbumImg.releaseDate}
    <br/><Button onClick={buyNow} name={newAlbumImg.albumId } style={{height:"40px", width:"100px", alignContent:"center"}}>Buy Now</Button>

    </Card.Text>
   
  </Card.Body>

</Card>

 </div>
       ))} </Row>
       </Col>
       </Row>
       </Container>

 
}
export default AlbumDetails