import Cards from "../../components/cards/Cards";

function TrainerPackages() {
	// const [colorScheme, setColorScheme] =
	// 	useLocalStorage <
	// 	ColorScheme >
	// 	{
	// 		key: "mantine-color-scheme",
	// 		defaultValue: "light",
	// 		getInitialValueInEffect: true,
	// 	};

	// const toggleColorScheme = (value?: ColorScheme) =>
	// 	setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	// useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<div className="App">
			{/* <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{ colorScheme }}>
					<Paper padding="md" radius={0} style={{ minHeight: "100vh" }}> */}

			<Cards />
			{/* <LightDarkButton /> */}
			{/* </Paper>
				</MantineProvider>
			</ColorSchemeProvider> */}
		</div>
	);
}

export default TrainerPackages;
