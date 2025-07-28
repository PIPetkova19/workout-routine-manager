//update password when forgotten

import { Typography } from "@mui/material";
import { AuthContext } from "./context/AuthContext"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use, useState } from 'react';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const { handleUserUpdate } = use(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        await handleUserUpdate(password);
        setPassword("");
    }

    return (
        <>
            <Typography variant="h3" component="h1" sx={{ color: "rgba(0, 0, 0, 1)" }}>
                Renew your password 
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                Update your password.
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button color="primary" variant="contained" type="submit">
                    Update
                </Button>
            </form>
        </>
    )
}

export default ResetPassword