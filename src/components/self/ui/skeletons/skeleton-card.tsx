import { Skeleton } from "@/components/ui/skeleton";

type SkeletonCardProps = {
    count: number;
};

export function SkeletonCard() {
    return (
        <div className="transition-all duration-300 h-full flex flex-col justify-between">
            <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col h-full">
                <div className="mb-4">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-6 w-1/4" />
                </div>
                <div className="flex-grow">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="mt-4">
                    <Skeleton className="h-10 w-full rounded" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonCardList({ count }: SkeletonCardProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(count)].map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
}