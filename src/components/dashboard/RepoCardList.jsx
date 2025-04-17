// RepoCardList.jsx
import React from "react";
import RepoCard from "./RepoCard";
import "./RepoCardList.css"; // Import the CSS file for the container styling

    export default function RepoCardList({ repos }) {
        // console.log(repos)
    return (
        <div className="repo-card-list">
        {repos.map((repo) => (
            <RepoCard key={repo._id} repo={repo} />
        ))}
        </div>
    );
    }
