import React,{useContext} from "react";
import {Link,useHistory} from "react-router-dom"
import {UserContext} from "../App"
import M from 'materialize-css'
const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const user=JSON.parse(localStorage.getItem('user'))
  const history = useHistory()
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, M.options);
  });
  const renderList = ()=>{
    if(state){
      return [
        
        <li className="list-item sidenav-close"><Link to="/CreatePost">Create Post</Link></li>,
       
        <li>
          <button className="btn #d32f2f red darken-2" type="submit" name="action"
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push("/Login")
                }}>
                    Logout
                </button>
          </li>
      ]
    }
    else{
      return [
        <li className="list-item sidenav-close"><Link to="/Login">Login</Link></li>,
        <li className="list-item sidenav-close"><Link to="/Signup">Signup</Link></li>,
       
        
      ]
    }
  }

  return(
    <div>
      <nav>
        <div className="nav-wrapper #039be5 light-blue darken-1">
          <Link to={state?"/":"login"} className="brand-logo left" style={{marginLeft:"10rem"}}>Home</Link>
          {/* <a href="#!" className="brand-logo">Logo</a> */}
          <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
  </nav>
    
  <ul className="sidenav #039be5 light-blue darken-1" id="mobile-demo">
    {/* {user?
    <li>
      <Link to="/Profile">
      <div className="">
          <img className="profile_in_nav" src={user.pic?user.pic:"https://www.clipartkey.com/mpngs/m/292-2929675_male-profile-pic-blank-round-profile-picture-png.png"} />
      </div></Link>
      <div >
      <Link to="/Profile"><h4 style={{marginTop:"40px",marginLeft:"1rem"}}>{user.name}</h4> </Link>
      <p style={{marginTop:"-35px"}}>{user.email}</p> 
      </div></li>
      :null} */}
    {/* <li><div class="divider"></div></li> */}
    <li className="list-item sidenav-close"><Link to={state?"/":"login"}>Home</Link></li>,
  {renderList()}
</ul>
</div>  
  )} 

export default  NavBar;