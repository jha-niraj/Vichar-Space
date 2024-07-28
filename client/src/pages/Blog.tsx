import { useParams } from "react-router-dom";
import { useBlog } from "@/hooks";

import PostDetails from "@/components/PostDetails";
import Navbar from "@/components/Navbar";
import SkeletonCard from "@/components/Skeleton";

const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, post } = useBlog(id);

    return (
        <section>
            <Navbar />
            <main className="w-full flex flex-col gap-4 mt-24">
                {loading ?
                    <div className="w-full h-screen p-5 flex gap-10 md:gap-3 flex-col md:flex-row bg-white shadow-lg rounded-lg">
                        <SkeletonCard height={200} />
                    </div>
                    :
                    (
                        post && <PostDetails title={post.title} content={post.content} authorName="Niraj Jha" publishedDate="10/07/2024" authorImage="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg" authorDescription="Full Stack Developer" />
                    )
                }
            </main>
        </section>
    )
}

export default Blog;