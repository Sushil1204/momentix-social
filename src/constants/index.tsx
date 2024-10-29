import {
  Bell,
  CirclePlus,
  House,
  MessageCircle,
  Search,
  UsersRound,
} from "lucide-react";

export const Navlinks = [
  {
    title: "Home",
    icon: <House />,
    href: "/",
  },
  {
    title: "Search",
    icon: <Search />,
    href: "/search",
  },
  {
    title: "Notification",
    icon: <Bell />,
    href: "/notifications",
  },
  {
    title: "Friends",
    icon: <UsersRound />,
    href: "/friends",
  },
  {
    title: "Create",
    href: "/create",
    icon: <CirclePlus />,
  },
];

export const MobileNavlinks = [
  {
    icon: <House />,
    href: "/",
    title: "Home",
  },
  {
    icon: <Search />,
    href: "/search",
    title: "Search",
  },
  {
    icon: <CirclePlus />,
    href: "/create",
    title: "Create",
  },
  {
    title: "Message",
    icon: <MessageCircle />,
    href: "/chat",
  },
];
