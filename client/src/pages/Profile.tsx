import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import UserPosts from "@/components/UserBlogs";
import { Edit, Users } from "lucide-react";

const userDemo = {
    profilePicture: "https://via.placeholder.com/150",
    name: "Niraj Jha",
    pronouns: "he",
    followers: 6,
    bio: "Hi, I am a third-year student at Lovely Professional University pursuing B Tech in computer science and engineering.",
    following: [
        { id: 1, name: "Sakshi Sawant", avatar: "https://via.placeholder.com/40" },
        { id: 2, name: "Adarsh Gupta", avatar: "https://via.placeholder.com/40" },
        { id: 3, name: "Village 88", avatar: "https://via.placeholder.com/40" },
        { id: 4, name: "Harsh Kashiwa", avatar: "https://via.placeholder.com/40" },
    ],
};

const ProfilePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.token) {
            navigate("/signin")
        }
    }, [navigate]);

    return (
        <main className="min-h-screen max-w-7xl mx-auto py-16">
            <div className="flex flex-col lg:flex-row gap-8 py-8 px-4">
                {/* Sidebar for mobile */}
                <aside className="w-full lg:hidden">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-xl text-black font-bold">{user?.name}</h2>
                                <Button size="sm" className="mt-2" variant="outline">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1">
                    <UserPosts userId={user?.userId!} token={user?.token!} />
                </div>

                {/* Desktop sidebar */}
                <aside className="hidden lg:block w-80 flex-shrink-0">
                    <div className="bg-white text-black dark:text-black p-6 rounded-lg shadow-md mb-8 sticky top-8">
                        {/* <img
                            src="{user?.profilePicture || userDemo.profilePicture}"
                            alt={user?.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        /> */}
                        <h2 className="text-xl font-bold text-center">{user?.name}</h2>
                        <Button className="w-full mt-4 text-black dark:text-white" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    <div className="bg-white text-black dark:text-black p-6 rounded-lg shadow-md sticky top-80">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5" />
                            <h2 className="text-lg font-bold">Following</h2>
                        </div>
                        <ul className="space-y-4">
                            {userDemo.following.map((person) => (
                                <li key={person.id} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors">
                                    <img
                                        src={person.avatar}
                                        alt={person.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="text-gray-800 font-medium">{person.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default ProfilePage;