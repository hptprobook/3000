import React from "react";
import Drawer from "@mui/material/Drawer";
import {
    Avatar,
    List,
    ListItemButton,
    ListItemIcon,
    Stack,
    Toolbar,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import AnalyticsIcon from "@mui/icons-material/Analytics";

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: "300px",
                position: "fixed",
                left: "0",
                top: "0",
                "& .MuiDrawer-paper": {
                    width: "300px",
                    boxSizing: "border-box",
                },
            }}
        >
            <List>
                <Toolbar>
                    <Stack
                        sx={{ width: "100%" }}
                        direction="row"
                        justifyContent="center"
                    >
                        Administrator
                    </Stack>
                </Toolbar>

                <h6 className="ps-2">DASHBOARD</h6>
                <ListItemButton>
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    Overview
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AnalyticsIcon />
                    </ListItemIcon>
                    Analytics
                </ListItemButton>
            </List>
        </Drawer>
    );
}

export default Sidebar;
