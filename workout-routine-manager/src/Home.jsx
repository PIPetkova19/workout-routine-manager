import AuthProvider, { AuthContext } from './context/AuthContext';
import { use } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
    const { handleSignOut, user } = use(AuthContext);

    return (
        <>
            {user ?
                (<>
                    <Typography>Hello, {user.email} </Typography>
                    <Button onClick={handleSignOut}>Sign out
                    </Button>
                </>)
                :
                (<>
                    <Button color="primary" variant="contained"><Link to="/signIn">SignIn</Link></Button>
                    <Button color="primary" variant="contained"><Link to="/signUp">SignUp</Link></Button>
                </>)
            }
        </>
    );
}
export default Home