import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Button,
  Snackbar,
  IconButton,
  Typography,
} from "@mui/material";
import PlusIcon from "../components/icons/PlusIcon";
import CloseIcon from "../components/icons/CloseIcon";
import { useEffect, useState } from "react";
import { store } from "../utils/ReduxStore";
import { FieldArray, Form, Formik } from "formik";
import { RoutineSchema } from "../validations/routinesSchema";
import { editRoutine } from "../utils/RoutinesReducer";
import { supabase } from "../supabase/supabase-client";

export default function EditDialogForm({ routine, handleClose, openSnack }) {
  const [isOpen, setIsOpen] = useState();

  const initialValues = {
    id: routine.id,
    routineName: routine.routineName,
    exercise: routine.exercise,
  };

  const editSupabase = async (routine) => {
    await supabase.from("routines").update(routine).eq("id", routine.id);
  };

  useEffect(() => {
    setIsOpen(Boolean(routine));
  }, []);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit routine</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={RoutineSchema}
            onSubmit={(values) => {
              setIsOpen(false);
              store.dispatch(editRoutine(values));
              editSupabase(values);
              openSnack();
              handleClose();
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
                      <FormLabel sx={{ alignSelf: "end" }}>
                        Routine
                      </FormLabel>
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
                                      value={exercise.exerciseName}
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
                                          value={exercise.sets}
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
                                          value={exercise.reps}
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
                                          value={exercise.rests}
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
                                      value={exercise.weight}
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
                        Update Routine
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
