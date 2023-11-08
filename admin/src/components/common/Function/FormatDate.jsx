import { format } from 'date-fns';

function FormatDateTime(dateTimeString) {
    const formattedDate = format(new Date(dateTimeString), 'yyyy-MM-dd HH:mm:ss');
    return formattedDate;
}

export default FormatDateTime;
