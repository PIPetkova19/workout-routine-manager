import { Container } from "@mui/material";
import CreateRoutines from "./CreateRoutines";
import RoutinesList from "./RoutinesList";

export default function Routines () {



    return (
        <>
            <Container>
                <CreateRoutines />
                <RoutinesList />
            </Container>
        </>
    )
}