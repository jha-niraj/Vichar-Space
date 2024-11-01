import { BASE_URL } from '@/config';
import axios from 'axios';
import { CalendarDays, User, Tag, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
    authorId: number;
    content: string;
    id: number;
    published: boolean;
    title: string;
}

const UserPosts = ({ userId, token }: { userId: string, token: string }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BASE_URL}/post/blogs/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                });

                if (response.data.success) {
                    setPosts(response.data.data);
                }
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
                Error: {error}
            </div>
        );
    }

    if (!posts.length) {
        return (
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="text-gray-400 mb-4">
                    <User className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No posts yet</h3>
                <p className="text-gray-500 mt-2">Start writing your first blog post!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post: PostProps, index: number) => (
                <Link
                    to={`/blog/${post.id}`}
                    key={index}
                    className="block bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 line-clamp-2">
                                {post.title}
                            </h2>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${post.published
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {post.published ? (
                                    <>
                                        <Eye className="w-4 h-4 mr-1" />
                                        Published
                                    </>
                                ) : (
                                    <>
                                        <Tag className="w-4 h-4 mr-1" />
                                        Draft
                                    </>
                                )}
                            </span>
                        </div>

                        <p className="text-gray-600 mt-3 line-clamp-3">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>Author ID: {post.authorId}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                <span>Posted on {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default UserPosts;