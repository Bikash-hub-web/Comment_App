import React,{useEffect, useState} from "react"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
const NewPassword = ()=>{
    const [password,setPassword]=useState("")
    const [confirmPassword,setconfirmPassword]=useState("")
    const history = useHistory("")
    const {token}=useParams()
    useEffect(()=>{
        if(token)
        console.log(token)
    })
    
    const postData =()=>{
        if(password!=confirmPassword)
           return M.toast({html: "password does not match", classes:"#c62828 red darken-3"})
        fetch("/newPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                confirmPassword,
                token
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
              M.toast({html: data.error, classes:"#c62828 red darken-3"})
              return
            }
            M.toast({html:data.message,classes:"#388e3c green darken-2"})
            history.push("/login")
            })
            .catch(err =>{console.log({err})})
    }

    return (
        <div className="myCard">
            <div className="card auth-card ">
               <h2>Instagram</h2>
               <input type="password" placeholder ="Enter new Password" 
                    value={password} onChange={(e)=>setPassword(e.target.value)}></input> 
               <input type="password" placeholder ="Confirm new Password" 
                    value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}></input> 
                <button className="btn waves-effect #6a1b9a purple darken-3" type="submit" name="action"
                onClick={()=>postData()}>
                    Update Password
                </button>
            </div>
        </div>
    )
}
export default NewPassword