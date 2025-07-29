import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use, useState } from 'react';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import HttpsIcon from '@mui/icons-material/Https';

/*ENTER AN EXISTING ACCOUNT*/

const StyledButton = styled(Button)({
    textTransform: "lowercase",
    borderRadius: "9px",
});

const FirstLetter = styled('span')({
    textTransform: "uppercase",
    paddingLeft: "5px"
});

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleSignIn, handleForgottenPassword } = use(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        handleSignIn(email, password);
    }

    return (
        <Box component="form"
            onSubmit={handleSubmit} sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "left",
            }}>

            <Stack
                spacing={3}
                sx={{
                    width: {
                        xs: '90%',
                        sm: '70%',
                        md: '60%',
                        lg: '50%',
                        xl: '35%',
                    },
                    minWidth: '200px',
                    maxWidth: '1200px',

                    height: {
                        xs: '50%',
                        sm: '50%',
                        md: '55%',
                        lg: '55%',
                        xl: '90%',
                    },
                    minHeight: '200px',
                    maxHeight: '1000px',
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
                        Sign In
                    </Typography>
                </Box>
                <Box>

                    <Box>
                        <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                            Glab to see you again👋
                        </Typography>
                        <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                            Sign in to your account below.
                        </Typography>
                    </Box>

                </Box>

                {/*email and password fields*/}
                <Box>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            name="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                {/*forgotten pass link*/}
                <Box>
                    <Link to="/resetPassword">Forgot your password?</Link>
                </Box>

                {/*Sign in button*/}
                <Box>
                    <StyledButton fullWidth
                        color="primary"
                        variant="contained"
                        type="submit">
                        <FirstLetter>S</FirstLetter>ign in
                    </StyledButton>
                </Box>

                <Divider>
                    <Typography sx={{ color: "rgba(52, 52, 52, 1)" }}>or</Typography>
                </Divider>

                {/*Sign up link*/}
                <Box>
                    <Typography variant="subtitle2" component="p" sx={{ textAlign: "center", color: "rgba(52, 52, 52, 1)" }}>                            Don't have an account?{' '}
                        <Link to="/signUp" style={{ fontWeight: "bold", textDecoration: "none" }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>

            </Stack>
        </Box>
    );
};

export default SignIn;
