import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheader } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { GoDotFill } from "react-icons/go";
import "./style.css";
import { NavLink } from "react-router-dom";
import { getMenuNav } from "./MenuNav"; // Import the getMenuNav function

const drawerWidth = 240;
const menuNav = getMenuNav();
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "transparent",
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "transparent",
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const hoverNav = "#252e3e";
const iconActive = "#6366f1";
const scrollbarColor = "#5d6472";
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    color: "#9da4ae",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "&:hover": {
        "& .MuiDrawer-paper": {
            // Hiển thị thanh cuộn khi hover vào MuiDrawer
            "::-webkit-scrollbar": {
                visibility: "visible",
                width: "8px",
            },
            "::-webkit-scrollbar-thumb": {
                borderRadius: "5px",
                background: scrollbarColor,
            },
            // Hiển thị thanh cuộn (cho Firefox)
            scrollbarWidth: "thin",
        },
    },
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            // Ẩn thanh cuộn khi Drawer đóng
            "::-webkit-scrollbar": {
                visibility: "visible",
                width: "8px",
            },
            "::-webkit-scrollbar-thumb": {
                background: "transparent",
            },
            // Ẩn thanh cuộn (cho Firefox)
            scrollbarWidth: "none",
        },
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            // Ẩn thanh cuộn khi Drawer đóng
            "::-webkit-scrollbar": {
                display: "none",
                width: "0",
            },
            "::-webkit-scrollbar-thumb": {
                display: "none",
                background: "transparent",
            },
            // Ẩn thanh cuộn (cho Firefox)
            scrollbarWidth: "none",
        },
    }),
}));

const Sidebar = () => {
    const [bgColor, setBgColor] = React.useState("#1c2536");
    const [navColor, setNavColor] = React.useState("#9da4ae");
    const [navColorIcon, setNavColorIcon] = React.useState("#9da4ae");
    const [activeNav, setActiveNav] = React.useState(null);
    const [activeSubmenu, setActiveSubmenu] = React.useState(null);

    const handleActiveNavbar = (index) => {
        setActiveNav(index);
    };
    const handleActiveSubmenu = (index) => {
        setActiveSubmenu(index);
    };
    const theme = useTheme();

    const [open, setOpen] = React.useState(true);
    const [openMenu, setOpenMenu] = React.useState(0);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpenMenu(0);
    };
    const handleOpenSubmenu = (index) => {
        if (openMenu === index) {
            setOpenMenu(0); // Close the submenu if it's open
        } else {
            setOpenMenu(index);
            setOpen(true);
            // Open the submenu
        }
    };
    return (
        <div className="sidebar">
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    paddingRight: "8px",
                }}
            >
                <Toolbar sx={{ bgcolor: bgColor, color: "#9da4ae" }}>
                    <IconButton
                        color="red"
                        aria-label="open drawer"
                        edge="start"
                        sx={{
                            marginRight: 1,
                            color: "#9da4ae",
                        }}
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <Typography color="white" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>

                {menuNav.map((navItem) => (
                    <List
                        key={navItem.key}
                        sx={{ width: "100%" }}
                        component="nav"
                        {...(navItem.link
                            ? {
                                  "aria-labelledby": "nested-list-subheader",
                                  subheader: (
                                      <ListSubheader
                                          sx={{
                                              backgroundColor: bgColor,
                                              color: navColor,
                                          }}
                                          component="div"
                                          id="nested-list-subheader"
                                      >
                                          {open ? navItem.label : navItem.icon}
                                      </ListSubheader>
                                  ),
                              }
                            : {})}
                    >
                        <Divider />
                        {navItem.children.map((item) => (
                            <div key={item.key}>
                                <NavLink
                                    className="nav-link"
                                    to={item.children ? null : item.link}
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            handleOpenSubmenu(item.key);
                                            !item.children
                                                ? handleActiveNavbar(item.key)
                                                : "";
                                        }}
                                        sx={{
                                            backgroundColor:
                                                activeNav == item.key
                                                    ? hoverNav
                                                    : "",
                                            borderRadius: 3,
                                            minHeight: 40,
                                            justifyContent: open
                                                ? "initial"
                                                : "center",
                                            px: 1,
                                            py: 0,
                                            m: 1,
                                            color:
                                                activeNav == item.key
                                                    ? "white"
                                                    : navColor,
                                            "&:hover": {
                                                backgroundColor: hoverNav, // Change this to your desired hover color
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color:
                                                    activeNav == item.key
                                                        ? iconActive
                                                        : navColor,
                                                minWidth: 0,
                                                mr: open ? 3 : 0,
                                                ml: "8px",
                                                justifyContent: "center",
                                                fontSize: '20px',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            sx={{
                                                visibility: !open
                                                    ? "hidden"
                                                    : "visible",
                                                fontSize: 14,
                                            }}
                                        />
                                        {item.children ? (
                                            openMenu === item.key ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore
                                                    sx={{
                                                        display: !open
                                                            ? "none"
                                                            : "block",
                                                    }}
                                                />
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </ListItemButton>
                                </NavLink>
                                {item.children ? (
                                    <Collapse
                                        in={openMenu === item.key}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {item.children.map((subItem) => (
                                                <NavLink
                                                    key={subItem.key}
                                                    className="nav-link"
                                                    to={subItem.link}
                                                >
                                                    <ListItemButton
                                                        onClick={() => {
                                                            handleActiveNavbar(
                                                                item.key
                                                            );
                                                            handleActiveSubmenu(
                                                                subItem.key
                                                            );
                                                        }}
                                                        sx={{
                                                            borderRadius: 3,
                                                            minHeight: 40,
                                                            justifyContent: open
                                                                ? "initial"
                                                                : "center",
                                                            px: 1,
                                                            py: 0,
                                                            m: 1,
                                                            color:
                                                                activeSubmenu ==
                                                                subItem.key
                                                                    ? "white"
                                                                    : navColor,
                                                            "&:hover": {
                                                                backgroundColor:
                                                                    hoverNav, // Change this to your desired hover color
                                                            },
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                opacity:
                                                                    activeSubmenu ==
                                                                    subItem.key
                                                                        ? 1
                                                                        : 0,
                                                                color: iconActive,
                                                                minWidth: 0,
                                                                mr: open
                                                                    ? 3
                                                                    : 0,
                                                                ml: "8px",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <GoDotFill />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                subItem.label
                                                            }
                                                            sx={{
                                                                visibility:
                                                                    !open
                                                                        ? "hidden"
                                                                        : "visible",
                                                                fontSize: 14,
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </NavLink>
                                            ))}
                                        </List>
                                    </Collapse>
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                    </List>
                ))}
            </Drawer>
        </div>
    );
};

export default Sidebar;
