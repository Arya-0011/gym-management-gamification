import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { Card, Text, Badge } from '@mantine/core';
import './Events.css'; // Import CSS file for styling

function UserCard({ user }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" className="user-card" style={{ margin: 5 }}>
      <div>
        <Text size="xl" weight={700}>
          {user.firstName} {user.lastName}
        </Text>
        <Text size="sm">
          Leaderboard Rank: {user.leaderboardRank.length > 0 ? user.leaderboardRank[0] : 'No rank'}
        </Text>
      </div>
      <div>
        {user.badges.length > 0 && (
          <>
            <Text size="lg" weight={700} style={{ marginTop: 16 }}>
              Badges
            </Text>
            <div style={{ marginTop: 8 }}>
              {user.badges.map((badge, index) => (
                <Badge key={index} style={{ marginRight: 8, marginBottom: 8 }}>
                  {badge}
                </Badge>
              ))}
            </div>
          </>
        )}

        {user.achievements.length > 0 && (
          <>
            <Text size="lg" weight={700} style={{ marginTop: 16 }}>
              Achievements
            </Text>
            <div style={{ marginTop: 8 }}>
              {user.achievements.map((achievement, index) => (
                <Badge key={index} style={{ marginRight: 8, marginBottom: 8 }}>
                  {achievement}
                </Badge>
              ))}
            </div>
          </>
        )}

        {user.totalPoints && (
          <>
            <Text size="lg" weight={700} style={{ marginTop: 16 }}>
              Total Points
            </Text>
            <ul>
              {Object.entries(user.totalPoints).map(([category, points]) => (
                <li key={category}>
                  <Text size="sm">
                    {category}: {points}
                  </Text>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Card>
  );
}

function Events() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const userData = response.data;
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const filteredUserData = userData.filter(user =>
    user.achievements.length > 0 ||
    user.badges.length > 0 ||
    (user.totalPoints && Object.keys(user.totalPoints).length > 0)
  );



  // Sort the filteredUserData based on leaderboard rank
  filteredUserData.sort((a, b) => {
    if (a.leaderboardRank.length === 0 && b.leaderboardRank.length === 0) {
      return 0;
    } else if (a.leaderboardRank.length === 0) {
      return 1;
    } else if (b.leaderboardRank.length === 0) {
      return -1;
    } else {
      return a.leaderboardRank[0] - b.leaderboardRank[0];
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-grid">
      {filteredUserData.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}

export default Events;
