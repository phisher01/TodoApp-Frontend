import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// reuses your existing styles

import "./UpdateTask.css"
import axios from "axios";


export default function TaskEdit() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 

  // 1️⃣ Fetch the existing task on mount
  useEffect(() => {
    async function fetchTask() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks/${taskId}`
        );
        setTitle(data.title);
        setDescription(data.description || "");
      
      } catch (err) {
        console.error("Error fetching task:", err);
        alert("Could not load task data.");
      }
    }
    fetchTask();
  }, [taskId]);

  // 2️⃣ Submit the updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        { title, description }
      );
      navigate("/"); // go back to wherever you came from (e.g. dashboard)
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

         

          {/* Submit */}
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
