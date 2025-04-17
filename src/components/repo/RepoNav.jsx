import logo from "../../assets/repare.png";
import { Link, useNavigate } from "react-router-dom";
import "./RepoNav.css"
import { useState } from "react";
import TextField from "@mui/material/TextField";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import TerminalIcon from '@mui/icons-material/Terminal';
import FaceIcon from '@mui/icons-material/Face';
import AddIcon from '@mui/icons-material/Add';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

import { useAuth } from "../../authContext";


export default  function RepoNav({}){
  // console.log(starredRepo)
const {setCurrentUser}=useAuth();  
const navigate =useNavigate();
// console.log(navigate)
    
   
    


    return (
    <nav>
        
     <div className="leftnav">
        <Link  to="/">
        <div id="dash">

        <div >

<MenuIcon ></MenuIcon>
        </div>
        <div>
           <img   src={logo} alt="Logo" />
     </div>
           <div>
           <h3 >DashBoard</h3>    

        </div >
        </div>
        </Link>

   
</div >
           
          
        <div className="rightnav" >
           <TerminalIcon></TerminalIcon>
           <div>

            <MarkAsUnreadIcon></MarkAsUnreadIcon>
            <AddIcon></AddIcon>
           </div>

            <Link  to="/repo/create">
            <p>Create a Repository</p></Link>

            <Link  to="/profile">
        
           
            <FaceIcon fontSize="large"></FaceIcon>
                
            </Link>
           <LogoutIcon onClick={()=>{localStorage.removeItem("token");
                                        localStorage.removeItem("userId");
                                        setCurrentUser(null);
                                        navigate("/login");
           }
           }></LogoutIcon>
        </div>

        </nav>
    )

    
}