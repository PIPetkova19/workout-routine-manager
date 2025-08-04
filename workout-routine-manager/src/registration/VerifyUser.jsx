import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { AuthContext } from "../context/AuthContext"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use, useState } from 'react';
import HttpsIcon from '@mui/icons-material/Https';
import { supabase } from "../supabase/supabase-client.js";

//enter verification code

function VerifyUser() {
    const [token, setToken] = useState("");
    const { handleVerifyOtp } = use(AuthContext);

    async function getEmail() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        return user.email;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const email = await getEmail();
        await handleVerifyOtp(email, token);
        setToken("");
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
                        xs: '100%',
                        sm: '70%',
                        md: '60%',
                        lg: '50%',
                        xl: '35%',
                    },
                    minWidth: '200px',
                    maxWidth: '1000px',
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
                        Enter Verification Code
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                        Enter the 6-digit code to confirm that you received the text message.
                    </Typography>
                </Box>

                <Box>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="text">
                            Code
                        </FormLabel>
                        <TextField id="text"
                            name="text"
                            type="text"
                            placeholder="••••••"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
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

                <Box>
                    <Button color="primary" variant="contained" type="submit">
                        Send
                    </Button>
                </Box>
            </Stack>
        </Box >
    )
}

export default VerifyUser