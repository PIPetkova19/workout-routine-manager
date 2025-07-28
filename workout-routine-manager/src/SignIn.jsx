import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use, useState } from 'react';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

/*ENTER AN EXISTING ACCOUNT*/

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleSignIn, handleForgottenPassword} = use(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        handleSignIn(email, password);
    }

    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
        }}>
            <form onSubmit={handleSubmit}>
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
                        border: "1px solid black",
                        boxShadow: "5px 5px 5px #1e1e1eb9",
                        borderRadius: "5px",
                    }}
                >
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ color: "rgba(0, 0, 0, 1)" }}>
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
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    {/*forgotten pass link*/}
                    <Box>
                      <Link to="/resetPassword">Forgot your password?</Link>  
                    </Box>

                    {/*Sign in button*/}
                    <Box>
                        <Button color="primary" variant="contained" type="submit">
                            Sign in
                        </Button>
                    </Box>

                    <Divider></Divider>

                    {/*Sign up link*/}
                    <Box>
                        <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                            Don't have an account?
                            <Link to="/signUp" style={{ fontWeight: "bold", textDecoration: "none" }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>

                </Stack>
            </form>
        </Box>
    );
};

export default SignIn;
