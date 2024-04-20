import React from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div style={styles.container}>
            <button style={styles.linkButton}>
                <Link to="/workoutscr" style={styles.link}>
                    Workout Request Schedule
                </Link>
            </button>

            <div style={styles.dashboardContainer}>
                <h1 style={styles.title}>Member Dashboard</h1>
                <Button style={styles.button}>
                    <Link to="/personal" style={styles.link}>
                        Create Personal Trainer Request
                    </Link>
                </Button>
                <Button style={styles.button}>
                    <Link to="/bd" style={styles.link}>
                        Watch Personal Trainer Details
                    </Link>
                </Button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
    },
    linkButton: {
		marginTop: '20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '20px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
    },
    dashboardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    button: {
        width: '100%',
        maxWidth: '250px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Dashboard;
