import { Box } from "@mui/material";
import CreateRoutines from "../routines/CreateRoutines";
import RoutinesList from "../routines/RoutinesList";

export default function Routines() {

  return (
    <Box>
          <CreateRoutines />
          <RoutinesList />
    </Box>
  );
}
