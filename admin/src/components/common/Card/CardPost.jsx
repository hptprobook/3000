import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import ChipPostTag from '../Chip/ChipPostTag';
import { NavLink } from 'react-router-dom';
import color from '~/config/colorConfig';

export default function CardPost({ post }) {
  return (
    <Card sx={{  maxWidth: '100%', borderRadius: '14px', background: color.backgroundColorSub.dark }}>
      <CardMedia
        sx={{ height: 200 }}
        image={`../src/assets/img/post/${post.img}`} // Assuming your image files are in the "static/images/cards" folder
        title={post.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <ChipPostTag label={post.tags} /> {/* Assuming post.tags is a comma-separated string */}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <NavLink
            underline="none"
            to={`/post/edit/${post.id}`}
            style={{
              color: color.ChipLink.dark,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {post.title}
          </NavLink>
        </Typography>
        <Typography variant="body2" color="GrayText">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
