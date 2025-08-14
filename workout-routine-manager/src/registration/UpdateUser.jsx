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
import { useTheme } from "@mui/material/styles";

//update password when forgotten

function ResetPassword() {
    const theme = useTheme();
    const [password, setPassword] = useState("");
    const { handleUserUpdate } = use(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault(); 
        await handleUserUpdate(password);
        setPassword("");
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
                    <Typography variant="h3" component="h1" color="primary"
                        sx={{ fontWeight: "bold",
                            color: theme.palette.primary.main
                         }}>
                        Renew your password
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle1" component="p"
                     sx={{   color: theme.palette.text.secondary}}>
                        Update your password.
                    </Typography>
                </Box>

                <Box>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="password">
                            Password
                        </FormLabel>
                        <TextField id="password"
                            name="password"
                            type="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        Update
                    </Button>
                </Box>
            </Stack>
        </Box >
    )
}

export default ResetPassword