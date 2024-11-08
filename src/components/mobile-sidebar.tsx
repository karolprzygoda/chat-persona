import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className={"pr-4 md:hidden"}>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className={"bg-secondary p-0 pt-10"}>
        <VisuallyHidden>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </VisuallyHidden>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
