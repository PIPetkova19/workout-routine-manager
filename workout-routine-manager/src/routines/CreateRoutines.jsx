import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
  Stack,
  Divider,
  Typography,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import PlusIcon from "../components/icons/PlusIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useState } from "react";
import { FieldArray, Form, Formik } from "formik";
import { RoutineSchema } from "../validations/routinesSchema";
import { supabase } from "../supabase/supabase-client.js";
import { useDispatch } from "react-redux";
import { createRoutine, setData } from "../utils/RoutinesReducer.js";
import { store } from "../utils/ReduxStore";

export default function CreateRoutines({loggedUserId}) {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    routineName: "",
    exercise: [
      {
        exerciseName: "",
        sets: "",
        reps: "",
        rests: "",
        weight: "",
      },
    ],
  };

  const insertSupabase = async (routine) => {
    await supabase.from("routines").insert({routineName: routine.routineName, exercise: routine.exercise, user_id: loggedUserId});
  };

  async function fetchRoutines() {
    const { data } = await supabase
      .from("routines")
      .select("id, routineName, exercise")
      .eq("user_id", loggedUserId);
    if (data) store.dispatch(setData(data));
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Stack>
            <Typography variant="h4">Workout Routines</Typography>
            <Typography variant="subtitle1">
              Create and manage your workout plans.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="medium"
            startIcon={<PlusIcon />}
            sx={{ maxHeight: "3rem" }}
            onClick={handleOpen}
          >
            Create Routine
          </Button>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Routine</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Build your workout plan. Add as many exercises as you need.
          </DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={RoutineSchema}
            onSubmit={(values) => {
              insertSupabase(values);
              dispatch(createRoutine(values));
              fetchRoutines();
              handleClose();
              setSnack(true);
            }}
          >
            {({ values, handleChange, errors, touched }) => {
              return (
                <Form>
                  <Grid
                    container
                    spacing={2}
                    columns={16}
                    alignItems={"center"}
                    sx={{ marginTop: "2rem" }}
                  >
                    <Grid size={4}>
                      <FormLabel sx={{ alignSelf: "end" }}>Routine</FormLabel>
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        id="routineName"
                        size="small"
                        value={values.routineName}
                        onChange={handleChange}
                        error={
                          touched.routineName && Boolean(errors.routineName)
                        }
                        helperText={touched.routineName && errors.routineName}
                        fullWidth
                        variant="outlined"
                        placeholder="e.g. Leg Day"
                      />
                    </Grid>

                    <FieldArray name="exercise">
                      {({ push, remove }) => (
                        <Grid container sx={{ justifyContent: "center" }}>
                          {values.exercise.length > 0 &&
                            values.exercise.map((exercise, index) => (
                              <div key={index}>
                                <Divider />

                                <Grid
                                  container
                                  columns={16}
                                  sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography variant="h6">
                                    Exercise {index + 1}
                                  </Typography>
                                  <IconButton onClick={() => remove(index)}>
                                    <CloseIcon />
                                  </IconButton>
                                </Grid>

                                <Grid
                                  container
                                  spacing={2}
                                  alignItems={"center"}
                                  columns={16}
                                  sx={{ marginTop: "2rem" }}
                                >
                                  <Grid
                                    size={4}
                                    sx={{ justifySelf: "flex-end" }}
                                  >
                                    <FormLabel
                                      sx={{
                                        alignSelf: "center",
                                        textAlign: "right",
                                      }}
                                    >
                                      Name
                                    </FormLabel>
                                  </Grid>
                                  <Grid size={12}>
                                    <TextField
                                      id={`exerciseName${index}`}
                                      size="small"
                                      name={`exercise.[${index}].exerciseName`}
                                      error={
                                        touched.exercise &&
                                        errors.exercise &&
                                        errors.exercise[index] &&
                                        errors.exercise[index].exerciseName
                                      }
                                      helperText={
                                        touched.exercise &&
                                        errors.exercise &&
                                        errors.exercise[index] &&
                                        errors.exercise[index].exerciseName
                                      }
                                      onChange={handleChange}
                                      fullWidth
                                      variant="outlined"
                                      placeholder="e.g. Squats"
                                    />
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  spacing={2}
                                  columns={16}
                                  alignItems={"center"}
                                  sx={{ marginTop: "2rem" }}
                                >
                                  <Grid size={4}>
                                    <FormLabel sx={{ alignSelf: "center" }}>
                                      Details
                                    </FormLabel>
                                  </Grid>
                                  <Grid size={12}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignContent: "center",
                                        gap: "1rem",
                                      }}
                                    >
                                      <Stack>
                                        <TextField
                                          id={`sets${index}`}
                                          type="number"
                                          size="small"
                                          name={`exercise.[${index}].sets`}
                                          error={
                                            touched.exercise &&
                                            errors.exercise &&
                                            errors.exercise[index] &&
                                            errors.exercise[index].sets
                                          }
                                          helperText={
                                            touched.exercise &&
                                            errors.exercise &&
                                            errors.exercise[index] &&
                                            errors.exercise[index].sets
                                          }
                                          onChange={handleChange}
                                          variant="outlined"
                                          placeholder="Sets"
                                        />
                                      </Stack>
                                      <Stack>
                                        <TextField
                                          id={`reps${index}`}
                                          type="number"
                                          size="small"
                                          name={`exercise.[${index}].reps`}
                                          error={
                                            touched.exercise &&
                                            errors.exercise &&
                                            errors.exercise[index] &&
                                            errors.exercise[index].reps
                                          }
                                          helperText={
                                            touched.exercise &&
                                            errors.exercise &&
                                            errors.exercise[index] &&
                                            errors.exercise[index].reps
                                          }
                                          onChange={handleChange}
                                          variant="outlined"
                                          placeholder="Reps"
                                        />
                                      </Stack>
                                      <Stack>
                                        <TextField
                                          id={`rests${index}`}
                                          type="number"
                                          size="small"
                                          name={`exercise.[${index}].rests`}
                                          error={
                                            touched.exercise &&
                                            errors.exercise &&
                                            errors.exercise[index] &&
                                            errors.exercise[index].rests
                                          }
                                          helperText={
                                            touched.exercise &&
                                            errors.exercise &&
                                            errors.exercise[index] &&
                                            errors.exercise[index].rests
                                          }
                                          onChange={handleChange}
                                          variant="outlined"
                                          placeholder="Rest(s)"
                                        />
                                      </Stack>
                                    </Box>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  spacing={2}
                                  alignItems={"center"}
                                  columns={16}
                                  sx={{ marginY: "2rem" }}
                                >
                                  <Grid
                                    size={4}
                                    sx={{ justifySelf: "flex-end" }}
                                  >
                                    <FormLabel
                                      sx={{
                                        alignSelf: "center",
                                        textAlign: "right",
                                      }}
                                    >
                                      Weight
                                    </FormLabel>
                                  </Grid>
                                  <Grid size={12}>
                                    <TextField
                                      id={`exerciseName${index}`}
                                      type="number"
                                      size="small"
                                      name={`exercise.[${index}].weight`}
                                      error={
                                        touched.exercise &&
                                        errors.exercise &&
                                        errors.exercise[index] &&
                                        errors.exercise[index].weight
                                      }
                                      helperText={
                                        touched.exercise &&
                                        errors.exercise &&
                                        errors.exercise[index] &&
                                        errors.exercise[index].weight
                                      }
                                      onChange={handleChange}
                                      fullWidth
                                      variant="outlined"
                                      placeholder="kg"
                                    />
                                  </Grid>
                                </Grid>
                              </div>
                            ))}
                          <Button
                            type="button"
                            variant="outlined"
                            startIcon={<PlusIcon />}
                            onClick={() =>
                              push({
                                exerciseName: "",
                                sets: "",
                                reps: "",
                                rests: "",
                                weight: "",
                              })
                            }
                            sx={{ margin: "1rem" }}
                          >
                            Add exercise
                          </Button>
                        </Grid>
                      )}
                    </FieldArray>

                    <Grid size={16}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ justifySelf: "flex-end" }}
                      >
                        Create Routine
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
      >
        <Alert
          onClose={() => setSnack(false)}
          severity="success"
          variant="filled"
        >
          Added new routine
        </Alert>
      </Snackbar>
    </>
  );
}
