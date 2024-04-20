import React from "react";

// Page Components

import ViewMyWorkoutScr from "./ViewMyWorkoutScr";

// WorkoutScR Provider
import { WorkoutScRProvider } from "../../contexts/WorkoutScRContext";

const ViewMyWorkoutScR = () => {
	return (
		<WorkoutScRProvider>
			<ViewMyWorkoutScr />
		</WorkoutScRProvider>
	);
};

export default ViewMyWorkoutScR;
