import  { useState, useEffect } from "react";
import "./dashboard.css";

import Navbar from "../Navbar";
import Project from "./Project";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import NoProjects from "./NoProjects"

import fetchUserDetails from "./func";
const Dashboard = () => {
 
 

 const [userDetails, setUserDetails] = useState({ username: "username", });
 const [projects,setProjects]=useState([]);

  const [searchResults, setSearchResults] = useState([]);
  
     console.log("hhere");
     const Navigate=useNavigate();

     
          
              
  useEffect(() => {
    const userId = localStorage.getItem("userId");  

    
    

    
    fetchUserDetails(userId,setUserDetails,setProjects);
   


  }, []);
  




  return (
    <>
      <Navbar setSearchResults={setSearchResults} projects={projects}  ></Navbar>
     <section id="dashboard"> 
    {/* <aside className="left">
      <h3>Suggested Repositories</h3>
     <RepoCardList repos={suggestedRepositories} ></RepoCardList>
    </aside> */}
    <main>
      

      <h2>Your Projects</h2>
      {searchResults.length === 0 && <NoProjects />}

      
      {searchResults.map((pro) => {
       
        return (
          
          <Project key={pro._id} pro={pro}      onClick={() => {console.log("clisked");Navigate(`/project/${pro._id}`)}} ></Project>
        );
      })}
    </main>
    <aside className="right">
      <h3>Upcoming Events</h3>
      <ul>
        <li>
          <p>Tech Conference - Dec 15</p>
        </li>
        <li>
          <p>Developer Meetup - Dec 25</p>
        </li>
        <li>
          <p>React Summit - Jan 5</p>
        </li>
      </ul>
    </aside>
  </section>
  </>
);
};

export default Dashboard;