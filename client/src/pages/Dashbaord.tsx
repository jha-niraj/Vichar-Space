import { Skeleton } from "@/components/ui/skeleton";
import { User, Clock, Eye, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogs } from "@/hooks";

const Dashboard = () => {
    const { posts, loading } = useBlogs();

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-20 flex gap-8">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">For You</h1>
                    </div>

                    <div className="flex flex-col gap-6">
                        {
                            loading ? (
                                <div className="text-center">
                                    <Skeleton className="h-6 w-full mb-4" />
                                    <Skeleton className="h-6 w-full mb-4" />
                                    <Skeleton className="h-6 w-full mb-4" />
                                    <Skeleton className="h-6 w-3/4" />
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <Link to={`/blog/${post.id}`} key={post.id} className="hover:no-underline">
                                        <div className="p-6 bg-white shadow-md rounded-lg flex gap-6 hover:shadow-lg transition-shadow duration-200">
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                                                <p className="text-sm mt-2 text-gray-500">
                                                    {post.content.substring(0, 100)}...
                                                </p>
                                                <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
                                                    <User className="w-4 h-4" />
                                                    <span>{post.author.name}</span>
                                                    <Clock className="w-4 h-4 ml-4" />
                                                    <span>Published Date</span>
                                                    <Eye className="w-4 h-4 ml-4" />
                                                    <span>2.9K views</span>
                                                    <MessageSquare className="w-4 h-4 ml-4" />
                                                    <span>45 comments</span>
                                                </div>
                                            </div>
                                            {/* <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={post.thumbnail} alt="Post thumbnail" className="object-cover w-full h-full" />
                                        </div> */}
                                        </div>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </div>

                {/* Sidebar Section */}
                <aside className="w-1/4 hidden lg:block">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-bold mb-4">Staff Picks</h2>
                        <ul className="space-y-4">
                            <li>
                                <Link to="#" className="text-blue-500 hover:text-blue-700 font-semibold">
                                    A Tale of Two Transitions: Why America Can’t Risk Another Tumultuous Presidency
                                </Link>
                                <p className="text-sm text-gray-400">by Victor Garcia</p>
                            </li>
                            {/* Add more "Staff Picks" items here */}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Recommended Topics</h2>
                        <div className="flex flex-wrap gap-2">
                            {["Self Improvement", "Politics", "Writing", "Productivity", "Money"].map((topic) => (
                                <span
                                    key={topic}
                                    className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Dashboard;
