const checkHoursAndMinutes = (value: string): boolean => {
    const [hour, minute] = value.split(':').map(Number);

    if (isNaN(hour) || isNaN(minute)) {
        return false;
    }

    if (hour < 0 || hour > 23) {
        return false;
    }

    if (minute < 0 || minute > 59) {
        return false;
    }

    return true;
};

export default checkHoursAndMinutes;
