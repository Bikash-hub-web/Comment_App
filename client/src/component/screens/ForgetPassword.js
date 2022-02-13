import React,{useState,useEffect} from "react"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css"
const Forget= ()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const history = useHistory("")
    // console.log("Hello from Forget Password")
    const postData =()=>{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            M.toast({html: "Invalid Email", classes:"#c62828 red darken-3"})
              return
        }
        fetch("/forgetPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                name
            })
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                return  M.toast({html: data.error, classes:"#c62828 red darken-3"})
            
            }
            console.log(data);
            M.toast({html:data.message,classes:"#388e3c green darken-2"})
            history.push("/login")
        })
        .catch(err =>{console.log({err})})
    }

    return (
        <div className="myCard">
            <div className="card auth-card ">
               <h2>Instagram</h2>
              
               <input type="email" placeholder ="Enter email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}></input>  
                <input type="text" placeholder ="Enter Secret Code"
                    value={name} onChange={(e)=>setName(e.target.value)}></input> 
                <button className="btn waves-effect #6a1b9a purple darken-3" type="submit" name="action"
                onClick={()=>postData()}>
                    Forget Password
                </button>
                <h5><Link to="/Login">Already have an Account ?</Link></h5>
            </div>
        </div>
    )
}
export default Forget