import React from "react";
import "./style.css";
import AvatarUser from "../../common/User/Avatar";
import { Box } from "@mui/material";
import Notification from "../../common/Notification/Notification";
import Message from "../../common/Message/Message";
import ButtonChangeMode from "../../common/Button/ButtonChangeMode";

const Header = (propCustom) => {
    let bgColor = "#111927";
    let customColor = "#edf2f7";
    let customColor2 = "#a0aec0";
    if (propCustom.mode == "light") {
        bgColor = "rgb(255, 255, 255)";
        customColor = "#111927";
        customColor2 = "#6c737f";
    }
    return (
        <div className="header">
            <Box
                sx={{
                    display: "flex",
                    alignContent: "center",
                    float: "right",
                    height: "100%",
                }}
            >
                <ButtonChangeMode changeMode={propCustom.changeMode} />

                <Message />

                <Notification />
                <AvatarUser
                    customBg={bgColor}
                    customColor={customColor}
                    customColor2={customColor2}
                    mode={propCustom.mode}
                />
            </Box>
        </div>
    );
};

export default Header;
