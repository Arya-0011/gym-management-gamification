import React, { useContext } from "react";
import { Card, Image, Text, Button, useMantineTheme } from "@mantine/core";
import WorkoutProgramContext from "../../contexts/WorkoutProgramContext";
import WorkoutProgramSkeleton from "../../pages/workoutProgram/WorkoutProgramSkeleton"
function CustomCard({ item }) {
    const { enrollButtonDisabled, setEnrollButtonDisabled, isLoading } = useContext(WorkoutProgramContext);
    const theme = useMantineTheme();
    const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

    return (
        <>
            {isLoading ? <WorkoutProgramSkeleton isLoading={isLoading} /> : <></>}

            <div style={{ width: 340, margin: "auto" }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Image src={item.photoURL} height={160} alt="Norway" />
                    </Card.Section>

                    <Text weight={500}>{item.name}</Text>
                    <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                        {item.description}
                    </Text>

                    <Button
                        disabled={enrollButtonDisabled}
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                        onClick={() => {
                            onEnroll(item._id); // Call onEnroll with item ID
                            setEnrollButtonDisabled(true);
                        }}
                    >
                        Enroll Now
                    </Button>
                </Card>
            </div>
        </>
    );
}

export default CustomCard;
