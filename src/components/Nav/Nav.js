
import './Nav.css'
import React,{useState,useEffect,useRef} from 'react'
import {Overlay,Popover,NavDropdown,Form,FormControl} from 'react-bootstrap'
import axios from 'axios' 
import { useHistory } from 'react-router'
import {Link} from 'react-router-dom'
import { FaHome} from "react-icons/fa";
import { AiTwotoneAppstore} from "react-icons/ai";
import { GiMusicalNotes,GiMusicalScore } from "react-icons/gi";
function Nav(){
    const [showCategory,setShowCategory]=useState(false)
    const [showArtist,setShowArtist]=useState(false)
    const categories=useRef([])
    const artists=useRef([])
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const results=useRef([])
    const nameOfUser=useRef('')
    const [search,setSearch]=useState('')
    const searchRes=useRef('')
    const history=useHistory()
    useEffect(()=>{
        getAllCategories()
        categoryHide()
        getAllArtists()
        setSearch('')
        results.current=[]
        nameOfUser.current=window.localStorage.getItem('UserName')
        console.log(nameOfUser.current)
      },[])
   
      const logout=()=>{
        window.localStorage.clear()
        history.push("/kpopMerch/Login")
      }
       const handleClick = (event) => {
        
         setTarget(event.target);
       };
      
        const changeSearch=(e)=>{
          e.preventDefault()
          searchRes.current=e.target.value
          searchNewAlbums()
          console.log("search change   "+e.target.value)
      setSearch(e.target.value)
      
      
         }
         const searchNewAlbums=()=>{
           console.log(searchRes.current)
          axios.post(`http://localhost:8080/kpopMerch/getAlbumByName?Authorization=Bearer:${window.localStorage.getItem('token')}`,{search:searchRes.current})
          .then(res=>{
      
          results.current=(res.data)
          if(results.current!=[]){
            setShow(true)
          }
          console.log(results)
      
           
       }).catch(error=>{
           console.log(error)
       })
       }
      const artistShow=(event)=>{
       
        setShowCategory(false)
        setShowArtist(!showArtist)
        console.log(showCategory)
       }
       const categoryHide=()=>{
        setShowArtist(false)
        setShowCategory(false)
        console.log(showCategory)
       }
      const categoryShow=(event)=>{
      
        setShowCategory(!showCategory)
        setShowArtist(false)
        console.log(showCategory)
       }
       const getAllCategories=()=>{
        axios.get(`http://localhost:8080/kpopMerch/getAllCategory?Authorization=Bearer:${window.localStorage.getItem('token')}`).then(res=>{
          categories.current=res.data
            console.log(res.data)}
            
          ).catch(error=>{
            console.log(error)
        })
       }
       const getAllArtists=()=>{
        axios.get(`http://localhost:8080/kpopMerch/getAllArtists?Authorization=Bearer:${window.localStorage.getItem('token')}`).then(res=>{
          artists.current=res.data
            console.log(res.data)}
            
          ).catch(error=>{
            console.log(error)
        })
       }
    const hamburger=document.querySelector(".hamburger")
    const navLinks=document.querySelector(".nav-links")
    const links=document.querySelector(".nav-links li")
  const  hamburgerClick=()=>{
        navLinks.classList.toggle("open")
    }
    return (
        <nav>
        <div className="hamburger" onClick={hamburgerClick} >
          <div className="line "></div>
          <div className="line "></div>
          <div className="line "></div>
        </div>
    
      <div className="navBrand">
        <Link  to={'/kpopMerch'} style={{color:'white'}}>Kpop Merchandise</Link>
      <div ref={ref} style={{width:'500px',marginLeft:"10px"}}>
      <Form > 
      <FormControl className=" common "placeholder="Search"
            type="text" name="search" value={search} onChange={changeSearch} onClick={handleClick} /></Form>
      <Overlay
        show={show}
        target={target}
        placement="bottom-start"
        container={ref.current}
        style={{width:'100%'}}
      >
        <Popover id="popover-contained" style={{width:'200px'}}>
         
          <Popover.Content>
          {
              results.current.map(result=>(
               
                  <NavDropdown.Item  className='bgColor  common dropDown'  key={result.albumId}>
                    {result.albumName}</NavDropdown.Item> 
              ))}
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
   
    </div>
  <div style={{display:"flex"}}>
        <NavDropdown style={{color:'whitesmoke',marginLeft:'300px'}} title="My Account" id="collasible-nav-dropdown" className="nav-text">
          <NavDropdown.Item  className='bgColor'  onClick={logout}>Orders</NavDropdown.Item>
          <NavDropdown.Item  className='bgColor'  >Wishlist</NavDropdown.Item>
         
        </NavDropdown>
        <NavDropdown style={{color:'whitesmoke'}} title={nameOfUser.current} id="collasible-nav-dropdown" className="nav-text-logout">
          <NavDropdown.Item  className='bgColor'  onClick={logout}>Logout</NavDropdown.Item>
          
        </NavDropdown></div>
        <ul className="nav-links">
          <li ><a href="/kpopMerch"> <FaHome style={{marginRight:"35px"}}/>Home</a></li>
          <li ><a style={{display:"flex"}}>
          <AiTwotoneAppstore  style={{marginTop:"10px",marginLeft:"10px"}}/>
          <NavDropdown style={{color:'whitesmoke'}} title="Category">
          <NavDropdown.Item  className='  common '   >
                    <Link to={`/kpopMerch/Albums/`} >Albums</Link>
                    <Link to={`/kpopMerch/SeasonGreeting/`} >SeasonGreeting</Link>
                     </NavDropdown.Item> 
         
        </NavDropdown>
        </a></li>
          <li ><a style={{display:"flex"}}>
          <GiMusicalNotes  style={{marginTop:"10px",marginLeft:"10px"}}/>
          <NavDropdown style={{color:'whitesmoke'}} title="Artist">
         { artists.current.map(artist=>(
                
              

<NavDropdown.Item className='bgColor' style={{color:'whitesmoke',borderBottom:'0.5px solid whitesmoke'}}
key={artist.artist_id}>
 <Link to={`/kpopMerch/getArtistByName/${artist.artistname}`} style={{color:'whitesmoke'}}>{artist.artistname}</Link></NavDropdown.Item>
              ))}</NavDropdown>
         
       
              </a></li>
              <li ><a href="/kpopMerch/Charts"> <GiMusicalScore style={{marginRight:"35px"}}/>Charts</a></li>
        </ul>
      </nav>
    )
}  
export default Nav