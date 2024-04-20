import { createStyles, Container, Group, Anchor, Image } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: 200,
		borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,

		[theme.fn.smallerThan("xs")]: {
			flexDirection: "column",
		},
	},

	links: {
		[theme.fn.smallerThan("xs")]: {
			marginTop: theme.spacing.md,
		},
	},
}));

export default function FooterSection({ links }) {
	const { classes } = useStyles();
	const items = links.map((link) => (
		<Anchor color="dimmed" key={link.label} href={link.link} onClick={(event) => event.preventDefault()} size="sm">
			{link.label}
		</Anchor>
	));

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Image
					width={50}
					src="https://marketplace.canva.com/EAFxdcos7WU/1/0/1600w/canva-oqe3ybeEcQQ.jpg"
				></Image>
				<Group className={classes.links}>{items}</Group>
			</Container>
		</div>
	);
}
