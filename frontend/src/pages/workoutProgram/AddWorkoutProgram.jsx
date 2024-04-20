import { useContext } from "react";
import { Button, TextInput, NumberInput, Group, Box, Autocomplete } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import WorkoutProgramContext from "../../contexts/WorkoutProgramContext";

const AddWorkoutProgram = () => {
	const { addWorkoutProgram, form, setOpened, days, fillWithDummyData } = useContext(WorkoutProgramContext);
	const workoutProgramsByCategory = {
		underweight: ["Program for underweight individuals"],
		normalweight: ["Program for normal weight individuals"],
		overweight: ["Program for overweight individuals"],
		obese: ["Program for obese individuals"]
	};
	return (
		<>
			<Box sx={{ maxWidth: 300 }} mx="auto">
				<form
					onSubmit={form.onSubmit((values) => {
						addWorkoutProgram(values);
						setOpened(false);
					})}
				>
					<TextInput required label="Image URL" placeholder="Enter Image URL" {...form.getInputProps("photoURL")} />
					<TextInput required label="Name" placeholder="Workout Program Name" {...form.getInputProps("name")} />
					<TextInput
						required
						label="Description"
						placeholder="Workout Program Description"
						{...form.getInputProps("description")}
					/>
					<TextInput
						required
						label="Conducted By"
						placeholder="Workout Program Conducted By"
						{...form.getInputProps("conducted_by")}
					/>
					<NumberInput required label="Fee" placeholder="Workout Program Fee" {...form.getInputProps("fee")} />
					<Autocomplete
						required
						label="Day"
						placeholder="Workout Program Day"
						data={days}
						{...form.getInputProps("day")}
					/>
					<TextInput required label="Time" placeholder="Workout Program Time" {...form.getInputProps("time")} />
					<MultiSelect
						required
						label="Categories"
						placeholder="Select Workout Categories"
						data={Object.keys(workoutProgramsByCategory)}
						{...form.getInputProps("categories")}
					/>

					<Group position="right" mt="md">
						{/* Demo button for fill from with dummy data */}
						<Button onClick={() => fillWithDummyData()} color="green">
							Demo
						</Button>
						<Button type="submit">Create</Button>
						<Button onClick={() => setOpened(false)} color="red">
							Cancel
						</Button>
					</Group>
				</form>
			</Box>
		</>
	);
};

export default AddWorkoutProgram;
