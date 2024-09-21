import Coaster from '../models/Coaster';
import Wagon from '../models/Wagon';

function calculateCoasterCapacity(coaster: Coaster) {
    let wagonsCapacity = 0;
    const [openingHour, openingMinutes] = coaster.openingHour.split(':').map(Number);
    const [closingHour, closingMinutes] = coaster.closingHour.split(':').map(Number);

    const openingTime = openingHour * 60 + openingMinutes;
    const closingTime = closingHour * 60 + closingMinutes;

    const workingTime = closingTime - openingTime;

    const wagonsPauseInMinutes = 5;
    coaster.wagons.forEach((wagon: Wagon) => {
        // wagon speed is in m/s
        // routeLength is in m
        const oneRideTimeInMinutes =
            Math.floor(coaster.routeLength / wagon.speed / 60) + wagonsPauseInMinutes;

        // wagon must be back at the closing hour
        const maxRides = Math.floor(workingTime / oneRideTimeInMinutes);
        const wagonCapacity = maxRides * wagon.seatsCount;

        wagonsCapacity += wagonCapacity;
    });

    let errorMessage = null;
    if (wagonsCapacity < coaster.clientsCount) {
        errorMessage = `Jest o ${coaster.clientsCount - wagonsCapacity} za mało miejsc w wagonach`;
    }

    if (wagonsCapacity / coaster.clientsCount >= 2) {
        errorMessage = `Za dużo miejsc w wagonach oraz za dużo pracowników`;
    }

    return {
        wagonsCapacity,
        errorMessage,
    };
}

export default calculateCoasterCapacity;
