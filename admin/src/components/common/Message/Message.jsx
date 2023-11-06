import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { IconButton, Popover, Typography } from '@mui/material';
import './style.css';
import NotificationList from './MessageList';
import { TbMessageCircle2 } from 'react-icons/tb';

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}
export default function Message() {
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className='header-notification'>
      <IconButton
        edge="start"
        sx={{
          marginRight: 1,
        }}
        aria-describedby={id} variant="contained" onClick={handleClick}
        aria-label={notificationsLabel(100)}>

        <Badge badgeContent={100} color="error">
          <TbMessageCircle2 color='#6c737f' />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
       <NotificationList /> 
      </Popover>
    </div>

  );
}
