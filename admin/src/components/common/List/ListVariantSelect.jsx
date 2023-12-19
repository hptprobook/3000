import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import color from '../../../config/colorConfig';
import FormatVND from '../Function/FormatVND';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: color.backgroundColorSub2.dark,
}));

export default function ListVariantSelect({ data, onClick }) {
    const handleDeleteItemVariant = (id) => {
        onClick(id);
    }
    return (
        <Demo>
            <List>
                {data.map((item, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            color: color.textColor.dark
                        }}
                        secondaryAction={
                            <IconButton edge="end" aria-label="Xóa" onClick={() => handleDeleteItemVariant(item.id)} >
                                <DeleteIcon sx={{ color: color.textColor.dark }} />
                            </IconButton>
                        }>
                        <ListItemText
                            primary={item.name + ' - ' + item.value + ' - ' + FormatVND(Number(item.price))}
                        />
                    </ListItem>
                ))}
            </List>
        </Demo >
    );
}
