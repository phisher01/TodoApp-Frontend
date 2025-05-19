import { useEffect } from "react";
import {useAuth} from "./authContext"
import {useNavigate, useRoutes} from "react-router-dom"
import DashBoard from "./components/dashboard/DashBoard.";
import Signup from "./components/auth/Signup";

import Login from "./components/auth/Login";
import ProCreate from "./components/repo/proCreate";
import Project from "./components/repo/Project";
import CreateTask from"./components/repo/createTask";
import TaskEdit from "./components/repo/updateTask.jsx";

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
       
        {path:"/pro/create",element:<ProCreate/>},
        {path:"/project/:id",element:<Project/>},
        {path:"/task/create/:projectId",element:<CreateTask/>},
        {path:"/task/:taskId",element:<TaskEdit/>}

    ]);
    return element;
}
export default ProjectRoutes;
