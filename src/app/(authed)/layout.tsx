"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const cookieName = process.env.COOKIE_NAME;

function AppLayoutInner({ children }: { children: React.ReactNode }) {
 
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
          )}
        >
          <Header fixed>
            <Search />
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <Main>{children}</Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // const [cookies] = useCookies([cookieName]);
  // const router = useRouter();
  // const pathname = usePathname();

  // const userId = cookies.userId;
  // const isLoginPage = pathname === "/auth/login";

  // useEffect(() => {
  //   if (!userId && !isLoginPage) {
  //     router.replace("/auth/login");
  //   }
  // }, [userId, isLoginPage, router]);

  // if (!userId && !isLoginPage) {
  //   return <p>Loading...</p>;
  // }

  return <AppLayoutInner>{children}</AppLayoutInner>;
}
