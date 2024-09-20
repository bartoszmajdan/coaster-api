const checkOpeningAndClosingHours = (openingValue: string, closingValue: string) => {
    const [openingHour, openingMinute] = openingValue.split(':').map(Number);
    const [closingHour, closingMinute] = closingValue.split(':').map(Number);

    if (isNaN(openingHour) || isNaN(openingMinute) || isNaN(closingHour) || isNaN(closingMinute)) {
        return false;
    }

    if (openingHour > closingHour) {
        return false;
    }

    if (openingHour === closingHour && openingMinute >= closingMinute) {
        return false;
    }

    return true;
};

export default checkOpeningAndClosingHours;
