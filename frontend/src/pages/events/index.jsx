import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests

function Events() {
  // State to store user data
  const [userData, setUserData] = useState({
    username: '',
    achievements: [],
    totalPoints: 0,
    leaderboardRank: 0,
    badges: [],
  });

  // Function to fetch user data from the server
  const fetchUserData = async () => {
    try {
      // Make API request to fetch user data
      const response = await axios.get('http://localhost:5000/users'); // Adjust the endpoint according to your API
      const userData = response.data;
	  console.log(userData)
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []);

  return (
    // <div>
    //   <h1>Hello, {userData.username}!</h1>
    //   <h2>Your Achievements:</h2>
    //   <ul>
    //     {userData.achievements.map((achievement, index) => (
    //       <li key={index}>{achievement}</li>
    //     ))}
    //   </ul>
    //   <h2>Your Badges:</h2>
    //   <ul>
    //     {userData.badges.map((badge, index) => (
    //       <li key={index}>{badge}</li>
    //     ))}
    //   </ul>
    //   <h2>Your Total Points: {userData.totalPoints}</h2>
    //   <h2>Your Leaderboard Rank: {userData.leaderboardRank}</h2>
    // </div>
	<div>
		hello
	</div>
  );
}

export default Events;
