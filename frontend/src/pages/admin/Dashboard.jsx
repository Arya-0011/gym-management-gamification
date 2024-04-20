import { Button, Card } from "@mantine/core";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div style={{
			marginRight: 10,
			marginLeft: 10,
			paddingLeft: 10,
			paddingRight: 10,
		}}>
			<h1 style={{
				paddingBottom: 30
			}}>Admin Dashboard</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, auto)", gap: "20px" }}>

				<Card shadow="xs" padding="md" style={{ width: "100%" }}>
					<Link style={{ textDecoration: "none", color: "#fff" }} to="/workout-report">
						<Button fullWidth color="blue">Generate Workout Report</Button>
					</Link>
				</Card>

				<Card shadow="xs" padding="md" style={{ width: "100%" }}>
					<Link style={{ textDecoration: "none", color: "#fff" }} to="/salary">
						<Button fullWidth color="blue">Salary</Button>
					</Link>
				</Card>

				<Card shadow="xs" padding="md" style={{ width: "100%" }}>
					<Link style={{ textDecoration: "none", color: "#fff" }} to="/employeeList">
						<Button fullWidth color="blue">Employees</Button>
					</Link>
				</Card>

				<Card shadow="xs" padding="md" style={{ width: "100%" }}>
					<Link style={{ textDecoration: "none", color: "#fff" }} to="/workoutProgram-report">
						<Button fullWidth color="blue">Generate Workout Program Report</Button>
					</Link>
				</Card>

				<Card shadow="xs" padding="md" style={{ width: "100%" }}>
					<Link style={{ textDecoration: "none", color: "#fff" }} to="/reqList">
						<Button fullWidth color="blue">Set Personal Trainer Request Status</Button>
					</Link>
				</Card>

				<Card shadow="xs" padding="md" style={{ width: "100%" }}>
					<Link style={{ textDecoration: "none", color: "#fff" }} to="/pReport">
						<Button fullWidth color="blue">Generate Personal Trainer Request Report</Button>
					</Link>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
