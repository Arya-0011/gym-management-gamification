import React, { useContext, useEffect, useState } from "react";
import BarChart from "../../components/chartReq/BarChart";
import LineChart from "../../components/chartReq/LineChart";
import PieChart from "../../components/chartReq/PieChart";
import { Grid, Card, createStyles, Text } from "@mantine/core";
import PersonalTrainerRequestAPI from "../../contexts/api/PersonalTrainerRequestAPI";

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
const Chart = () => {
	const { classes } = useStyles();

	const [requests, setRequests] = useState([]);

	useEffect(() => {
		PersonalTrainerRequestAPI.getRequestData().then((response) => {
			setRequests(response.data);
		});
	}, []);

	const countPackages = (packageName) => {
		return requests.reduce((total, request) => {
			return total + (request.package === packageName ? 1 : 0); // Assuming the package name property is named "package"
		}, 0);
	};

	const countActiveMembersByMonth = (month) => {
		return requests.reduce((total, request) => {
			return total + ((request.monthAdded === month && request.status === "Active") ? 1 : 0);
		}, 0);
	};

	const countStatus = (status) => {
		return requests.reduce((total, request) => {
		  return total + (request.status === status ? 1 : 0);
		}, 0);
	  };
	  
	  const pendingCount = countStatus("Pending");
	  const activeCount = countStatus("Active");
	  const blockedCount = countStatus("Blocked");

	const intitiatorPack = countPackages("30 Day Intitiator Package")
	const shredPackage = countPackages("90 Day Shred Package")
	const gainerPackage = countPackages("90 Day Mass Gainer Package")

	const january = countActiveMembersByMonth("january")
	const february = countActiveMembersByMonth("february")
	const march = countActiveMembersByMonth("march")
	const april = countActiveMembersByMonth("april")
	const may = countActiveMembersByMonth("may")
	const june = countActiveMembersByMonth("june")
	const july = countActiveMembersByMonth("july")
	const august = countActiveMembersByMonth("august")
	const september = countActiveMembersByMonth("september")
	const october = countActiveMembersByMonth("october")
	const november = countActiveMembersByMonth("november")
	const december = countActiveMembersByMonth("december")

	const data = {
		labels: ["30 Day Intitiator Package", "90 Day Shred Package ", "90 Day Mass Gainer Package"],
		datasets: [
			{
				label: "Personal Trainer's Packages",
				backgroundColor: ["rgba(75,192,192,1)", "#50AF95", "#f3ba2f", "#2a71d0"],
				borderColor: "black",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: [intitiatorPack, shredPackage, gainerPackage],
			},
		],
	};
	const data2 = {
		labels: [
			"january", "february", "march", "april", "may", "june",
			"july", "august", "september", "october", "november", "december"
		],
		datasets: [
			{
				label: "Active Member Requests",
				backgroundColor: ["rgba(75,192,192,1)", "#50AF95", "#f3ba2f", "#2a71d0"],
				borderColor: "black",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: [
					january,
					february,
					march,
					april,
					may,
					june,
					july,
					august,
					september,
					october,
					november,
					december
				],
			},
		],
	};
	const data3 = {
		labels: ["Pending", "Active ", "Blocked"],
		datasets: [
			{
				label: "Active Member Requests",
				backgroundColor: ["#008000", "#f3ba2f", "#ff0000"],
				borderColor: "black",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: [pendingCount, activeCount, blockedCount],
			},
		],
	};
	return (
		<div>
			<Grid justify="space-around" gutter="sm">
				<Grid.Col style={{ maxWidth: 500 }} xs={4}>
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
				<Grid.Col style={{ maxWidth: 500 }} xs={4}>
					<Card shadow="sm" padding="lg" style={{ maxWidth: 500 }} className={classes.cards}>
						<Card.Section>
							{" "}
							<Text>
								{" "}
								<h1 style={{ textAlign: "center" }}>Active User Details</h1>
							</Text>
							<LineChart data={data2} />
						</Card.Section>
					</Card>
				</Grid.Col>
				<Grid.Col style={{ maxWidth: 400 }} xs={4}>
					<Card shadow="sm" padding="lg" style={{ maxWidth: 500 }} className={classes.cards}>
						<Card.Section>
							{" "}
							<Text>
								{" "}
								<h1 style={{ textAlign: "center" }}>Requests Analysis Graphs</h1>
							</Text>
							<PieChart data={data3} />
						</Card.Section>
					</Card>
				</Grid.Col>
			</Grid>
		</div>
	);
};

export default Chart;
