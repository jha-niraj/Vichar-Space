import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { BookmarkCheck, MoreHorizontal, Minus, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PostCardProps {
    id: number;
    authorName: string;
    title: string;
    content?: string;
    publishedDate: string;
    profileImage: string;
}

const PostCard: React.FC<PostCardProps> = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    profileImage
}) => {
    return (
        <Link to={`/blog/${id}`} className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <img className="h-12 w-12 rounded-full object-cover mr-4" src={profileImage} alt={`${authorName}'s profile`} />
                    <div>
                        <p className="text-lg font-semibold text-gray-900">{authorName}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                {content && <p className="text-gray-700 mb-4">{content}...</p>}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-5">
                        <p className="text-sm text-gray-600">{publishedDate}</p>
                        <div className="flex items-center space-x-1 text-gray-600">
                            <Heart size={20} className="text-red-500" />
                            <span>30</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                            <MessageCircle size={20} className="text-blue-500" />
                            <span>2</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="p-2 rounded-full hover:bg-gray-100">
                                    <Minus size={20} className="text-gray-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Show less posts like this</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger className="p-2 rounded-full hover:bg-gray-100">
                                    <BookmarkCheck size={20} className="text-gray-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Save</p>
                                </TooltipContent>
                            </Tooltip>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100">
                                    <MoreHorizontal size={20} className="text-gray-600" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Copy link</DropdownMenuItem>
                                    <DropdownMenuItem>Mute author</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-500">Report post</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;