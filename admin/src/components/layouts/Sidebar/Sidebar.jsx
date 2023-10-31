import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ListSubheader } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import './style.css';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'transparent',
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'transparent',
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        color: '#9da4ae',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const hoverNav = '#252e3e';
const iconActive = '#6366f1';
const Sidebar = () => {
    const [bgColor, setBgColor] = React.useState('#1c2536');
    const [navColor, setNavColor] = React.useState('#9da4ae');
    const [navColorIcon, setNavColorIcon] = React.useState('#9da4ae');
    const [activeNav, setActiveNav] = React.useState(null);

    const activeNavbar = (index) => {
        setActiveNav(index);
        console.log(activeNav);
    }
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
    const handleClick = (index) => {
        if (openMenu === index) {
            setOpenMenu(0); // Close the submenu if it's open
        } else {
            setOpenMenu(index);
            setOpen(true);
            // Open the submenu
        }
    };
    return (
        <div className='sidebar'>
            <Drawer variant="permanent" open={open} >
                <Toolbar sx={{ bgcolor: bgColor, color: '#9da4ae' }}>
                    <IconButton
                        color="red"
                        aria-label="open drawer"
                        edge="start"
                        sx={{
                            marginRight: 5,
                            color: '#9da4ae'
                        }}
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <Typography color='white' noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>

                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block'}}>
                            <ListItemButton
                                sx={{
                                    backgroundColor: activeNav == index ? hoverNav : '',
                                    borderRadius: 3,
                                    minHeight: 40,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1,
                                    py: 0,
                                    m: 1,
                                    color: activeNav == index ? 'white' : navColor,
                                    '&:hover': {
                                        backgroundColor: hoverNav, // Change this to your desired hover color
                                      },
                                }}
                                onClick={() =>activeNavbar(index)}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: activeNav == index ? iconActive : navColor,
                                        minWidth: 0,
                                        mr: open ? 3 : 0,
                                        ml: open ? 0 : '6px',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <InboxIcon sx={{ height: 20, width: 20 }} />
                                </ListItemIcon>
                                <ListItemText primary={text}
                                    sx={{
                                        visibility: !open ? 'hidden' : 'visible',
                                        width: !open ? '0px' : 'auto',
                                        fontSize: 14,
                                    }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block'}}>
                           <NavLink className='nav-link' to="/">
                           <ListItemButton
                                sx={{
                                    backgroundColor: activeNav == index ? hoverNav : '',
                                    borderRadius: 3,
                                    minHeight: 40,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1,
                                    py: 0,
                                    m: 1,
                                    color: activeNav == index ? 'white' : navColor,
                                    '&:hover': {
                                        backgroundColor: hoverNav, // Change this to your desired hover color
                                      },
                                }}
                                onClick={() =>activeNavbar(index)}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: activeNav == index ? iconActive : navColor,
                                        minWidth: 0,
                                        mr: open ? 3 : 0,
                                        ml: open ? 0 : '6px',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <InboxIcon sx={{ height: 20, width: 20 }} />
                                </ListItemIcon>
                                <ListItemText primary={text}
                                    sx={{
                                        visibility: !open ? 'hidden' : 'visible',
                                        width: !open ? '0px' : 'auto',
                                        fontSize: 14,
                                    }} />
                            </ListItemButton>
                           </NavLink>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List
                    sx={{ width: '100%', }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Nested List Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                        }}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent mail" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClick(1)}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {openMenu === 1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openMenu === 1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => handleClick(2)}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {openMenu === 2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openMenu === 2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar