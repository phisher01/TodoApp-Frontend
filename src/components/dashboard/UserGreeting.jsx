// UserGreeting.jsx
import React from "react";
import "./UserGreeting.css";

export default function UserGreeting({ username, taskStats }) {
  return (
    <div className="greeting-container">
      <h1>Hey {username}, you're awesome! 👋</h1>
      <p>Here’s how your tasks are looking:</p>

      <div className="task-stats">
        <div className="stat-box total">
          <h3>Total</h3>
          <span>{taskStats.total}</span>
        </div>
        <div className="stat-box pending">
          <h3>Pending</h3>
          <span>{taskStats.pending}</span>
        </div>
        <div className="stat-box completed">
          <h3>Completed</h3>
          <span>{taskStats.completed}</span>
        </div>
      </div>
    </div>
  );
}
