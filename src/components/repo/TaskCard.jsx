import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import './TaskCard.css';

import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
export default function TaskCard({ 
    fetchTasks,
  title, 
  id,
  description = '', 
  createdAt, 
  status = 'Pending', 
  completedAt = null 
}) {




const deleteTask = async (taskId) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const res=await axios.delete(`https://projecttracker-backend.onrender.com/tasks/${id}`);
    console.log(res);
    fetchTasks();
    alert("Task deleted successfully");

    // Optionally navigate to the project page or refresh list
    // navigate(`/project/${projectId}`);
    // or trigger a state update if you're listing tasks

  } catch (err) {
    console.error("Error deleting task:", err);
    alert("Failed to delete task.");
  }
};


    
    const navigate=useNavigate();
  // choose badge modifier
  let badgeClass = 'task-card__badge--pending';
  if (status === 'Completed') badgeClass = 'task-card__badge--completed';
  else if (status === 'In Progress') badgeClass = 'task-card__badge--in-progress';

  return (
    <div className="task-card">
      <div className="task-card__header">
        <h3 className="task-card__title">{title}</h3>
        <span className={`task-card__badge ${badgeClass}`}>
          {status}
        </span>
      </div>
      {description && (
        <p className="task-card__description">{description}</p>
      )}
      <div className="task-card__footer">
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
        {completedAt && (
          <span>Completed: {new Date(completedAt).toLocaleDateString()}</span>
        )}
        <div>

        <EditIcon fontSize="small"  onClick={()=>(navigate(`/task/${id}`))}/>
            <DeleteIcon onClick={deleteTask} ></DeleteIcon>
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  title:       PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt:   PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  status:      PropTypes.oneOf(['Pending', 'In Progress', 'Completed']),
  completedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
