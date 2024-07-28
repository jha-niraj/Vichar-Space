import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

import Navbar from '@/components/Navbar';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/post`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            toast.success(response.data.msg);
            setTimeout(() => {
                navigate(`/blog/${response.data.id}`);
            }, 2000);
        } catch(err: any) {
            console.log("Error occurred while publishing the blogs: " + err);
            toast.error(err.response.data.msg);
        }
    };

    return (
        <section className='w-full h-screen'>
            <Toaster />
            <Navbar />
            <div className="w-[95%] h-full mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter post title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Write your post content here..."
                            rows={15}
                        >
                        </textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-sky-700 transition duration-200"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Publish;