import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import M from "materialize-css"
var userId
if(localStorage.getItem("user"))
   userId=JSON.parse(localStorage.getItem("user"))._id
else
   userId=""
const Home = ()=>{
   const [data,setData]=useState([])
   useEffect(()=>{
      fetch("/allPost",{
         headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
      }).then(res=>res.json())
      .then(result=>{
         console.log(result)
         setData(result.posts)
      })
   }
   ,[])

  
   const makeComment=(text,postId)=>{
      fetch("/comment",{
         method:"put",
         headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt") 
         },
         body:JSON.stringify({
            postId,
            text
         })
      }).then(res=>res.json())
      .then(result=>{
         console.log(result)
         const newData = data.map(item=>{
            if(item._id===result._id)
               return result
            return item
         })  
         setData(newData)    
      }).catch(err=>{console.log(err)})
   }
   
   return( 
      <div className="home">
      
      {  data.length>0 ?
            data.slice(0).reverse().map(item=>{
               return(
                  <div className="card home-card" key={item._id}>
                     
                  <h5>
                     <div style={{display:"flex"}}>
                        {/* <div>
                           <img className="user_pic" src="https://res.cloudinary.com/rohit1coding/image/upload/v1613576167/blank-profile-picture-973460_640_k0dny4.webp" alt="" />
                        </div> */}
                           <div>
                              <b><div className="blog_email">{item.postedBy.email}</div></b>
                           </div>
                           {/* {item.postedBy._id===userId 
                              && <button className="#fff3e0 orange lighten-5" style={{marginLeft:"auto",border:"0.1rem solid white"}}
                                 onClick={()=>deletePost(item._id)} >
                              <i className="material-icons" > delete</i>
                           </button>} */}
                     </div>
                     <div className="blog_body">
                        <p>{item.body}</p>
                     </div>
                  </h5>
                  {/* <div className="card-image">
                     <img className="allPost" src={item.photo} alt="Reload" />
                  </div> */}
                  <div style={{marginTop:"0rem"}} className="card-content">
                  {/* <div >
                     {item.likes.includes(userId) ?
                        <i className="small material-icons" onClick={()=>{unlikePost(item._id)} }> thumb_down</i>
                        :  
                        <i className="small material-icons" onClick={()=>{likePost(item._id)}}> thumb_up</i>
                     }
                  </div> */}
                  
                     {/* <h6>{item.likes.length} likes</h6> */}
                     {/* <h6>{item.title}</h6> */}
                     
                     {
                        item.comments.map(record=>{
                           return(
                           <h6 key={record._id}>
                              <span style={{fontWeight:"500"}}>{record.postedBy.email}:</span> 
                              {record.text}</h6>
                           )
                        })
                     }
                     <form onSubmit={(e)=>{
                        e.preventDefault()
                        makeComment(e.target[0].value,item._id)
                        e.target[0].value=""
                     }} >
                        <input type="text" placeholder="comment"></input>
                     </form>
      
                  </div>
               </div>
               )
            }) 
         :<h2 style={{textAlign:"center",color:"red"}}>Loading...!!</h2>}   
    </div>
   )
}
export default Home