import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import SkeletonCard from "@/components/Skeleton";
import { useBlogs } from "@/hooks";

const Dashboard = () => {
    const { posts, loading } = useBlogs();

    return (
        <section className="flex flex-col w-full">
            <Navbar />
            <main className="w-full flex flex-col gap-4 mt-28">
                { loading ? 
                        <div className="w-[90%] sm:w-[80%] flex flex-col gap-10 bg-white md:w-[70%] mx-auto cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    :
                        posts && posts.map((post, index: number) => {
                        return (
                            <PostCard key={index} id={post.id} authorName={post.author.name} title={post.title} content={post.content.substring(0, 128)} publishedDate="10/07/2024" profileImage="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg" />
                        )
                    })
                }
            </main>
        </section>
    )
}

export default Dashboard;