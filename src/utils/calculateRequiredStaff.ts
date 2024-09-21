import Wagon from '../models/Wagon';

const calculateRequiredStaff = ({
    wagons = [],
    staffCount,
}: {
    wagons: Wagon[];
    staffCount: number;
}) => {
    let requiredStaff = 1;
    // every wagon needs 2 staff members
    requiredStaff += wagons.length * 2;

    let errorMessage = null;
    const staffDiff = requiredStaff - staffCount;
    if (staffDiff === -1) {
        errorMessage = 'Za dużo o 1 pracownika';
    } else if (staffDiff < -1) {
        errorMessage = `Za dużo o ${staffDiff * -1} pracowników`;
    } else if (staffDiff === 1) {
        errorMessage = 'Brakuje 1 pracownika';
    } else if (staffDiff > 1) {
        errorMessage = `Brakuje ${staffDiff} pracowników`;
    }

    return {
        requiredStaff,
        errorMessage,
    };
};

export default calculateRequiredStaff;
