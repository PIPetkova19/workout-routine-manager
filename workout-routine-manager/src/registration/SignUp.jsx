import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use } from 'react';
import AuthProvider, { AuthContext } from '../context/AuthContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import HttpsIcon from '@mui/icons-material/Https';
import { useTheme, useMediaQuery } from "@mui/material";

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

const StyledButton = styled(Button)({
    textTransform: "lowercase",
    borderRadius: "9px",
});

const FirstLetter = styled('span')({
    textTransform: "uppercase",
    paddingLeft: "5px"
});

function SignUp() {
    //when small screen show only google logo w/o text
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    //use new syntax for useContext
    const { handleSignUp, handleSignUpGoogle } = use(AuthContext);

    //formik validation
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

    //google sign up
    const signUpGoogle = async () => {
        await handleSignUpGoogle();
    }

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "left",
            }}>

            <Stack
                spacing={3}
                sx={{
                    width: {
                        xs: '60%',
                        sm: '50%',
                        md: '40%',
                        lg: '30%',
                        xl: '25%',
                    },
                    minWidth: '200px',
                    maxWidth: '800px',

                    // height: {
                    //     xs: '50%',
                    //     sm: '50%',
                    //     md: '55%',
                    //     lg: '55%',
                    //     xl: '90%',
                    // },
                    minHeight: '200px',
                    //maxHeight: '1000px',
                    padding: {
                        xs: '30px 16px',
                        sm: '50px 20px',
                    },
                    boxShadow: " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
                    borderRadius: "5px",
                }}
            >
                <Box>
                    <Typography variant="h3" component="h1" color="primary"
                        sx={{ fontWeight: "bold" }}>
                        Sign Up
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                        Enter your details below  to create your account.
                    </Typography>
                </Box>

                {/*email and password fields*/}
                <Box>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            //user icon
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </FormControl>
                </Box>

                <Box>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            //password icon
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HttpsIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </FormControl>
                </Box>

                {/*sign up button*/}
                <Box>
                    <StyledButton fullWidth
                        color="primary"
                        variant="contained"
                        type="submit">
                        <FirstLetter>S</FirstLetter>ign up
                    </StyledButton>
                </Box>

                {/*hr*/}
                <Divider>
                    <Typography sx={{ color: "rgba(52, 52, 52, 1)" }}>or</Typography>
                </Divider>

                {/*google sign up*/}
                <Box>
                    <StyledButton fullWidth
                        variant="outlined"
                        onClick={signUpGoogle}
                        startIcon={<GoogleIcon />}
                        sx={{ fontWeight: "bold" }}>
                        {!isSmallScreen && (
                            <>
                                <FirstLetter>S</FirstLetter>ign up with
                                <FirstLetter>g</FirstLetter>oogle
                            </>
                        )}
                    </StyledButton>
                </Box>

                {/*Sign in link*/}
                <Box>
                    <Typography variant="subtitle2" component="p" sx={{ textAlign: "center", color: "rgba(52, 52, 52, 1)" }}>
                        Already have an account?{' '}
                        <Link to="/signIn" style={{ fontWeight: "bold", textDecoration: "none" }}>
                            Sign in
                        </Link>
                    </Typography>
                </Box>

            </Stack>
        </Box>
    );
};

export default SignUp;
