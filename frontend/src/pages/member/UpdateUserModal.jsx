import React, { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";
import axios from 'axios';

const UpdateUserModal = ({ userData, onClose }) => {
    const [formData, setFormData] = useState({
        badges: userData.badges.join(", "),
        totalPoints: userData.totalPoints,
        achievements: userData.achievements.map(achievement => ({ name: achievement.name, image_url: achievement.image })),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        console.log(formData)
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("uID");

        // Separate the formData into badges, achievements, and totalPoints
        const { badges, achievements, totalPoints, ...otherData } = formData;

        // Create the updated totalPoints object
        const updatedTotalPoints = {
            Cardiovascular: parseInt(totalPoints.Cardiovascular),
            StrengthTraining: parseInt(totalPoints.StrengthTraining),
            FlexibilityAndMobility: parseInt(totalPoints.FlexibilityAndMobility),
            HighIntensityIntervalTraining: parseInt(totalPoints.HighIntensityIntervalTraining)
        };

        // Create the updated user object with separate properties for badges, achievements, and totalPoints
        const updatedUser = {
            badges: badges.split(',').map(badge => badge.trim()), // Convert badges back to an array
            achievements,
            totalPoints: updatedTotalPoints,
            // ...otherData // Include other fields if any
        };

        axios.put(`http://localhost:5000/user/${userId}`, updatedUser)
            .then((response) => {
                console.log(response.data);
                onClose(); // Close the modal after successful update
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <Modal opened onClose={onClose} title="Update User Data">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Badges"
                    id="badges"
                    name="badges"
                    value={formData.badges}
                    onChange={handleChange}
                />

                <TextInput
                    label="Cardiovascular"
                    id="Cardiovascular"
                    name="totalPoints.Cardiovascular"
                    type="number"
                    value={formData.totalPoints.Cardiovascular || ''}
                    onChange={handleChange}
                />

                <TextInput
                    label="Strength Training"
                    id="StrengthTraining"
                    name="totalPoints.StrengthTraining"
                    type="number"
                    value={formData.totalPoints.StrengthTraining || ''}
                    onChange={handleChange}
                />

                <TextInput
                    label="Flexibility and Mobility"
                    id="FlexibilityAndMobility"
                    name="totalPoints.FlexibilityAndMobility"
                    type="number"
                    value={formData.totalPoints.FlexibilityAndMobility || ''}
                    onChange={handleChange}
                />

                <TextInput
                    label="High-Intensity Interval Training"
                    id="HighIntensityIntervalTraining"
                    name="totalPoints.HighIntensityIntervalTraining"
                    type="number"
                    value={formData.totalPoints.HighIntensityIntervalTraining || ''}
                    onChange={handleChange}
                />

                <Button type="submit">Update</Button>
            </form>
        </Modal>
    );
};

export default UpdateUserModal;
