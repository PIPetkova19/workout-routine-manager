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
  Paper,
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import PlusIcon from "../components/icons/PlusIcon";
import { useState } from "react";
import { FieldArray, Form, Formik} from "formik";
import { RoutineSchema } from "../validations/routinesSchema";

export default function CreateRoutines() {
  const [open, setOpen] = useState(false);

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
      },
    ],
  };

  return (
    <Paper sx={{ backgroundColor: "white" }}>
      <Paper
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
            <Typography variant="subtitle1">Create and manage your workout plans.</Typography>
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
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Routine</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Build your workout plan. Add as many exercises as you need.
          </DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={RoutineSchema}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          >
            {({ values, handleChange, errors, touched }) => {
              return (
              <Form>
                <Grid container spacing={2} columns={16} alignItems={"center"} sx={{marginTop: "2rem"}}>

                  <Grid size={4}>
                    <FormLabel sx={{ alignSelf: "end" }}>
                      Routine Name
                    </FormLabel>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      id="routineName"
                      size="small"
                      value={values.routineName}
                      onChange={handleChange}
                      error={touched.routineName && Boolean(errors.routineName)}
                      helperText={touched.routineName && errors.routineName}
                      fullWidth
                      variant="outlined"
                      placeholder="e.g. Leg Day"
                    />
                  </Grid>

                  <FieldArray name="exercise">
                    {({ push }) => (
                      <Grid container sx={{justifyContent: "center"}}>
                        {values.exercise.length > 0 &&
                          values.exercise.map((exercise, index) => (
                            <div key={index}>

                              <Divider/>

                              <Grid container spacing={2} alignItems={"center"} columns={16} sx={{marginTop: "2rem"}}>
                                <Grid size={4} sx={{justifySelf: "flex-end"}}>
                                  <FormLabel sx={{ alignSelf: "center", textAlign: "right" }}>
                                    Exercise
                                  </FormLabel>
                                </Grid>
                                <Grid size={12}>
                                  <TextField
                                    id={`exerciseName${index}`}
                                    size="small"
                                    name={`exercise.[${index}].exerciseName`}
                                    error={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].exerciseName}
                                    helperText={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].exerciseName}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    placeholder="e.g. Squats"
                                  />
                                </Grid>
                              </Grid>

                              <Grid container spacing={2} columns={16} alignItems={"center"} sx={{marginTop: "2rem"}}>
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
                                      error={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].sets}
                                      helperText={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].sets}
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
                                      error={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].reps}
                                      helperText={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].reps}
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
                                      error={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].rests}
                                      helperText={touched.exercise && errors.exercise && errors.exercise[index] && errors.exercise[index].rests}
                                      onChange={handleChange}
                                      variant="outlined"
                                      placeholder="Rest(s)"
                                    />
                                  </Stack>
                                  </Box>
                                </Grid>
                              </Grid>

                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outlined"
                            startIcon={<PlusIcon/>}
                            onClick={() =>
                              push({
                                exerciseName: "",
                                sets: "",
                                reps: "",
                                rests: "",
                              })
                            }
                            sx={{ margin: "1rem"}}
                          >
                            Add exercise
                          </Button>
                      </Grid>
                    )}
                  </FieldArray>

                  <Grid size={16}>
                    <Button variant="contained" type="submit" sx={{justifySelf: "flex-end"}}>
                      Create Routine
                    </Button>
                  </Grid>

                </Grid>
              </Form>
            )
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
