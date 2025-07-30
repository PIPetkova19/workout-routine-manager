//send email a verification link to update password

import { Typography } from "@mui/material";
import { AuthContext } from "./context/AuthContext"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { use, useState } from 'react';

function ResetPassword() {
    const [email, setEmail] = useState("");
    const { handleForgottenPassword } = use(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        await handleForgottenPassword(email);
        setEmail("");
    }

    return (
        <>
            <Typography variant="h3" component="h1" sx={{ color: "rgba(0, 0, 0, 1)" }}>
                Reset your password
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ color: "rgba(52, 52, 52, 1)" }}>
                You'll receive an email to recover your password.
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField id="email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button color="primary" variant="contained" type="submit">
                    Send
                </Button>
            </form>
        </>
    )
}

export default ResetPassword