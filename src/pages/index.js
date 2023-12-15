import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getDocs, getFirestore, collection} from "firebase/firestore";
import PostCard from "@/app/components/PostCard";
import styles from "../app/components/components.module.css";

export default function Dashboard ({isLoggedIn}) {
    const router = useRouter();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) router.push("/login");
        }, [isLoggedIn]);

    //Get all posts from firebase to display
    useEffect (() => {
        async function getAllPosts() {
            const postsArray = [];
            const db = getFirestore();
            const postsQuery = await getDocs(collection(db, "posts"));
            console.log(postsQuery);
            postsQuery.forEach((post) => {
                postsArray.push({ id: post.id, ...post.data()});
            });
            setAllPosts(postsArray);
        }
        getAllPosts();
    }, []);
    // console.log(allPosts);
    return (
        <main>
            <div className={styles.dashboard}>
                <h1 className={styles.dashtitle}>your feed</h1>
                <div className={styles.PostCardsWrapper}>
                    {allPosts.map((post,i) => (
                        <PostCard post={post} key={i} />
                    ))}
                </div>
            </div>
        </main>
    );
}


