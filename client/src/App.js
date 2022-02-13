import React,{useEffect,createContext,useReducer, useContext} from 'react';
import NavBar from "./component/navbar"
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import Home from "./component/screens/home"
import Login from "./component/screens/login"
import Signup from "./component/screens/signup"
import CreatePost from "./component/screens/createPost"
import {reducer,initialState} from "./reducers/userReducer"

import Forget from './component/screens/ForgetPassword';
import NewPassword from './component/screens/newPassword';
export const UserContext= createContext(reducer)

const Routing = ()=>{
  const history = useHistory()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:"user"})
    }
    else{
      if(!history.location.pathname.startsWith("/Forget"))
      history.push("/login")
    }
  },[])
    return(
    <Switch>
      <Route exact path="/ForgetPassword">
          <Forget />
      </Route>
      <Route exact path="/forgetPassword/:token">
        <NewPassword />
      </Route>
      <Route exact path ="/">
        <Home />
      </Route>
      <Route path ="/Signup">
        <Signup />
      </Route>
      <Route path ="/Login">
        <Login />
      </Route>
      <Route path="/CreatePost">
        <CreatePost />
      </Route> 
    </Switch>
    )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  // console.log(state)
  return (
    <UserContext.Provider value={{state,dispatch}}> 
      <BrowserRouter>
        <NavBar />
        <Routing />
        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
