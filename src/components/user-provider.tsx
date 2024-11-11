"use client";

import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext(null as unknown as User);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
