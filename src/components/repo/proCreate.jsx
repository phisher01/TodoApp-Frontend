
import { useState } from "react";
import RepoNav from "./RepoNav"

import axios from "axios";
import "./RepoCreate.css"

import { useNavigate } from "react-router-dom";
export default  function RepoCreate(){
    const [proTitle, setproTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const Navigate=useNavigate();
  
  const handleSubmit = async (e) => {
      e.preventDefault();
     
      const userId = localStorage.getItem("userId");  
try{
    const res=await axios.post("https://projecttracker-backend.onrender.com/projects",{
      title:proTitle,
        description:description,
        
        user:userId,
        
        });
        Navigate("/");
      }catch(err){
        if(
          err.response.status==400
          
        ){
          alert('You made max four projects ');
          Navigate("/");

      }
        console.log(err);
    }

   
  
}

    return(<>
<RepoNav></RepoNav>

<div className="new-repo-card">
      <div className="repo-card-body">
        <h5 className="repo-title">Create a new Project</h5>
        <p className="repo-subtitle">
          A repository contains all of your project's files and revision history.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="repoName" className="form-label">
              Project Title
            </label>
            <input
              type="text"
              id="repoName"
              value={proTitle}
              onChange={(e) => setproTitle(e.target.value)}
              required
              placeholder="my-awesome-repo"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of your repository"
              rows={3}
              className="form-input"
            />
          </div>

         
<div className="btn">

          <button
            type="submit"
            disabled={!proTitle.trim()}
            className="submit-btn"
            >
            Create Project Now!
          </button>
              </div>
        </form>
      </div>
    </div>
    </>

    );


}