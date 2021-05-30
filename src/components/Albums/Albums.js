import React, { useEffect ,useContext,useState, useRef} from 'react'
import Nav from '../Nav/Nav'

import {Row,ButtonGroup,ToggleButton,Accordion,Card,Button} from 'react-bootstrap'
import axios from 'axios'

import AlbumDetails from '../AlbumDetails/AlbumDetails'
import './AlbumStyle.css'
import Pagination from '../../Util/Pagination/Pagination'
function Albums(){
    const checked1 = useRef(false);
    const checked2 = useRef(false);
    const checked3 = useRef(false);
    const [allAlbums,setAllAlbums]=useState([])
    const [loading,setLoading]=useState(false)
    const artists=useRef([])
    useEffect(()=>{
    
    getAllArtists()
    getAllAlbums()
    },[]) 
    const getAllAlbums=async()=>{
        setLoading(true)
        const response= await axios.get(`http://localhost:8080/kpopMerch/getAllAlbums?Authorization=Bearer:${window.localStorage.getItem('token')}`)
        setAllAlbums(response.data)
        setLoading(false)

    }
    /////////Pagination Const///////////////
    // const [currentPage,setCurrentPage]=useState(1);
    const currentPage=useRef(1)
    const [itemPerPage]=useState(10);
    const indexOfLastItem=currentPage.current*itemPerPage
    const indexOfFirstItem=indexOfLastItem- itemPerPage
    const currentItem=allAlbums.slice(indexOfFirstItem,indexOfLastItem)
const paginate=pageNumber=>{
    console.log(pageNumber)
    currentPage.current=(pageNumber)}
    const getAllArtists=()=>{
        axios.get(`http://localhost:8080/kpopMerch/getAllArtists?Authorization=Bearer:${window.localStorage.getItem('token')}`).then(res=>{
          artists.current=res.data
            console.log(res.data)}
            
          ).catch(error=>{
            console.log(error)
        })
       }
    const   fetchAlbumsWithoutPrevState=()=>{
      axios.post(`http://localhost:8080/kpopMerch/getAlbumByArtistId?Authorization=Bearer:${window.localStorage.getItem('token')}`,{artistId:artId.current}).then(res=>{
        // artists.current=res.data
        setAllAlbums(res.data)
        console.log(res.data)}
          
        ).catch(error=>{
          console.log(error)
      })}
      const getAlbumsWithPrevState=()=>{
        axios.post(`http://localhost:8080/kpopMerch/getAlbumByArtistId?Authorization=Bearer:${window.localStorage.getItem('token')}`,{artistId:artId.current}).then(res=>{
            // artists.current=res.data
            setAllAlbums(prevState=>[...prevState,...res.data])
            console.log(res.data)
            console.log(allAlbums)
        }
           
              
            ).catch(error=>{
              console.log(error)
          })
       }
    
 const filterValue=useRef([])  
 const checkFilter=(e)=>{
   console.log(e.target.value)
 
  console.log(document.getElementById(e.target.value).checked)
  if(document.getElementById(e.target.value).checked){
 
    filterValue.current.push(e.target.value)
   
  }else{
    console.log("else")
    var index = filterValue.current.indexOf(e.target.value)
    console.log(index)
      if (index !== -1) {
        filterValue.current.splice(index, 1);
        
      }
   
  }
  console.log(filterValue)
  console.log(filterValue.current.length)

  for(var i=0;i<filterValue.current.length;i++){
    console.log(filterValue.current[i])
    if(i===0){
      artId.current=filterValue.current[0]
      fetchAlbumsWithoutPrevState()
    
    }else{
    artId.current=filterValue.current[i]
    console.log( artId.current)
    getAlbumsWithPrevState()
   
  }
}
 }     

       const artId=useRef()
return(
   

       
<div>
    <Nav/>
    
        
       <Row style={{display:'flex'}}> <div className='col-sm-2'>
           <div className='filterHeading filterBox'style={{marginLeft:"14px"}}>Filters
           </div>
         <Accordion defaultActiveKey="0" >
  <div className=' col-sm-12' style={{ marginTop:'10px'}}> 
    <Accordion.Toggle as={Card.Header} eventKey="1" className='bgColor'style={{width:'299px'}}>
      Artist
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
    <div style={{marginTop:'10px'}}> 
    { artists.current.map(artist=>(        <div className='artist'> 
                  <input type="checkbox" style={{marginTop:'6px',marginLeft:'10px'}} id={artist.artist_id}
                   name={artist.artistname} value={artist.artist_id} onClick={checkFilter}/>
<label for={artist.artistname} style={{marginLeft:'10px',color:'whitesmoke'}}> {artist.artistname}</label> </div> ))}</div>
  
   
     
    </Accordion.Collapse>
  </div>
 
</Accordion>

           </div>
    <div className='col-sm-10'>
            <AlbumDetails allAlbums={currentItem} loading={loading}/></div>   </Row>
            <Pagination itemPerPage={itemPerPage} totalItems={allAlbums.length} paginate={paginate}/>
          </div>
    
)
}
export default Albums