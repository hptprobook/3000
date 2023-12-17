
function FormatVND(data) {
    const formattedTotalAmount = data.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formattedTotalAmount;
}

export default FormatVND;
