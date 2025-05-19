import logo from "../assets/repare.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";
import TextField from "@mui/material/TextField";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import TerminalIcon from '@mui/icons-material/Terminal';
import FaceIcon from '@mui/icons-material/Face';
import AddIcon from '@mui/icons-material/Add';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import { useEffect } from "react";
import { useAuth } from "../authContext";


export default  function Navbar({setSearchResults,projects}){
  // console.log("this")
const {setCurrentUser}=useAuth();  
const navigate =useNavigate();
// console.log(navigate)
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
      // console.log("called")   
       
        if (searchQuery == "") {
          setSearchResults(projects);
          
        } else {
          const filteredPro = projects.filter((pro) =>
            pro.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
         
          setSearchResults(filteredPro);
         
        }
      }, [searchQuery, projects ]);


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

       
        <TextField
  variant="outlined"
  size="small"
  value={searchQuery}
  placeholder="Search your desired items"
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    width: '400px', // Set custom width here
    '& .MuiOutlinedInput-root': {
      height: '36px',
      fontSize: '14px',
      padding: '0 8px',
      color:"white",
      '& fieldset': {
          borderColor: 'rgba(173, 216, 230, 0.3)', // very thin bluish-white
          borderWidth: '1px',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(173, 216, 230, 0.6)',
        },
        '&.Mui-focused fieldset': {
            
            borderColor: '#90caf9',
            borderWidth: '1px',
        },
    },
    '& input::placeholder': {
        fontSize: '14px',
        color: '#aaa',
    },
}}
/>
</div >
           
          
        <div className="rightnav" >
          <div className="empty">

           <TerminalIcon></TerminalIcon>
          </div>
           <div className="empty">

            <MarkAsUnreadIcon></MarkAsUnreadIcon>
            <AddIcon></AddIcon>
           </div>

            <Link  to="/pro/create">
            <p>Create a Project</p></Link>

           
           
            <FaceIcon fontSize="large"></FaceIcon>
                
            
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