import { Box } from "@mui/material";
import CreateRoutines from "../routines/CreateRoutines";
import RoutinesList from "../routines/RoutinesList";
import { use } from "react";
import { Provider } from "react-redux";
import { store } from "../utils/ReduxStore";
import { AuthContext } from "../context/AuthContext";

export default  function Routines() {
  const {user} = use(AuthContext);

console.log("user data: ", user.id);
  return (
    <Box>
      <Provider store={store}>
        <CreateRoutines loggedUserId={user.id} />
        <RoutinesList loggedUserId={user.id} />
      </Provider>
    </Box>
  );
}
