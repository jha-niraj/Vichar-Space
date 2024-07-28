interface PostDetailsProps {
    title: string;
    content: string;
    publishedDate: string;
    authorName: string;
    authorImage: string;
    authorDescription: string
}

const PostDetails: React.FC<PostDetailsProps> = ({
    title,
    content,
    publishedDate,
    authorName,
    authorImage,
    authorDescription
}) => {
    return (
        <div className="w-[90%] mx-auto p-5 flex gap-10 md:gap-3 flex-col md:flex-row bg-white shadow-lg rounded-lg">
            <div className="w-full md:w-[75%] flex flex-col gap-3 pr-3 md:border-r">
                <div>
                    <h1 className="text-4xl font-bold">{title}</h1>
                </div>
                <div>
                    <p>Published Date: {publishedDate}</p>
                </div>
                <div>
                    <p className="text-xl font-small">{content}</p>
                </div>
            </div>
            <div className="flex flex-col w-full md:w-[25%]">
                <h1 className="text-xl font-medium">Author</h1>
                <div className="w-full flex items-center justify-center gap-3">
                    <div className="w-24 flex md:flex-row justify-center">
                        <img src={authorImage} className="w-8 h-8 rounded-full" alt={authorName} />
                    </div>
                    <div className="w-full">
                        <h1 className="text-xl font-bold">{authorName}</h1>
                        <p className="text-thin font-small">{authorDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
