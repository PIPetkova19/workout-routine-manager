import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { Grid } from "@mui/system";
import {
  Card,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  DialogContent,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { store } from "../utils/ReduxStore";
import { deleteRoutine, setData } from "../utils/RoutinesReducer";
import DetailsIcon from "../components/icons/DetailsIcon";
import EditDialogForm from "../components/EditDialogForm";
import CloseIcon from "../components/icons/CloseIcon";

export default function RoutinesList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editRoutine, setEditRoutine] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteSnack, setDeleteSnack] = useState(false);
  const [editSnack, setEditSnack] = useState(false);
  const open = Boolean(anchorEl);
  const routinesList = useSelector((state) => state.routines.routinesList);

  async function deleteItem(index) {
    const response = await supabase.from("routines").delete().eq("id", index);
    if (response) {
      console.log("deleted");
    }
  }

  const handleOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
    setEditRoutine(null);
    setDeleteIndex(null);
  };

  const handleDelete = async (id) => {
    try {
      deleteItem(id);
      store.dispatch(deleteRoutine(id));
      setDeleteSnack(true);
      setDeleteIndex(null);
    } catch (error) {
      console.log(error);
    } finally {
      setAnchorEl(null);
      setSelectedIndex(null);
    }
  };

  const handleEdit = (id) => {
    routinesList.forEach((element) => {
      if (element.id == id) {
        setEditRoutine(element);
      }
    });
  };

  function openSnack() {
    setEditSnack(true);
  }

  useEffect(() => {
    const fetchRoutines = async () => {
      const { data } = await supabase
        .from("routines")
        .select("id, routineName, exercise");
      if (data) store.dispatch(setData(data));
    };
    fetchRoutines();
  }, []);

  return (
    <>
      <Grid container spacing={2} direction={"row"} sx={{ paddingTop: "2rem" }}>
        {routinesList ? (
          routinesList.map(({ id, routineName, exercise }) => (
            <Grid key={id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
              <Card sx={{ padding: "1rem", height: "12rem" }}>
                <Grid
                  container
                  sx={{ justifyContent: "space-between", marginBottom: "2rem" }}
                >
                  <Typography variant="h6">{routineName}</Typography>
                  <IconButton
                    color="primary"
                    onClick={(e) => handleOpen(e, id)}
                  >
                    <DetailsIcon />
                  </IconButton>
                </Grid>
                <div>
                  {exercise.map(
                    ({ id, exerciseName, sets, reps, rests, weight }) => (
                      <Typography
                        key={id}
                        variant="body2"
                        sx={{ textAlign: "left" }}
                      >
                        {exerciseName}: {sets} sets of {reps} reps
                        {weight ? " with " + weight + "kg " : ""} and {rests}s
                        of rest
                      </Typography>
                    )
                  )}
                </div>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No records</p>
        )}
      </Grid>

      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={() => handleEdit(selectedIndex)}>Edit</MenuItem>
        <MenuItem onClick={() => setDeleteIndex(selectedIndex)}>
          Delete
        </MenuItem>
      </Menu>

      {editRoutine ? (
        <EditDialogForm
          routine={editRoutine}
          handleClose={handleClose}
          openSnack={openSnack}
        />
      ) : null}

      <Dialog open={deleteIndex ? true : false} onClose={handleClose}>
        <DialogTitle>Delete Routine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(deleteIndex);
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={deleteSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setDeleteSnack(false)}
      >
        <Alert
          onClose={() => setDeleteSnack(false)}
          severity="error"
          variant="filled"
        >
          Routine deleted
        </Alert>
      </Snackbar>

      <Snackbar
        open={editSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setEditSnack(false)}
      >
        <Alert
          onClose={() => setEditSnack(false)}
          severity="success"
          variant="filled"
        >
          Routine updated
        </Alert>
      </Snackbar>
    </>
  );
}
