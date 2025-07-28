import { createContext } from "react";
import { supabase } from "../supabase/supabase-client.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //function that checks if there is an active session on INITIAL load
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            //if there is no session the user is set to null
            setUser(session?.user ?? null);
        };
        getSession();

        //event listener that listens for changes in user
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            //if there is a change -> update user
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    //creating a new account
    const handleSignUp = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) { throw error; }
            setUser(data?.user);

            alert("Sign up successful");
            //navigate to home page
            navigate("/");
        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    //enter an existing account
    const handleSignIn = async (email, password) => {

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) { throw error; }

            setUser(data?.user);
            alert("Sign in successful");
            //navigate to home page
            navigate("/");

        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    //sign out
    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) { throw error; }
            //navigate to signIn
            navigate("/signIn");
            setUser(null);
        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    //sign up with google
    const handleSignUpGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google'
            })
            if (error) { throw error; }
           
            setUser(data?.user); 
             //navigate to home
            navigate("/");
        }
        catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <AuthContext value={{ user, handleSignIn, handleSignOut, handleSignUp, handleSignUpGoogle }}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider