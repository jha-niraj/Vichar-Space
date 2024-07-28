import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";

interface PostProps {
    id: number;
    title: string;
    content: string;
    author: {
        name: string
    }
}
export const useBlogs = () => {
    const [ posts, setPosts ] = useState<PostProps[]>([]);
    const [ loading, setLoading ] = useState<Boolean>(true);

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/post/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setPosts(response.data.posts);
            } catch(err: any) {
                console.log("Error occurred while getting the posts: " + err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [])

    return {
        posts,
        loading
    }
}

// interface PostProp {
//     id: string | null
// }
export const useBlog = ( id : string ) => {
    const [ post, setPost ] = useState();
    const [ loading, setLoading ] = useState<Boolean>(true);

    useEffect(() => {
        const fetchBlog = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/post/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setPost(response.data.post);
            } catch(err: any) {
                console.log("Error occurred while getting the posts: " + err);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [])

    return {
        loading, 
        post
    }
}