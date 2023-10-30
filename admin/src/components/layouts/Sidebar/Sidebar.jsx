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
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import StarIcon from "@mui/icons-material/Star";

import "./style.css";

function Sidebar() {
    const [openLevel1, setOpenLevel1] = React.useState(false);
    const [openLevel2, setOpenLevel2] = React.useState(false);
    const [zoomedOut, setZoomedOut] = React.useState(false); // Set to false for zoomed in by default
    const [autoZoom, setAutoZoom] = React.useState(false); // Set to false to disable hover functions by default

    const handleToggleLevel1 = () => {
        setOpenLevel1(!openLevel1);
    };

    const handleToggleLevel2 = () => {
        setOpenLevel2(!openLevel2);
    };

    const handleToggleZoom = () => {
        setZoomedOut(!zoomedOut);
        if (!zoomedOut) {
            setAutoZoom(true); // Enable hover effect only when manually zooming out
        } else {
            setAutoZoom(false); // Disable hover effect when manually zooming in
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
                    width: zoomedOut ? 60 : 300,
                    transition: "width 0.3s",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    backgroundColor: "#f7f7f7",
                    borderRight: "1px solid #ddd",
                }}
            >
                <ListItem button onClick={handleToggleLevel1}>
                    <ListItemIcon>
                        <MenuIcon />
                    </ListItemIcon>
                    {!zoomedOut && <ListItemText primary="Level 1" />}
                    {!zoomedOut &&
                        (openLevel1 ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                <Collapse in={openLevel1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            button
                            sx={{ paddingLeft: 3 }}
                            onClick={handleToggleLevel2}
                        >
                            <ListItemIcon>
                                <SubdirectoryArrowRightIcon />
                            </ListItemIcon>
                            {!zoomedOut && <ListItemText primary="Level 2" />}
                            {!zoomedOut &&
                                (openLevel2 ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        <Collapse in={openLevel2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button sx={{ paddingLeft: 6 }}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    {!zoomedOut && (
                                        <ListItemText primary="Level 3 Item 1" />
                                    )}
                                </ListItem>
                                <ListItem button sx={{ paddingLeft: 6 }}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    {!zoomedOut && (
                                        <ListItemText primary="Level 3 Item 2" />
                                    )}
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
            </List>
        </>
    );
}

export default Sidebar;
