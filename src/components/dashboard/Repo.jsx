// RepoCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Repo.css";
import StarToggle from "../user/StarToggle";
export default function Repo({ repo,isstar,setUserDetails }) {
    
  
  return (
    <div className="repo-card" >
      <div className="repo-card-header">
       <div className="reponame">

          {repo.name}
       </div>
      {repo.description && (
        <p className="repo-card-description">{repo.description}</p>
      )}
       
      </div>
     
        {repo.stars !== undefined && (
          <span className="repo-stars">⭐ {repo.stars}</span>
        )}

        <div>
            {repo.visibility? "public":"private"}
        </div>
        <StarToggle  setUserDetails={setUserDetails} repo={repo} isstar={isstar}></StarToggle>
      
       
      
    </div>
  );
}
