import React,{useState,useEffect} from "react"
import {useHistory} from "react-router-dom"
import M from "materialize-css"

const CreatePost = ()=>{
    const [title,setTitle]=useState("")
    const [body , setBody]= useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
    const history = useHistory("")
    useEffect(()=>{
        if(url){
        fetch("/CreatePost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                 "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                title,
                body,
                picUrl:url
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
              M.toast({html: data.error, classes:"#c62828 red darken-3"})
              return
            }
            M.toast({html:"Post Created Successfully!",classes:"#388e3c green darken-2"})
            history.push("/")
            })
            .catch(err =>{console.log(err)})
        }
    },[url])
    const postDetails =()=>{
        setUrl("abcd");
        
    }
 
    return(
        <div className="card input-filed" style={{
            width:"80%",
            // height:"80%",
            margin:"auto",
            marginTop:"3rem",
            padding:"2rem",
            textAlign:"center"
        }}>
            
                <h3>What Would you like to share with World?</h3>
            <textarea className="blog_data" type="text" placeholder="body"
                value={body} onChange={(e)=>setBody(e.target.value)} />

           
            <button className="btn waves-effect #6a1b9a purple darken-3" type="submit" name="action"
            onClick={()=>postDetails()}>
                    Submit 
                </button>
        
        </div>
    )
}
export default CreatePost