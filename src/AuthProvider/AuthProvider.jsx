/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase-config/firebase";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);

const handleFirebaseError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    // Add custom user-friendly error messages
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "The email address is already in use!";
        case "auth/invalid-email":
            return "The email address is not valid.";
        case "auth/operation-not-allowed":
            return "Email/password accounts are not enabled.";
        case "auth/weak-password":
            return "The password is too weak.";
        case "auth/user-not-found":
            return "No user found with this email.";
        case "auth/wrong-password":
            return "Incorrect password.";
        default:
            return errorMessage; // Default to Firebase's error message
    }
};


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const RegisterUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => userCredential.user)
            .catch((error) => {
                throw new Error(handleFirebaseError(error));
            });
    }

    const LoginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const Logout = () => {
        return signOut(auth)
    }

    const GoogleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                axios.post(`https://gadget-shop-server-bay.vercel.app/jsonwebtoken`, { email: currentUser?.email }).then(data => {
                    if (data.data) {
                        localStorage.setItem("access-token", data?.data?.token);
                        // console.log(localStorage.getItem("access-token")); 
                        setLoading(false);
                    }
                })
            }
            else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });

        // console.log(user)

        return () => {
            return unsubscribe();
        }
    });

    const authInfo = {
        user,
        loading,
        RegisterUser,
        LoginUser,
        Logout,
        GoogleLogin,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;