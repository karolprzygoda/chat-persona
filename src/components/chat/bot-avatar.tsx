import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type BotAvatarProps = {
  src: string;
  className?: string;
};

const BotAvatar = ({ src, className }: BotAvatarProps) => {
  return (
    <Avatar className={cn("h-12 w-12", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
