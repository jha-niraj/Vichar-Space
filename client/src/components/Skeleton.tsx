import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
    return (
        <div className="flex flex-col space-y-3 w-full">
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

export default SkeletonCard;