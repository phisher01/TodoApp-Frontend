
import "./Repo.css";

export default function Repo({ pro,onClick}) {
    
  
  return (
    <div  onClick={onClick} className="repo-card" >
      <div className="repo-card-header">
       <div className="reponame">

          {pro.title}
       </div>
      {pro.description && (
        <p className="repo-card-description">{pro.description}</p>
      )}
       
      </div>  
     
       

        <div>
            Pending  Task: {pro.pendingTasks}
        </div>
            <div>

           Completed Task: {pro.completedTasks}
            </div>
     
       
      
    </div>
  );
}
