import React, { useState, useEffect, useRef } from "react";
import LineChart from "../../components/chartReq/LineChart";
import { Grid, Card, createStyles, Text, Badge, Avatar, Modal, TextInput, Button } from "@mantine/core";
import PieChart from "../../components/chartReq/PieChart";
import BarChart from "../../components/chartReq/BarChart";
import axios from 'axios';
import UpdateUserModal from "./UpdateUserModal"; // Assuming UpdateUserModal is in the same directory

const useStyles = createStyles((theme) => ({

	cards: {
		cursor: "pointer",
		overflow: "hidden",
		transition: "transform 150ms ease, box-shadow 100ms ease",
		padding: theme.spacing.xl,
		paddingLeft: theme.spacing.xl * 2,
		// backgroundColor: "#faebd7",

		"&:hover": {
			boxShadow: theme.shadows.md,
			transform: "scale(1.10)",
		},

		"&::before": {
			position: "absolute",
			top: 0,
			bottom: 0,
			left: 0,
			width: 6,
			backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
		},
	},
}));

const Profile = () => {
	const [user, setUser] = useState(null);
	const { classes } = useStyles();
	const [showModal, setShowModal] = useState(false); // State variable to manage modal visibility

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userId = localStorage.getItem("uID");
				if (!userId) {
					throw new Error("User ID not found in localStorage");
				}

				const response = await fetch(`http://localhost:5000/user/${userId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}
				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, []); // Empty dependency array ensures this effect runs only once on component mount

	const data = {
		labels: ["Cardiovascular", "StrengthTraining ", "FlexibilityAndMobility", "HighIntensityIntervalTraining"],
		datasets: [
			{
				label: "Points Charts",
				backgroundColor: ["rgba(75,192,192,1)", "#50AF95", "#f3ba2f", "#2a71d0"],
				borderColor: "black",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: user && Array.isArray(user.totalPoints) ? [
					user.totalPoints.reduce((acc, curr) => acc + curr.Cardiovascular, 0),
					user.totalPoints.reduce((acc, curr) => acc + curr.StrengthTraining, 0),
					user.totalPoints.reduce((acc, curr) => acc + curr.FlexibilityAndMobility, 0),
					user.totalPoints.reduce((acc, curr) => acc + curr.HighIntensityIntervalTraining, 0),
				] : [],
			},
		],
	};


	const handleUpdateClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};
	return (
		<div>
			<Grid justify="space-around" gutter="sm">
				<Grid.Col style={{ maxWidth: 500, marginTop: 10 }} xs={4}>
					<Card shadow="sm" padding="lg" style={{ maxWidth: 500 }} className={classes.cards}>
						<Card.Section>
							{" "}
							<Text>
								{" "}
								<h1 style={{ textAlign: "center" }}>Packages Analysis Graph</h1>
							</Text>
							<BarChart data={data} />
						</Card.Section>
					</Card>
				</Grid.Col>

				<div>
					<h2>Badges</h2>
					{user &&
						user.badges.map((badge, index) => (
							<Badge key={index} variant="gradient" gradient={{ from: 'rgba(184, 174, 174, 1)', to: 'rgba(94, 59, 55, 1)', deg: 90 }}
								color="gray" style={{ marginRight: 8 }}>
								{badge}
							</Badge>
						))}
				</div>
				<div>
					<h2>Achievements</h2>
					{user &&
						user.achievements.map((achievement, index) => ( // Changed variable name to "achievement"
							<Badge key={index} variant="gradient" gradient={{ from: 'rgba(184, 174, 174, 1)', to: 'rgba(94, 59, 55, 1)', deg: 90 }}
								color="gray" style={{ marginRight: 8 }}>
								{achievement}
							</Badge>
						))}
				</div>

				<div>

				</div>
				{/* <Button style={{ marginTop: 10 }}>Update User Data</Button> */}
				{user && (
					<div>
						<Button onClick={handleUpdateClick} style={{ marginTop: 10 }}>Update User Data</Button>
						{showModal && <UpdateUserModal userData={user} onClose={handleCloseModal} />}
					</div>
				)}
			</Grid>

		</div>
	);
};

export default Profile;