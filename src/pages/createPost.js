import { useCallback, useEffect} from "react";
import { useRouter } from "next/router";
import CreatePostForm from "@/app/components/CreatePostForm";
import styles from "../app/components/components.module.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import{
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes
} from "firebase/storage";

export default function CreatePost ({isLoggedIn, loginInformation}) {
    const router = useRouter();
    useEffect(() => {
        //if user is not logged in, send them to login 
        if (!isLoggedIn) router.push("/");
    }, [isLoggedIn]);
    
    // Create function to create a post 
    const createPostFunction = useCallback (
        async (e, imageUpload) => {
            e.preventDefault();
        //Initiate firebase
        const storage = getStorage();
        const db = getFirestore();
        // Get post content from form
        const postContent = e.currentTarget.postContent.value;
        //Variable for image 
        let imageURL;
        const storageRef = ref(storage, imageUpload?.name);
        await uploadBytes(storageRef, imageUpload)
            .then(async (snapshot) => {
                await getDownloadURL(snapshot.ref).then ((url) => {
                    imageULR = url;
                });
            })
            .catch((error) => {
                console.warn(error);
             });
        // Get user information to link post to user 
        const userId = loginInformation.uid;
        // Send post to firebase with addDoc 
        const data = await addDoc(collection(db, "posts"), {
            postContent: postContent,
            userId: userId,
            imageURL: imageURL,
        });

        // Re-route user away from createPost
        if (data) {
            router.push("/");
        }
    }, [addDoc, collection, getFirestore, router, loginInformation] )


    
    return (
        <main>
            <div className={styles.posttitle}>
                <h1>[oh:neul]</h1>
            </div>
            <CreatePostForm createPostFunction={createPostFunction} />
        </main>
    );
};