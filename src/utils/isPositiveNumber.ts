const isPositiveNumber = (value: string) => {
    const number = Number(value);

    if (isNaN(number)) {
        return false;
    }

    if (number < 0) {
        return false;
    }

    return true;
};

export default isPositiveNumber;
