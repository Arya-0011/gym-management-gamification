import { useContext } from "react";
import { Button, TextInput, Group, Box } from "@mantine/core";
import QuestionContext from "../../contexts/QuestionContext";

const AddQuestion = () => {
	const { addQuestion, form } = useContext(QuestionContext);

	return (
		<>
			<div
				style={{
					// background: "linear-gradient(to right,#36d1dc , #5b86e5)",
					//make background image full screen and cover the rest of the page
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					height: "100vh",
				}}
			>
				<div style={{ paddingTop: "10%" }}>
					<Box sx={{ maxWidth: 300 }} mx="auto">
						<form onSubmit={form.onSubmit((values) => addQuestion(values))}>
							<h1>Ask Question</h1>
							<TextInput required label="Email" placeholder="Email" {...form.getInputProps("email")} />
							<TextInput required label="Name" placeholder="Name" {...form.getInputProps("name")} />
							<TextInput
								required
								label="Question Title"
								placeholder="Question Title"
								{...form.getInputProps("title")}
							/>
							<TextInput required label="Question" placeholder="Question Content" {...form.getInputProps("content")} />
							<Group position="right" mt="md">
								<Button type="submit">Ask Question</Button>
							</Group>
						</form>
					</Box>
				</div>
			</div>
		</>
	);
};

export default AddQuestion;
