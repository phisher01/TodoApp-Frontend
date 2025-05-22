



import "./TaskCreate.css"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TaskCreate() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
        title: taskTitle,
        description: taskDescription,
        userId: userId,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="new-repo-card">
      <div className="repo-card-body">
        <h5 className="repo-title">Create a new Task</h5>
        <p className="repo-subtitle">
          A task is basically the work you have decided to do in the same day.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="repoName" className="form-label">
              Task Title
            </label>
            <input
              type="text"
              id="repoName"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              placeholder="Great Work Captain"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription" className="form-label">
              Task Description
            </label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Describe the task (optional)"
              className="form-input"
              rows="4"
            />
          </div>

          <div className="btn">
            <button
              type="submit"
              disabled={!taskTitle.trim()}
              className="submit-btn"
            >
              Create Task Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
