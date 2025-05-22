import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // 👈 NEW import

import './Task.css';

export default function Task({ task, refreshTasks }) {
  const navigate = useNavigate(); // 👈 NEW hook

  const handleToggle = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${task._id}/mark-done`);
      refreshTasks();
    } catch (err) {
      console.error("Error toggling task status:", err);
      alert("Could not update task status.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`);
      refreshTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Could not delete task.");
    }
  };

  const handleEdit = () => {
    navigate(`/taskupdate/${task._id}`); // 👈 Navigate to update route
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h2 className="task-title">{task.title}</h2>
        <div className="task-actions">
          <IconButton
            onClick={handleToggle}
            color={task.status === 'completed' ? 'secondary' : 'primary'}
            aria-label={task.status === 'completed' ? 'mark as pending' : 'mark as done'}
          >
            {task.status === 'completed' ? <UndoIcon /> : <CheckCircleOutlineIcon />}
          </IconButton>

          <IconButton
            onClick={handleEdit} // 👈 Edit handler
            color="primary"
            aria-label="edit task"
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={handleDelete}
            color="error"
            aria-label="delete task"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <p className="task-status">
        Status: {task.status === 'completed' ? 'Completed' : 'Pending'}
      </p>
    </div>
  );
}
