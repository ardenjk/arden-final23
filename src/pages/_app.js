//creating application wrapper 
import { useCallback, useEffect, useState } from "react";
import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import Header from "@/app/components/Header";
import firebaseConfig from "@/app/components/firebaseConfig";

export default function MyApp({ Component, pageProps }) {
    const [appInitizlied, setAppIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginInformation, setloginInformation] = useState(null);
    const [error, setError] = useState(null);

const createUserFunction = useCallback(
    async (e) => {
    e.preventDefault();
    //Assign Email and Password to variables from form 
    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    
    const auth = getAuth();
    const db = getFirestore();

    let user;
    await createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
        user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode, errorMessage);
        setError(errorMessage);
    });

    //Create User reference in firestore
    await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        userId: user.uid,
    })
    .then(() => {
        setloginInformation(user);
        setIsLoggedIn(true);
        setError(null);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode, errorMessage);
        setError(errorMessage);
    });
}, [setError, setIsLoggedIn, setloginInformation]);

const loginUserFunction = useCallback((e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then ((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        setloginInformation(user);
        setError(null);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode, errorMessage);
        setError(errorMessage);
    })
}, [setError, setIsLoggedIn, setloginInformation]);

const logoutUser = useCallback(() => {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
        setloginInformation(null);
        setIsLoggedIn(false);
    })  
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(error, errorCode, errorMessage);
        setError(errorMessage);
    }); 

}, [signOut, setIsLoggedIn, setloginInformation]);

//Initialize Firebase (authentication)
useEffect(() => {
    initializeApp(firebaseConfig);
    setAppIsInitialized(true);
}, []);

//User has loaded page, check their status and set state accordingly
useEffect(() => {

    if (appInitizlied) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //User is signed in
                setloginInformation(user);
                setIsLoggedIn(true);
            } else {
                //User is signed out
                setloginInformation(null);
                setIsLoggedIn(false);
            }
            //setLoading to false when everything is complete 
            setIsLoading(false);
        }); 
    }
}, [appInitizlied]);

if (isLoading) return null; 
//parent; wrapper for entire function , don't need to pass createPost since it's defined in separate file 

    return (
        <>
            <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
            <Component
            {...pageProps}
            createUserFunction={createUserFunction}
            isLoggedIn={isLoggedIn}
            loginUserFunction={loginUserFunction}
            loginInformation={loginInformation}
            
            />
            <p>{error}</p>
        </>
    );
}