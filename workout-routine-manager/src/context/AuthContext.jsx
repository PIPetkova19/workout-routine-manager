import { createContext } from "react";
import { supabase } from "../supabase/supabase-client.js";
import { useState } from "react";
export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //event listener trqbva 

    const handleSignUp = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) { throw error; }
            setUser(data?.user);

            alert("Sign up successful")
        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleSignIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) { throw error; }

            setUser(data?.user);
            alert("Sign in successful")
        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) { throw error; }
            //navigate to ...
            setUser(null);
        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    };



    return (
        <AuthContext value={{ user, email, password, handleSignIn, handleSignOut, handleSignUp }}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider