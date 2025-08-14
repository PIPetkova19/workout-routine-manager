import CalendarPage from "./CalendarPage";
import { use } from "react";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../utils/ReduxStore";
import { AuthContext } from "../context/AuthContext";

export default function Calendar() {
    const { user } = use(AuthContext);
    console.log("User in Calendar:", user);
  return (
     <Box>
      <Provider store={store}>
        <CalendarPage loggedUserId={user.id} />
      </Provider>
    </Box>
  );
}
