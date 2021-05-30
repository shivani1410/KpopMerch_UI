import React , {useEffect, useState,useContext}from 'react'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import HomeStyle from './HomeStyle.module.css'
import {UserDetailsContext} from '../../Context/UserDetailsContext'
import { useHistory } from 'react-router'
import Nav from '../Nav/Nav'

import {LoginContext} from '../../Context/LoginContext'
function Home(){
    const [carousel,setCarousel]=useState([])
    const [index, setIndex] = useState(0);
    const [newAlbum,setNewAlbum]=useState([])
    const history=useHistory()
    const [albumId,setAlbumId]=useState()
    const [details,setDetails]=useContext(UserDetailsContext)
    const [token,setToken]=useContext(LoginContext)
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      const responsiveOffers = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    const fetchCarousel=()=>{
        axios.get(`http://localhost:8080/kpopMerch/getAllCarousel?Authorization=Bearer:${window.localStorage.getItem('token')}`).then(res=>{
           
             setCarousel(res.data)
        
           
                // setCarousel.push(<img src={'data:image/PNG;base64,'+res.data[i]} style={{width: '15.5rem',  display:'flex',flexWrap:'wrap'}} /> )
                 
        
            
            // console.log(carousel)
        }).catch(error=>{
            console.log(error)
        })
    }

    const fetchNewAlbums=()=>{
      let isMounted = true;
   
        axios.get(`http://localhost:8080/kpopMerch/getNewAlbums?Authorization=Bearer:${window.localStorage.getItem('token')}`).then(res=>{
            console.log(res)
            if (isMounted){ setNewAlbum(res.data)}
           
            
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
      console.log(details)
      fetchNewAlbums()
      fetchCarousel()
      console.log(window.localStorage.getItem('token'))
     
        
       
    },[])


  const buyNow=(event)=>{
    setAlbumId(event.target.name)
    history.push(`/kpopMerch/orderNow/${event.target.name}`)
  }
  const allAlbums=(event)=>{
    // setAlbumId(event.target.name)
    history.push(`/kpopMerch/Albums/`)
  }
    return(
        <div >
          <Nav/>
          {/* <Navigation/> */}
         {/* <button onClick={allAlbums}>all Albums</button> */}
            <Carousel responsive={responsiveOffers} className={HomeStyle.carousel}
             swipeable={false}
             draggable={false}
             showDots={false}
            
             ssr={true} // means to render carousel on server-side.
             infinite={true}
             autoPlay={true }
             autoPlaySpeed={5000}
             keyBoardControl={true}
             customTransition="all .5"
             transitionDuration={5000}
             containerClass="carousel-container"
             removeArrowOnDeviceType={["tablet", "mobile"]}
           
             dotListClass="custom-dot-list-style"
             itemClass="carousel-item-padding-40-px">
          { carousel.map(carouselImg=>(
                  <div key={carouselImg.carouselId }>  
            <img  className={HomeStyle.carouselImg}
            key={carouselImg.carouselId }src={'data:image/PNG;base64,'+carouselImg.carouselImg} 
              alt={carouselImg.carouselImg}/>
            </div>
       ))} 
  
</Carousel>
<div className=" col-sm-12 bgColor" className={HomeStyle.bgColor}style={{height:'35px', alignContent:'flex-start'}}>
    <h3 className={HomeStyle.heading}>New Release</h3></div>
          <Carousel responsive={responsive}
          swipeable={false}
          draggable={false}
          showDots={false}
         
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true }
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={5000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px">
              
          { newAlbum.map(newAlbumImg=>(
                  <div key={newAlbumImg.albumId } style={{width:'20rem'}}> 
                  <Card style={{width:'20rem',height:'480px',marginTop:'15px',marginBottom:'15px'}}>
  <Card.Img variant="top" src={'data:image/PNG;base64,'+newAlbumImg.albumCover}  
className={HomeStyle.albumDetails} />
  <Card.Body className={HomeStyle.albumText} >
    <Card.Title style={{fontSize:'30px'}}>{newAlbumImg.albumName}</Card.Title>
    <Card.Text>
    {newAlbumImg.artistName}
   
    <br/> {newAlbumImg.releaseDate}
    <br/><Button onClick={buyNow} name={newAlbumImg.albumId } style={{marginTop:'10px'}}>Buy Now</Button>
    </Card.Text>
   
  </Card.Body>

</Card>

            </div>
       ))} 
  
</Carousel>

          </div>
    )
   
}
export default Home