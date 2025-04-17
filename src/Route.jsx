import { useEffect } from "react";
import {useAuth} from "./authContext"
import {useNavigate, useRoutes} from "react-router-dom"
import DashBoard from "./components/dashboard/DashBoard.";
import Signup from "./components/auth/Signup";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import RepoCreate from "./components/repo/RepoCreate";
// immport RepoCreate
const ProjectRoutes=()=>{
    const navigate=useNavigate();


    const {currentUser,setCurrentUser}=useAuth();

    useEffect(()=>{
        const userIdFromStorage= localStorage.getItem("userId");
    
        
        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);

        }
        if(!userIdFromStorage &&  !["/login","/signup"].includes(window.location.pathname)){
    navigate("/login");

}
if(userIdFromStorage  && window.location.pathname=="/login"){
    navigate("/");
}

    },[setCurrentUser,navigate,currentUser]);

    let element=useRoutes([
        {path:"/",element:<DashBoard/>},
        {path:"/login",element:<Login/>},
        {path:"/signup",element:<Signup />},
        {path:"/profile",element:<Profile />},
        {path:"repo/create",element:<RepoCreate/>}

    ]);
    return element;
}
export default ProjectRoutes;
