
import { useState } from "react";
import RepoNav from "./RepoNav"
import "./RepoCreate.css"
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default  function RepoCreate(){
    const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const Navigate=useNavigate();
  
  const handleSubmit = async (e) => {
      e.preventDefault();
     
      const userId = localStorage.getItem("userId");  
try{
    const res=await axios.post("http://localhost:3000/repo/create",{name:repoName,
        description:description,
        
        owner:userId,
        
        visibility:isPrivate});
        Navigate("/profile");
    }catch(err){
      if(
        err.response.status==400

      ){
        alert('This repository name  already exists!');
      }
        console.log(err);
    }

   
  
}

    return(<>
<RepoNav></RepoNav>

<div className="new-repo-card">
      <div className="repo-card-body">
        <h5 className="repo-title">Create a new repository</h5>
        <p className="repo-subtitle">
          A repository contains all of your project's files and revision history.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="repoName" className="form-label">
              Repository name
            </label>
            <input
              type="text"
              id="repoName"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
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

          <div className="form-check">
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="isPrivate" className="form-check-label">
              Make repository private
            </label>
          </div>
<div className="btn">

          <button
            type="submit"
            disabled={!repoName.trim()}
            className="submit-btn"
            >
            Create repository
          </button>
              </div>
        </form>
      </div>
    </div>
    </>

    );


}