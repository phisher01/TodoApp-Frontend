import axios from "axios";
const fetchUserDetails = async (userId,setUserDetails,setProjects) => {
           
                 if (userId) {
                   try {
                     const response = await axios.get(
                       `https://projecttracker-backend.onrender.com/userProfile/${userId}`
                     );
                   
                     setUserDetails(response.data);
                     console.log("fetch");
                     setProjects(response.data.projects);
                   } catch (err) {
                     console.error("Cannot fetch user details: ", err);
                   }
                 }
               };

               export default fetchUserDetails;