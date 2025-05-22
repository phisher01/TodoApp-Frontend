  import  { useState, useEffect } from "react";
  import "./dashboard.css";

  import Navbar from "../Nav/Navbar";
  import Task from "../task/Task";
  import axios from "axios";

  import UserGreeting from "./UserGreeting";
  import { useNavigate } from "react-router-dom";

  import NoTask from "../task/NoTask"
  import TaskTabs from "../task/TaskTabs";


  const Dashboard = () => {
  
  

  const [userDetails, setUserDetails] = useState({ username: "username", taskStats:{pending:0,completed:0}});
  const [Totaltasks,setTotalTasks]=useState([]);
  const [pendingTasks,setPendingTasks]=useState([]);
  const [completedTasks,setCompletedTasks]=useState([]);
  const [tasktype,setTasktype]=useState({total:true,pending:false,completed:false});
  const tasks = tasktype.pending
    ? pendingTasks
    : tasktype.completed
      ? completedTasks
      : Totaltasks;

  const [searchResults, setSearchResults] = useState([]);
    
      console.log("hhere");
      const Navigate=useNavigate();

      
          
  const userId = localStorage.getItem("userId");


  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/userProfile/${userId}`);
      setUserDetails(data);
    } catch (err) {
      console.error("Cannot fetch user details:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/tasks`);
      setTotalTasks(data);
    } catch (err) {
      console.error("Cannot fetch all tasks:", err);
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/tasks/pending`);
      setPendingTasks(data);
    } catch (err) {
      console.error("Cannot fetch pending tasks:", err);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/tasks/completed`);
      setCompletedTasks(data);
    } catch (err) {
      console.error("Cannot fetch completed tasks:", err);
    }
  };

 
  const refreshData = () => {
    fetchUserDetails();
    fetchTasks();
    fetchPendingTasks();
    fetchCompletedTasks();
  };

 
  useEffect(() => {
    refreshData();
  }, []);

                
    useEffect(() => {
    refreshData();
  }, []);
      

     




    return (
      <>
        <Navbar setSearchResults={setSearchResults} tasks={tasks}  ></Navbar>
      <section id="dashboard"> 
    
      <main>
        
      
        <UserGreeting username={userDetails.username} taskStats={userDetails.taskStats}></UserGreeting>

        <TaskTabs tasktype={tasktype} setTasktype={setTasktype}></TaskTabs>

        {searchResults.length === 0 && <NoTask />}

        
        {searchResults.map((pro) => {
        
          return (
            
            <Task key={pro._id} task={pro}  refreshTasks={refreshData}    ></Task>
          );
        })}
      </main>
      
    </section>
    </>
  );
  };

export default Dashboard;