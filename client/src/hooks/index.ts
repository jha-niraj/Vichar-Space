import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useUser } from "@/context/UserContext";

interface PostsProps {
    id: number;
    title: string;
    content: string;
    author: {
        name: string
    }
}
export const useBlogs = () => {
    const [posts, setPosts] = useState<PostsProps[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/posts/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setPosts(response.data.posts);
            } catch (err: any) {
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

interface PostProp {
    id: string;
    title: string;
    content: string;
    author: {
        name: string
    }
}
export const useBlog = (id: string | undefined) => {
    const [post, setPost] = useState<PostProp | undefined>(undefined);
    const [loading, setLoading] = useState<Boolean>(true);
    const { user } = useUser();

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/post/blog/${id}`, {
                    headers: {
                        Authorization: user?.token
                    }
                });
                setPost(response.data.post);
            } catch (err: any) {
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

export const useRandomBlog = () => {
    const [randomPosts, setRandomPosts] = useState<PostProp[]>([]);
    const [ loading, setLoading ] = useState<Boolean>(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/randomposts`);
                setRandomPosts(response.data.posts);
            } catch (err: any) {
                console.log("Error occurred while getting the posts: " + err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [])

    return {
        randomPosts,
        loading
    }
}