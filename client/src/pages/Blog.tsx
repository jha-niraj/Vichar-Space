import { useParams } from "react-router-dom";
import { useBlog } from "@/hooks";

import PostDetails from "@/components/PostDetails";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

const Blog = () => {
    const { id } = useParams();
    const { loading, post } = useBlog(id);
    
    return (
        <section>
            <Navbar />
            <main className="w-full flex flex-col gap-4 mt-24">
            { loading ? 
                        <div className="w-[90%] sm:w-[80%] flex flex-col gap-10 bg-white md:w-[70%] mx-auto cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    :
                        <PostDetails title={post.title} content={post.content} authorName="Niraj Jha" publishedDate="10/07/2024" authorImage="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg" authorDescription="Full Stack Developer" />
                }
            </main>
        </section>
    )
}

export default Blog;