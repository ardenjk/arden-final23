import { useEffect} from "react";
import { useRouter } from "next/router";
import LoginForm from "@/app/components/LoginForm";

export default function Login ({isLoggedIn, loginUserFunction}) {
    const router = useRouter();
    
    useEffect(() => {
        if (isLoggedIn) router.push("/profile");
    }, [!isLoggedIn]);


    //If user IS logged in, forward them to the profile page 
    return (
        <>
        <main>
            <h1>login</h1>
            <LoginForm loginUserFunction={loginUserFunction} />
        </main>
        </>
    );
}