// src/components/TaskCreate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./createTask.css";  // you can adapt your RepoCreate.css styles here

export default function TaskCreate() {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://projecttracker-backend.onrender.com/projects/${projectId}/tasks`,
        { title, description }
      );
      // after creating, go back to project page or wherever you like
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="new-task-card">
      <div className="task-card-body">
        <h5 className="task-title">Create a New Task</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskTitle" className="form-label">
              Task Title
            </label>
            <input
              type="text"
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter Task Title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription" className="form-label">
              Description
            </label>
            <textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task details"
              rows={3}
              className="form-input"
            />
          </div>

          <div className="btn">
            <button
              type="submit"
              disabled={!title.trim()}
              className="submit-btn"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
