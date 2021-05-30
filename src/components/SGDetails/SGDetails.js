import React from 'react'
import SeasonGreeting from '../SeasonGreeting/SeasonGreeting'
import Nav from '../Nav/Nav'
import './SGDetails.css'
function SGDetails(){
 return <div class="scrollbar scrollbar-primary">  
 <Nav/>
 <SeasonGreeting class="force-overflow"/>
 </div>
}
export default SGDetails