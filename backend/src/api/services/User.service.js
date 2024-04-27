import UserModel from "../models/User.model";
import WorkoutProgramModel from "../models/WorkoutProgram.model";

export const authenticateUser = async (username, password) => {
	return await UserModel.findOne({ username })
		.then(async (user) => {
			if (user && (await user.matchPassword(password))) {
				return user;
			} else {
				throw new Error("Invalid Email or Password!");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const insertUser = async (user) => {
	return await UserModel.create(user)
		.then(async (user) => {
			await user.generateAuthToken();
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// enrollUserToWorkoutProgram
export const enrollUserToWorkoutProgram = async (userId, workoutProgramId) => {
	const user = await UserModel.findById(userId);
	if (user.enrolledWorkoutPrograms.includes(workoutProgramId)) {
		throw new Error("User is already enrolled to the workout program!");
	} else {
		// increase the enrolledUserCount
		await WorkoutProgramModel.findByIdAndUpdate(workoutProgramId, { $inc: { enrolledUserCount: 1 } }, { new: true });

		return await UserModel.findByIdAndUpdate(
			userId,
			{
				$push: {
					enrolledWorkoutPrograms: workoutProgramId,
				},
			},
			{ new: true }
		)
			.then(() => {
				// return enrolled workout program
				// return user.enrolledWorkoutPrograms;
				return workoutProgramId;
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	}
};

// unenrollUserFromWorkoutProgram
export const unenrollUserFromWorkoutProgram = async (userId, workoutProgramId) => {
	const user = await UserModel.findById(userId);
	if (!user.enrolledWorkoutPrograms.includes(workoutProgramId)) {
		throw new Error("User is not enrolled to the workout program!");
	} else {
		await WorkoutProgramModel.findByIdAndUpdate(workoutProgramId, { $inc: { enrolledUserCount: -1 } }, { new: true });

		return await UserModel.findByIdAndUpdate(
			userId,
			{
				$pull: {
					enrolledWorkoutPrograms: workoutProgramId,
				},
			},
			{ new: true }
		)
			.then(() => {
				// return enrolled workout program
				// return user.enrolledWorkoutPrograms;
				return workoutProgramId;
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	}
};

// getAllEnrolledWorkoutPrograms
export const getAllEnrolledWorkoutPrograms = async (userId) => {
	const user = await UserModel.findById(userId);
	return await user.enrolledWorkoutPrograms;
};

// Get all users email list where permissionLevel is MEMBER
export const getMembersEmailList = async () => {
	return await UserModel.find({ permissionLevel: "MEMBER" })
		.then((data) => {
			return data.map((user) => {
				return user.email;
			});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all users email list where permissionLevel is TRAINER
export const getTrainersEmailList = async () => {
	return await UserModel.find({ permissionLevel: "TRAINER" })
		.then((data) => {
			return data.map((user) => {
				return user.email;
			});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all users email list where permissionLevel is ADMIN
export const getAdminsEmailList = async () => {
	return await UserModel.find({ permissionLevel: "ADMIN" })
		.then((data) => {
			return data.map((user) => {
				return user.email;
			});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all users email list where permissionLevel is EMPLOYEE
export const getEmployeesEmailList = async () => {
	return await UserModel.find({ permissionLevel: "EMPLOYEE" })
		.then((data) => {
			return data.map((user) => {
				return user.email;
			});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Delete user
export const deleteUser = async (userId) => {
	return await UserModel.findByIdAndDelete(userId)
		.then(() => {
			return userId;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const getAllUserDetails = async () => {
	return await UserModel.find()
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
}

// Get user details
export const getUserDetails = async (userId) => {
	return await UserModel.findById(userId)
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const getAchievements = async () => {
	try {
		const users = await UserModel.find().select('firstName lastName totalPoints leaderboardRank badges achievements');

		return users;
	} catch (error) {
		throw new Error(error.message);
	}
};

//Get all Users where permission is EMPLOYEE
export const getAllEmployees = async () => {
	return await UserModel.find({ permissionLevel: "EMPLOYEE" })
		.then((data) => {
			return data.map((user) => {
				return user;
			});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
export const updateLeaderboardRank = async (userId) => {
    try {
        // Retrieve the user for which leaderboard rank needs to be updated
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Calculate total points based on the provided formula
        const totalPoints = user.totalPoints.Cardiovascular +
                           user.totalPoints.StrengthTraining +
                           user.totalPoints.FlexibilityAndMobility +
                           user.totalPoints.HighIntensityIntervalTraining;

        console.log("Total Points:", totalPoints);

        // Calculate rank using the formula (inverted for upside down ranking)
		const rank = Math.max(Math.ceil((1 - (totalPoints / 100)) * 4), 1);

        console.log("Calculated Rank:", rank);

        // Update leaderboard rank for the specified user
        user.leaderboardRank = rank;
        await user.save();

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to update user data and trigger leaderboard rank update
export const updateUser = async (userId, userData) => {
	try {
		// Update user data
		const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true });

		// Update leaderboard rank
		await updateLeaderboardRank(userId);

		return updatedUser;
	} catch (error) {
		throw new Error(error.message);
	}
};
// Search User from first name,last name or nic
export const searchUsersMember = async (searchTerm) => {
	return await UserModel.find({
		permissionLevel: "MEMBER",
		$or: [
			{ firstName: { $regex: searchTerm, $options: "i" } },
			{ lastName: { $regex: searchTerm, $options: "i" } },
			{ nic: { $regex: searchTerm, $options: "i" } },
		],
	})
		.then((users) => {
			return users;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
