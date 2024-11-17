import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardLoadingSkeleton = () => {
  return (
    <Card className="relative">
      <div className="absolute right-2 top-2 z-40">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <CardHeader className="flex p-0 text-muted-foreground">
        <Skeleton className="aspect-square w-full rounded-b-none rounded-t-xl" />
      </CardHeader>
      <div className="flex flex-1 flex-col justify-between">
        <div className="p-4">
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <CardFooter className="flex items-center justify-between p-4 pt-0 text-xs text-muted-foreground">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-8" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardLoadingSkeleton;
