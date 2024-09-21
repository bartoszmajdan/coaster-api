const leadingZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export default leadingZero;
