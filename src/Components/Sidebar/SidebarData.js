import React from "react";
import * as RiIcons from "react-icons/ri";
import FeedbackLogo from "../../images/feedback.png"
import Home from "../../images/home.png"

export const SidebarData = [
  {
    id: "home",
    title: "Home",
    path: "/",
    backgroundColor: "transparent",
    icon: Home,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    id: "feedback",
    title: "Share Feedback",
    backgroundColor: "transparent",
    path: "/users",
    icon: FeedbackLogo,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
