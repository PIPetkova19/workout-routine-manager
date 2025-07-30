import * as Yup from "yup";

export const RoutineSchema = Yup.object().shape({
  routineName: Yup.string()
    .min(3, "Name should have more than 3 characters.")
    .max(50, "Name is too long.")
    .required("Field is required."),
  exercise: Yup.array()
    .of(
      Yup.object().shape({
        exerciseName: Yup.string()
          .min(3, "Name should have more than 3 characters.")
          .max(20, "Name is too long.")
          .required("Field is required."),
        sets: Yup.number()
          .min(1, "Must have at least one.")
          .max(50, "Exceeds limit.")
          .required("Field is required."),
        reps: Yup.number()
          .min(1, "Must be at least one.")
          .max(40, "Exceeds limit.")
          .required("Field is required."),
        rests: Yup.number()
          .min(10, "Must have at least ten seconds of rests.")
          .max(60, "Cannot be more than a minute.")
          .required("Field is required."),
      })
    )
});
