import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { AuthContext } from "../context/AuthContext"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use, useState } from 'react';
import { useTheme } from "@mui/material/styles";

//send email a verification link to update password

function ResetPassword() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const { handleForgottenPassword } = use(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        await handleForgottenPassword(email);
        setEmail("");
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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
                        xs: '90%',
                        sm: '70%',
                        md: '60%',
                        lg: '50%',
                        xl: '35%',
                    },
                    minWidth: '200px',
                    maxWidth: '900px',
                    padding: {
                        xs: '30px 16px',
                        sm: '50px 20px',
                    },
                    boxShadow: theme.customShadows.card,
                    borderRadius: "5px",
                }}
            >

                <Box>
                    <Typography variant="h3" component="h1"
                        sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.main
                        }}>
                        Reset your password
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1" component="p" sx={{ color: theme.palette.text.secondary }}>
                        You'll receive an email to recover your password.
                    </Typography>
                </Box>

                <Box>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="email" sx={{ color: theme.palette.text.secondary }}>
                            Email
                        </FormLabel>
                        <TextField id="email"
                            name="email"
                            value={email}
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                    <Button variant="contained" type="submit"  color="primary"
                        sx={{
                            backgroundColor: theme.palette.primary.main
                        }}
                    >
                        Send
                    </Button>
                </Box>
            </Stack>
        </Box >
    )
}

export default ResetPassword