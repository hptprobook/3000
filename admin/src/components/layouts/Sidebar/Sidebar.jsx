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
import MailIcon from '@mui/icons-material/Mail';
import { ListSubheader } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
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
const Sidebar = () => {
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
            setOpenMenu(index); // Open the submenu
        }
    };
    return (
        <div>
            <Drawer variant="permanent" open={open}>
                <Toolbar>
                    <IconButton
                        color="red"
                        aria-label="open drawer"
                        edge="start"
                        sx={{
                            marginRight: 5,
                        }}
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <Typography color="red" noWrap component="div">
                        dasd
                    </Typography>
                </Toolbar>
                <Divider />
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Nested List Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
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
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar