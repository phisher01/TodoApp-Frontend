import "./TaskTabs.css";


const TaskTabs = ({ tasktype, setTasktype }) => {
  const sections = ['pending', 'completed', 'total'];

  const handleClick = (section) => {
    const newType = {
      total: false,
      pending: false,
      completed: false,
    };
    newType[section] = true;
    setTasktype(newType);
  };

  return (
    <div className="task-tabs-container">
      {sections.map((section) => (
        <div
          key={section}
          onClick={() => handleClick(section)}
          className={`task-tab ${tasktype[section] ? 'active' : ''}`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default TaskTabs;
