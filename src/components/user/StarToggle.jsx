import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import axios from "axios";
  import "./Startoggle.css"
  const StarToggle = ({repo,isstar,setUserDetails}  ) => {
    // const [starred, setStarred] = useState(isstar);
    
    const toggleStar = async () => {

      const uid=localStorage.getItem("userId");
      try{
        
        const resp=await axios.patch(`https://devnest-backend-as9y.onrender.com/user/${uid}/repo/${repo._id}`);

  
          const response = await axios.get(
            `https://devnest-backend-as9y.onrender.com//userProfile/${uid}`);
         
        
          setUserDetails(response.data);
          // console.log("fetch");
      
        // setStarred(prev => !prev);    
          // console.log(resp)
        }catch(err){
            console.log(err);
        }


    };

  
    return (
        <div className='Star' >
    <div
      onClick={toggleStar}
      
    >
      {isstar ? (
        <FaStar size={24} color='green'/>
      ) : (
        <FaRegStar size={24}  />
      )}
    </div>

        </div>
    );
  };
  
  export default StarToggle;
  
