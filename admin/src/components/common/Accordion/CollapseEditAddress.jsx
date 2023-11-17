import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';
const AccordionCustom = styled(Accordion)(({ theme }) => ({
    borderRadius: '14px',
    color: color.textColor.dark,
    width: '100%',
    backgroundColor: color.backgroundColorSub2.dark,
    '&:first-of-type .MuiPaper-root .MuiAccordion-root': {
        // borderRadius: '0px',
    },
    '& .MuiPaper-root .MuiAccordion-root': {
        borderRadius: '0px',
    },
    '&:last-of-type .MuiPaper-root .MuiAccordion-root': {
        borderBottomLeftRadius: '0px', // Add this line for border-bottom-left-radius
        borderBottomRightRadius: '0px',
    },
    '&.css-10p74mq.MuiPaper-root.MuiAccordion-root:first-of-type ': {
        borderBottomLeftRadius: '0px', // Add this line for border-bottom-left-radius
        borderBottomRightRadius: '0px',
    },
}))
export default function CollapseEditAddress() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <AccordionCustom expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    General settings
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                </Typography>
            </AccordionDetails>
        </AccordionCustom>
    );
}
