import { Title, Text, Container, Overlay, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		paddingTop: 180,
		paddingBottom: 130,
		backgroundImage:
			"url(https://images.unsplash.com/photo-1605296867304-46d5465a13f1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870)",
		backgroundSize: "cover",
		backgroundPosition: "center",

		"@media (max-width: 520px)": {
			paddingTop: 80,
			paddingBottom: 50,
		},

	},

	inner: {
		position: "relative",
		zIndex: 1,
	},

	title: {
		fontWeight: 800,
		fontSize: 40,
		letterSpacing: -1,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		color: theme.white,
		marginBottom: theme.spacing.xs,
		textAlign: "center",
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		"@media (max-width: 520px)": {
			fontSize: 28,
			textAlign: "left",
		},
	},

	highlight: {
		color: theme.colors[theme.primaryColor][4],
	},

	description: {
		color: theme.colors.gray[0],
		textAlign: "center",

		"@media (max-width: 520px)": {
			fontSize: theme.fontSizes.md,
			textAlign: "left",
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 1.5,
		display: "flex",
		justifyContent: "center",
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,

		"@media (max-width: 520px)": {
			flexDirection: "column",
		},
	},

	control: {
		height: 42,
		fontSize: theme.fontSizes.md,

		"&:not(:first-of-type)": {
			marginLeft: theme.spacing.md,
		},

		"@media (max-width: 520px)": {
			"&:not(:first-of-type)": {
				marginTop: theme.spacing.md,
				marginLeft: 0,
			},
		},
	},

	secondaryControl: {
		color: theme.white,
		backgroundColor: "rgba(255, 255, 255, .4)",

		"&:hover": {
			backgroundColor: "rgba(255, 255, 255, .45) !important",
		},
	},
}));

export function HeroImageBackground() {
	const { classes } = useStyles();

	return (
		<div className={classes.wrapper}>
			<Overlay color="#000" opacity={0.65} zIndex={1} />

			<div className={classes.inner}>
				<Title className={classes.title}>
					Ask Anything Related to Your Workout{" "}
					<Text component="span" inherit className={classes.highlight}>
						Mansa is Always with you
					</Text>
				</Title>

				<Container size={640}>
					<Text size="lg" className={classes.description}>
						Join our community of fitness enthusiasts and get answers to your questions.
					</Text>
				</Container>

				<div className={classes.controls}></div>
			</div>
		</div>
	);
}

export default HeroImageBackground;
