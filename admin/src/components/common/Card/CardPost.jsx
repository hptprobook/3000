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

export default function CardPost() {
    return (
        <Card sx={{ maxWidth: '100%', borderRadius: '14px', backgroundColor: color.backgroundColorSub.dark }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <ChipPostTag label="hell" />
                    <ChipPostTag label="hell" />
                    <ChipPostTag label="hell" />
                    <ChipPostTag label="hell" />
                    <ChipPostTag label="hell" />
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <NavLink to='post/edit/1'>
                        sdasd
                    </NavLink>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>

        </Card>
    );
}
