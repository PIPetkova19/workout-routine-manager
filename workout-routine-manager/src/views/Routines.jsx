import { Box } from "@mui/material";
import CreateRoutines from "../routines/CreateRoutines";
import RoutinesList from "../routines/RoutinesList";

export default function Routines() {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          mb: 2,
          justifyContent: "left",
          alignItems: "left",
        }}
      >
          <CreateRoutines />
          <RoutinesList />
      </Box>
    </Box>
  );
}
