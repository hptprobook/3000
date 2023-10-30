import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SortIcon from "@mui/icons-material/Sort";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

import "./style.css";

function Sidebar() {
    const [openLevel1, setOpenLevel1] = React.useState(false);
    const [zoomedOut, setZoomedOut] = React.useState(false);
    const [autoZoom, setAutoZoom] = React.useState(false);
    const [activeLevel2Item, setActiveLevel2Item] = React.useState(false);

    const handleToggleLevel1 = () => {
        setOpenLevel1(!openLevel1);
    };

    const handleToggleZoom = () => {
        setZoomedOut(!zoomedOut);
        if (!zoomedOut) {
            setAutoZoom(true);
        } else {
            setAutoZoom(false);
        }
    };

    const handleMouseEnter = () => {
        if (autoZoom) {
            setZoomedOut(false);
        }
    };

    const handleMouseLeave = () => {
        if (autoZoom) {
            setZoomedOut(true);
        }
    };

    return (
        <>
            <Button
                sx={{
                    position: "fixed",
                    left: zoomedOut ? 80 : 320,
                    top: 12,
                    transition: ".3s",
                    color: "#fff",
                }}
                className="toggleMenuButton"
                onClick={handleToggleZoom}
            >
                {zoomedOut ? <SortIcon /> : <MenuIcon />}
            </Button>
            <List
                className="sidebarMenu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    width: zoomedOut ? 80 : 300,
                    paddingLeft: !zoomedOut ? 3 : 1,
                    paddingRight: !zoomedOut ? 3 : 1,
                    transition: "width 0.3s",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    backgroundColor: "#1c2536",
                    borderRight: "1px solid #ddd",
                    color: "#868e99",
                }}
            >
                <ListItem
                    button
                    onClick={handleToggleLevel1}
                    className="sidebarMenu__item"
                    selected={openLevel1}
                    sx={{
                        borderRadius: "12px",
                        height: 40,
                        "&:hover": {
                            backgroundColor: "#252e3e",
                        },
                        ...(openLevel1 && {
                            color: "#fff",
                            svg: { color: "#6366f1" },
                        }),
                    }}
                >
                    <ListItemIcon>
                        <MenuIcon sx={{ color: "#868e99" }} />
                    </ListItemIcon>
                    {!zoomedOut && <ListItemText primary="Level 1" />}
                    {!zoomedOut &&
                        (openLevel1 ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                <Collapse in={openLevel1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            button
                            sx={{
                                marginTop: "4px",
                                borderRadius: "12px",
                                height: 40,
                                paddingLeft: !zoomedOut ? 9 : 0,
                            }}
                        >
                            {!zoomedOut && <ListItemText primary="Level 2" />}
                        </ListItem>

                        <ListItem
                            button
                            sx={{
                                marginTop: "4px",
                                borderRadius: "12px",
                                height: 40,
                                paddingLeft: 9,
                            }}
                        >
                            {!zoomedOut && <ListItemText primary="Level 2" />}
                        </ListItem>

                        <ListItem
                            button
                            sx={{
                                marginTop: "4px",
                                borderRadius: "12px",
                                height: 40,
                                paddingLeft: 9,
                            }}
                        >
                            {!zoomedOut && <ListItemText primary="Level 2" />}
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </>
    );
}

export default Sidebar;
