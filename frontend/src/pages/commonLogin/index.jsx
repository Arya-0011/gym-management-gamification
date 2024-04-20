import React from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const CommonLogin = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login Page</h1>
            <div style={styles.buttonsContainer}>
                <Button style={styles.button}>
                    <Link to="/admin/login" style={styles.link}>
                        Admin Login
                    </Link>
                </Button>
                <Button style={styles.button}>
                    <Link to="/trainers/login" style={styles.link}>
                        Trainer Login
                    </Link>
                </Button>
                <Button style={styles.button}>
                    <Link to="/member/login" style={styles.link}>
                        Member Login
                    </Link>
                </Button>
                <Button style={styles.button}>
                    <Link to="/employee/login" style={styles.link}>
                        Employee Login
                    </Link>
                </Button>
            </div>
        </div>
    );
};

const styles = {
    container: {
		paddingTop: '10px',
		paddingRight: '10px',
		marginRight: '10px',
		paddingLeft: '10px',
		marginLeft: '10px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    buttonsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '20px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
    },
};

export default CommonLogin;
