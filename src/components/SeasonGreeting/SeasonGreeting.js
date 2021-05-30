import React, { useEffect,useRef,useState ,Suspense} from 'react'

import axios from 'axios'
import './SeasonGreeting.css'

import {Card,Row,Col,Container,Button,Spinner} from 'react-bootstrap'
const SeasonGreeting=()=>{
    const [seasonGreeting,setSeasonGreeting]=useState([])
    const [loading,setLoading]=useState(false)
    const [page,setPage]=useState(0)
    useEffect(()=>{
        getSeasonGreeting()
      window.addEventListener('scroll',handleScroll)
        },[]) 
   const handleScroll=()=>{
       if(
           Math.ceil(window.innerHeight+document.documentElement.scrollTop)!==document.documentElement.offsetHeight ||
           loading
       )
       return
       setLoading(true)
   };
   const getSeasonGreeting=async()=>{
       const parameter={"offset":page}
       setTimeout(async()=>{
        const result= await axios.post(`http://localhost:8080/kpopMerch/getAllSeason?Authorization=Bearer:${window.localStorage.getItem('token')}`,{},{params:{"offset":page}})
          const data= result.data
          console.log(result.data)
          setPage(page+3)
          setSeasonGreeting(()=>{
              return[...seasonGreeting,...data]
          });
       },1000)
   }
   useEffect(()=>{
       if(!loading) return;
       getMoreSeasonGreeting()
   },[loading])
   const getMoreSeasonGreeting=()=>{
    getSeasonGreeting()
    setLoading(false)
   }
       return(
           <Container >
               
      
           <Row >
        <Col sm={2} >
            <div></div>
        </Col>
     <Col sm={10}   >
        <Row style={{alignContent:'center'}} >
        { seasonGreeting.map(sg=>(
                       <div key={sg.sgId } className='col-sm-4'>
                   <Suspense>    
                       <Card style={{width:'15rem',height:'350px',margin:'20px'}} >
       <Card.Img variant="top" src={'data:image/PNG;base64,'+sg.sgImg}  
     className="albumDetails"  />
       <Card.Body className="albumText">
         <Card.Title style={{fontSize:'20px'}}>{sg.artistName}</Card.Title>
         {/* <Card.Text>
         {newAlbumImg.artistName}
        
         <br/> {newAlbumImg.releaseDate}
         <br/><Button onClick={buyNow} name={newAlbumImg.albumId } style={{height:"40px", width:"100px", alignContent:"center"}}>Buy Now</Button>
     
         </Card.Text> */}
        
       </Card.Body>
     
     </Card></Suspense>  
     
      </div>
            ))} </Row>
            </Col>
            </Row>
            {loading && <h1>Fetching more list items...</h1>}
         </Container>
       )
}
export default SeasonGreeting