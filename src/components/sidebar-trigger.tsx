"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

type SidebarTriggerContextType = {
  setOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
};

const SidebarTriggerContext = createContext<
  SidebarTriggerContextType | undefined
>(undefined);

export const useSidebarTriggerContext = (): SidebarTriggerContextType => {
  const context = useContext(SidebarTriggerContext);
  if (!context) {
    throw new Error(
      "useSidebarTriggerContext must be used within a SidebarTriggerProvider",
    );
  }
  return context;
};

export const SidebarTriggerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { setOpen } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => {
    if (!isDropdownOpen) setOpen(false);
  };

  return (
    <SidebarTriggerContext.Provider
      value={{ setOpen, isDropdownOpen, setIsDropdownOpen }}
    >
      <nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </nav>
    </SidebarTriggerContext.Provider>
  );
};
