"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ProfileLinkButton from "@/components/common/Button/ProfileLinkButton/ProfileLinkButton";
import { profileSidebarOpt } from "./Options";

const StyledProfileSidebar = styled("ul")(() => ({
    borderRadius: "5px",
    position: "sticky",
    listStyle: "none",
}));

export default function ProfileSidebar() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <StyledProfileSidebar className="profile-sidebar">
            <div className="profile-sidebar__header">
                <p>Xin chào</p>
            </div>
            <div className="profile-sidebar__item mt-12">
                {profileSidebarOpt.map((item) => (
                    <ProfileLinkButton
                        key={item.id}
                        icon={item.icon}
                        text={item.text}
                        url={item.url}
                        isActive={activeIndex === item.id}
                        onClick={() => handleButtonClick(item.id)}
                    />
                ))}
            </div>
        </StyledProfileSidebar>
    );
}
