// src/components/repo/Project.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateButt from "./CreateButt"
import TaskList from './TaskList';    // adjust path as needed
// import './Project.css';                // for any layout-specific styles
import Navbar from '../Navbar';
export default function Project() {
  const { id } = useParams();
  const [proDetails, setProDetails] = useState({ title: 'Loading…', description: '' });
  const [tasks, setTasks]     = useState([]);
   const [searchResults, setSearchResults] = useState([]);
   const navigate=useNavigate();
     const fetchTasks = async () => {
      if (!id) return;
      try {
        const { data } = await axios.get(`https://projecttracker-backend.onrender.com/projects/${id}/tasks`);
        setTasks(data);
      } catch (err) {
        console.error('Cannot fetch tasks:', err);
      }
    };

  useEffect(() => {
    // fetch project metadata (title & description)
    const fetchProjectDetails = async () => {
      if (!id) return;
      try {
        const  {data}  = await axios.get(`https://projecttracker-backend.onrender.com/projects/${id}`);
        console.log(data)
        setProDetails(data);
      } catch (err) {
        console.error('Cannot fetch project details:', err);
      }
    };

    // fetch all tasks for this project
  

    fetchProjectDetails();
    fetchTasks();
  }, [id]);

  // compute summary counts
  const total     = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending   = total - completed;

  return (<>
        <Navbar  setSearchResults={setSearchResults} projects={tasks} ></Navbar>

      <section id="dashboard" className="project-dashboard">
      <main className="project-main">
        {/* Project header */}
        <header className="project-header">
          <h1 className="project-title">{proDetails.title}</h1>
          {proDetails.description && (
              <p className="project-description">{proDetails.description}</p>
            )}
          <div className="project-summary">
            <strong>All Tasks:</strong> {total} total&nbsp;&bull;&nbsp;
            <span className="summary-pending">Pending: {pending}</span>&nbsp;&bull;&nbsp;
            <span className="summary-completed">Completed: {completed}</span>
          </div>
        </header>

        {/* Task list */}
        <section className="project-tasks">
          <h2>Your Tasks</h2>
            <CreateButt onClick={()=>{navigate(`/task/create/${id}`)}}> </CreateButt>
          <TaskList tasks={searchResults} fetchTasks={fetchTasks} />
        </section>
      </main>

      {/* Optional sidebar */}
    
    </section>
              </>
  );
}
