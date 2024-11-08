import SidebarNavButton from "@/components/sidebar-nav-button";
import { Home, Plus, Settings } from "lucide-react";

const Sidebar = () => {
  const routes = [
    {
      icon: Home,
      description: {
        href: "/",
        label: "Home",
        pro: false,
      },
    },
    {
      icon: Plus,
      description: {
        href: "/persona/new",
        label: "Create",
        pro: true,
      },
    },
    {
      icon: Settings,
      description: {
        href: "/settings",
        label: "Settings",
        pro: false,
      },
    },
  ];

  return (
    <aside
      className={"flex h-full flex-col space-y-4 bg-secondary text-primary"}
    >
      <div className={"flex flex-1 justify-center p-3"}>
        <nav className={"space-y-2"}>
          {routes.map((route) => (
            <SidebarNavButton
              key={route.description.href}
              route={route.description}
            >
              <route.icon className={"h-5 w-5"} />
            </SidebarNavButton>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
