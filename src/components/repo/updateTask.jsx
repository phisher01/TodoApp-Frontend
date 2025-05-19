// src/components/TaskEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./createTask.css"; // reuses your existing styles

export default function TaskEdit() {
  const { taskId} = useParams();
  console.log(taskId)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [projectId, setProjectId] = useState(null);
  const navigate = useNavigate();

  // Fetch existing task data (including its project ID)
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `https://projecttracker-backend.onrender.com/tasks/${taskId}`
        );
        setTitle(data.title);
        setDescription(data.description || "");
        setStatus(data.status);
        setProjectId(data.project);  // grab the parent project ID
      } catch (err) {
        console.error("Error fetching task:", err);
        alert("Could not load task data.");
      }
    };
    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://projecttracker-backend.onrender.com/tasks/${taskId}`,
        { title, description, status }
      );
      // redirect back to the project page
      if (projectId) {
        navigate(`/project/${projectId}`);
      } else {
        navigate(-1); // fallback: go back
      }
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="new-task-card">
      <div className="task-card-body">
        <h5 className="task-title">Edit Task</h5>
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

          <div className="form-group">
            <label htmlFor="taskStatus" className="form-label">
              Status
            </label>
            <select
              id="taskStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-input"
            >
          
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="btn">
            <button
              type="submit"
              disabled={!title.trim()}
              className="submit-btn"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
