import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use } from 'react';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

/*CREATE A NEW ACCOUNT*/ 

//validation with yup
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignUp = () => {
    //use new syntax for useContext
    const { handleSignUp } = use(AuthContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handleSignUp(values.email, values.password);
        },
    });

    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
        }}>
            <form onSubmit={formik.handleSubmit}>
                {/*Stack raboti samo varhu direktni deca*/}
                <Stack
                    spacing={3}
                    sx={{
                        width: {
                            xs: '90%',
                            sm: '90%',
                        },
                        maxWidth: '900px',
                        padding: {
                            xs: '30px 16px',
                            sm: '50px 20px',
                        }, 
                        border:"1px solid black",
                        boxShadow: "5px 5px 5px #1e1e1eb9",
                        borderRadius: "5px",
                    }}
                >
                    <Box>
                        <Typography variant="h3" component="h1" sx={{color:"rgba(0, 0, 0, 1)"}}>
                            Sign Up
                        </Typography>
                    </Box>
                    <Box>

                        <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                            Enter your details below  to create your account.
                            </Typography>
                    </Box>

                    <Box>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Box>

                    <Box>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Box>

                    <Box>
                        <Button color="primary" variant="contained" type="submit">
                            Submit
                        </Button>
                    </Box>

                    {/*hr*/}
                    <Divider></Divider>

                    <Box>
                        <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                             Already have an account?
                            <Link to="/signIn" style={{fontWeight:"bold", textDecoration:"none"}}> 
                            Sign in
                            </Link>
                        </Typography>
                    </Box>

                </Stack>
            </form>
        </Box>
    );
};

export default SignUp;
