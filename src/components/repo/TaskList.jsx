// src/components/TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

export default function TaskList({ tasks ,fetchTasks}) {
    
  
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          id={task._id}
        
          title={task.title}
          description={task.description}
          createdAt={task.createdAt}
          status={task.status}
          completedAt={task.completedAt}
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
}
