import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
// import HeatMapProfile from "./HeatMap";
import Repo from "../dashboard/Repo";
import { useAuth } from "../../authContext";
import { fabClasses } from "@mui/material";
import HeatMapProfile from "./HeatMap";

const Profile = () => {
  const navigate = useNavigate();
  
  const [component,setComponent]=useState({overview:true,starredrepo:false});
   const [repositories, setRepositories] = useState([]);
  //  const [starredRepo, setstarRepo] = useState([]);
   const [searchStarredRepo, setSearchstarredRepo] = useState([]);


  
    const [searchResults, setSearchResults] = useState([]);
  
    const [userDetails, setUserDetails] = useState({ username: "username",starRepos:[] });
  
    const { setCurrentUser } = useAuth();
      useEffect(() => {
        const userId = localStorage.getItem("userId");  
    
        const fetchRepositories = async () => {
          try {
            const response = await fetch(
              `https://devnest-backend-as9y.onrender.com//repo/user/${userId}`
            );
            const data = await response.json();
            // console.log(data);
            setRepositories(data);
          } catch (err) {
            console.error("Error while fecthing repositories: ", err);
          }
        };
        const fetchUserDetails = async () => {
          const userId = localStorage.getItem("userId");
    
          if (userId) {
            try {
              const response = await axios.get(
                `https://devnest-backend-as9y.onrender.com//userProfile/${userId}`
              );
            
              setUserDetails(response.data);  
              
              
            } catch (err) {
              console.error("Cannot fetch user details: ", err);
            }
          }
          
        };
        // const fetchStarredRepo=()=>{
          
        //   setstarRepo(userDetails.starRepos);


        // };
        
        // fetchStarredRepo();
        fetchUserDetails();
        fetchRepositories();
    
    }, [component]);
    // console.log(searchResults)
    
  

  return (
    <div className="profile">
       <Navbar setSearchResults={setSearchResults}userDetails={userDetails} repositories={repositories} starredRepo={userDetails.starRepos} setSearchstarredRepo={setSearchstarredRepo}></Navbar>

       <UnderlineNav
  aria-label="Repository"
  sx={{
    borderBottom: '1px solid rgba(5, 59, 32,0.2)',
    backgroundColor: 'transparent',
  }}
>
  <UnderlineNav.Item
    onClick={() =>
      setComponent({ overview: true, starredrepo: false })
    }
    icon={BookIcon}
    aria-current={component.overview ? 'page' : undefined}
    sx={{
      color: 'white',
      '&[aria-current="page"]': {
        fontWeight: 'bold',
       
      },
    }}
  >
    Overview
  </UnderlineNav.Item>

  <UnderlineNav.Item
    onClick={() =>
      setComponent({ overview: false, starredrepo: true })
      

    }
    icon={RepoIcon}
    aria-current={component.starredrepo ? 'page' : undefined}
    sx={{
        color: 'white',
       
        '&[aria-current="page"]': {
        
        },
        '&:hover': {
          textDecoration: 'none',
        },
      }}
    
  >
    Starred Repositories
  </UnderlineNav.Item>
</UnderlineNav>


{component.overview && (
  <>
    <div className="profile-page-wrapper">
      <div className="user-profile-section">
        <div >
        <img className="profile-image" src="/img.png" alt="" />
</div>

        <div className="name">
          <h3>{userDetails.username}</h3>
        </div>

        <button className="follow-btn">Follow</button>

        <div className="follower">
          <p>10 Followers</p>
          <p>3 Following</p>
        </div>
    </div>
    <div className="heat-map-section">
  <HeatMapProfile />
  </div>
      </div>

    {/* Render all repositories */}
    {searchResults.map((repo) => {
     
      const star = userDetails.starRepos.some(r => r._id === repo._id);
      return (
        <Repo
          key={`repo-${repo._id}`} // <-- Added prefix to make keys unique
          repo={repo}
          setUserDetails={setUserDetails}
          isstar={star}
        />
      );
    })}
  </>
)}
 
{component.starredrepo && (
  <>
    {/* Render only starred repositories */}
    {searchStarredRepo.map((repo) => {
      const star = userDetails.starRepos.some(r => r._id === repo._id);
      return <Repo
      setUserDetails={setUserDetails}
        key={`starred-${repo._id}`} // <-- Ensures no duplicate keys
        repo={repo}
        isstar={star}
      />  
})}
  </>
)}


  </div>
  )
};

export default Profile;