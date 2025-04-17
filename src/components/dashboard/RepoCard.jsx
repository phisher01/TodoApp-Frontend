// RepoCard.jsx
import React from "react";
import "./RepoCard.css"; // Import the CSS file for styling
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';

export default function RepoCard({ repo }) {
  return (
    <div id="suggrepo">

     <PersonIcon fontSize="small"></PersonIcon> <p > {repo.owner.username}/{repo.name}</p>
    </div>
     
    
  );
}
