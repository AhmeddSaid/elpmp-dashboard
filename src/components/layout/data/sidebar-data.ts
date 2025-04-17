import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "John Doe",
    email: "admin@elpmp.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ELPMP.com",
      logo: Command,
      plan: "Admin Dashboard",
    },
    // {
    //   name: 'Acme Inc',
    //   logo: GalleryVerticalEnd,
    //   plan: 'Enterprise',
    // },
    // {
    //   name: 'Acme Corp.',
    //   logo: AudioWaveform,
    //   plan: 'Startup',
    // },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: IconLayoutDashboard,
        },
        {
          title: "Exams",
          url: "/exams",
          icon: IconChecklist,
        },
        {
          title: "Sub Exams",
          url: "/sub-exams",
          icon: IconChecklist,
        },
        {
          title: "Questions",
          url: "/questions",
          icon: IconChecklist,
        },
        {
          title: "Enrollments",
          url: "/enrollments",
          icon: IconPackages,
        },
        {
          title: "Chats",
          url: "/chats",
          badge: "3",
          icon: IconMessages,
        },
        {
          title: "Users",
          url: "/users",
          icon: IconUsers,
        },
      ],
    },
    {
      title: "Auth",
      items: [
        {
          title: "Auth",
          icon: IconLockAccess,
          items: [
            {
              title: "Login",
              url: "/auth/login",
            },
            // {
            //   title: 'Sign In (2 Col)',
            //   url: '/sign-in-2',
            // },
            // {
            //   title: 'Sign Up',
            //   url: '/sign-up',
            // },
            // {
            //   title: 'Forgot Password',
            //   url: '/forgot-password',
            // },
            // {
            //   title: 'OTP',
            //   url: '/otp',
            // },
          ],
        },
        {
          title: "Errors",
          icon: IconBug,
          items: [
            {
              title: "Unauthorized",
              url: "/401",
              icon: IconLock,
            },
            {
              title: "Forbidden",
              url: "/403",
              icon: IconUserOff,
            },
            {
              title: "Not Found",
              url: "/404",
              icon: IconError404,
            },
            {
              title: "Internal Server Error",
              url: "/500",
              icon: IconServerOff,
            },
            {
              title: "Maintenance Error",
              url: "/503",
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: IconUserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: IconTool,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: IconPalette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: IconNotification,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: IconHelp,
        },
      ],
    },
  ],
};
