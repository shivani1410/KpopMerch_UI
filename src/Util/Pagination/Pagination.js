import React from 'react'

const Pagination=({itemPerPage,totalItems,paginate})=>{
    console.log(itemPerPage)
    console.log(totalItems)
    const pageNumber=[]
    for(let i=1;i<= Math.ceil(totalItems/itemPerPage);i++){
        pageNumber.push(i)
        console.log(pageNumber)
    }
    return(
       <nav style={{background:"white", justifyContent:"center"}}>
           <ul className="pagination" style={{alignContent:"center",justifyContent:"center"}}>
               {pageNumber.map(number=>(
                   <li key={number} className="page-item" >
                       <a onClick={()=>paginate(number)} href="!#" className="page-link">
                           {number}
                       </a>
                   </li>
               ))}
           </ul>
       </nav>
    )
}
export default Pagination