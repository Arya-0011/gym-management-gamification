import React, { useState } from "react";
import WorkoutProgramAPI from "../../contexts/api/WorkoutProgramAPI";
import { Button } from "@mantine/core";

const Cards = () => {
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [age, setAge] = useState('');
	const [bmi, setBMI] = useState(null);
	const [recommendations, setRecommendations] = useState([]);
	const [enrollButtonDisabled, setEnrollButtonDisabled] = useState(false);
	const [enrolledWorkoutPrograms, setEnrolledWorkoutPrograms] = useState([]);

	const enrollWorkoutProgram = (workoutProgramID) => {
		if (!localStorage.getItem("permissionLevel")) {
			window.location.href = "/login";
		}

		const data = {
			userId: localStorage.getItem("uID"),
			workoutProgramId: workoutProgramID,
		};

		WorkoutProgramAPI.enrollWorkoutProgram(data).then((response) => {
			setEnrolledWorkoutPrograms(enrolledWorkoutPrograms.concat(response.data));
			setEnrollButtonDisabled(false);
		});
	};

	// Unenroll workoutProgram
	const unenrollWorkoutProgram = (workoutProgramID) => {
		const data = {
			userId: localStorage.getItem("uID"),
			workoutProgramId: workoutProgramID,
		};

		WorkoutProgramAPI.unenrollWorkoutProgram(data).then((response) => {
			// Remove workoutProgram from enrolledWorkoutPrograms
			setEnrolledWorkoutPrograms(enrolledWorkoutPrograms.filter((workoutProgram) => workoutProgram !== response.data));
			setEnrollButtonDisabled(false);
		});
	};

	const calculateBMI = async () => {
		const heightInMeters = height / 100;
		const calculatedBMI = weight / (heightInMeters * heightInMeters);
		setBMI(calculatedBMI.toFixed(2));

		let category;
		if (calculatedBMI < 18.5) {
			category = 'underweight';
		} else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
			category = 'normalweight';
		} else if (calculatedBMI >= 25 && calculatedBMI < 30) {
			category = 'overweight';
		} else {
			category = 'obese';
		}

		try {
			const response = await WorkoutProgramAPI.getWorkoutRecommendationsByBMI(category);
			setRecommendations(response.data.recommendations);
		} catch (error) {
			console.error('Error fetching recommendations:', error);
			setRecommendations([]);
		}

	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>BMI Calculator</h1>
			<div style={styles.formContainer}>
				<div style={styles.inputContainer}>
					<label style={styles.label}>Weight (kg):</label>
					<input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={styles.input} />
				</div>
				<div style={styles.inputContainer}>
					<label style={styles.label}>Height (cm):</label>
					<input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={styles.input} />
				</div>
				<div style={styles.inputContainer}>
					<label style={styles.label}>Age:</label>
					<input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
				</div>
			</div>
			<button onClick={calculateBMI} style={styles.button}>Calculate BMI</button>
			{bmi && <p style={styles.result}>Your BMI:  {bmi}</p>}
			<div style={styles.recommendationsContainer}>
				{recommendations.map((recommendation, index) => (
					<div key={index} style={styles.card}>
						<img src={recommendation.photoURL} alt={recommendation.name} style={styles.cardImage} />
						<div style={styles.cardContent}>
							<h2>{recommendation.name}</h2>
							<p><strong>Description:</strong> {recommendation.description}</p>
							<p><strong>Conducted By:</strong> {recommendation.conducted_by}</p>
							<p><strong>Fee:</strong> {recommendation.fee}</p>
							<p><strong>Day:</strong> {recommendation.day}</p>
							<p><strong>Time:</strong> {recommendation.time}</p>
							<p><strong>Enrolled User Count:</strong> {recommendation.enrolledUserCount}</p>
							{!enrolledWorkoutPrograms.includes(recommendation._id) ? (
								<Button
									disabled={enrollButtonDisabled}
									variant="light"
									color="blue"
									fullWidth
									style={{ marginTop: 14 }}
									onClick={() => {
										enrollWorkoutProgram(recommendation._id);
										setEnrollButtonDisabled(true);
									}}
								>
									Enroll Now
								</Button>
							) : (
								<Button
									disabled={enrollButtonDisabled}
									variant="light"
									color="red"
									fullWidth
									style={{ marginTop: 14 }}
									onClick={() => {
										unenrollWorkoutProgram(recommendation._id);
										setEnrollButtonDisabled(true);
									}}
								>
									Unenroll
								</Button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const styles = {
	container: {
		backgroundColor: '#fff',
		padding: '30px',
		borderRadius: '10px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	},
	title: {
		textAlign: 'center',
		marginBottom: '20px',
	},
	formContainer: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridGap: '15px',
	},
	inputContainer: {
		marginBottom: '15px',
	},
	label: {
		display: 'block',
		marginBottom: '5px',
		fontWeight: 'bold',
	},
	input: {
		width: '100%',
		padding: '10px',
		border: '1px solid #ccc',
		borderRadius: '5px',
		fontSize: '16px',
		boxSizing: 'border-box',
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
	result: {
		fontSize: '18px',
	},
	recommendationsContainer: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gridGap: '20px',
		marginTop: '20px',
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		border: '1px solid #ccc',
		borderRadius: '5px',
		padding: '20px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
	},
	cardImage: {
		width: '100%',
		maxWidth: '200px',
		borderRadius: '5px',
		marginBottom: '10px',
	},
	cardContent: {
		textAlign: 'left',
	},
};

export default Cards;
