import { AuthContext } from "./context/AuthContext"
import { use } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { user } = use(AuthContext);

    if (!user) {
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute
 
