import React, { useState, useEffect } from 'react';

function Events() {
  // State to store user data
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    achievements: [],
    totalPoints: 0,
    leaderboardRank: 0
  });

  // Function to fetch user data from the server
  const fetchUserData = () => {
    // Simulate fetching user data from the server
    const mockUserData = {
      username: 'JohnDoe',
      achievements: ['First workout', '10 workouts completed', 'Weekend warrior'],
      totalPoints: 500,
      leaderboardRank: 3
    };
    setUserData(mockUserData);
  };

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Hello, {userData.username}!</h1>
      <h2>Your Achievements:</h2>
      <ul>
        {userData.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
      <h2>Your Total Points: {userData.totalPoints}</h2>
      <h2>Your Leaderboard Rank: {userData.leaderboardRank}</h2>
    </div>
  );
}

export default Events;
