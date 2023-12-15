import { useEffect} from "react";
import { useRouter } from "next/router";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser ({createUserFunction, isLoggedIn}) {
    const router = useRouter();
    
    useEffect(() => {
        //if user is logged in, send them to profile 
        if (isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    
    return (
        <main>
            <h1>create user</h1>
            <CreateUserForm createUserFunction={createUserFunction}/>
        </main>
    );
};