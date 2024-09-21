import Wagon from './Wagon';
import Database from '../providers/database';
import calculateRequiredStaff from '../utils/calculateRequiredStaff';
import calculateCoasterCapacity from '../utils/calculateCoasterCapacity';

interface ICoaster {
    id: string;
    staffCount: number;
    clientsCount: number;
    routeLength: number;
    openingHour: string;
    closingHour: string;
    wagons: Wagon[] | [];
}

class Coaster extends Database implements ICoaster {
    id: ICoaster['id'];
    staffCount: ICoaster['staffCount'];
    clientsCount: ICoaster['clientsCount'];
    routeLength: ICoaster['routeLength'];
    openingHour: ICoaster['openingHour'];
    closingHour: ICoaster['closingHour'];
    wagons: ICoaster['wagons'];

    constructor(coaster: ICoaster) {
        super();
        this.id = coaster.id;
        this.staffCount = coaster.staffCount;
        this.clientsCount = coaster.clientsCount;
        this.routeLength = coaster.routeLength;
        this.openingHour = coaster.openingHour;
        this.closingHour = coaster.closingHour;
        this.wagons = coaster.wagons;
    }

    async addWagon(wagon: Wagon) {
        if (!this.wagons) {
            this.wagons = [];
        }

        this.wagons = [...this.wagons, wagon];
        return this.save();
    }

    async deleteWagon(wagonId: string) {
        if (!this.wagons) {
            return;
        }

        this.wagons = this.wagons.filter((wagon) => wagon.id !== wagonId);
        return this.save();
    }

    async updateCoaster(
        coaster: Pick<ICoaster, 'staffCount' | 'clientsCount' | 'openingHour' | 'closingHour'>,
    ) {
        this.staffCount = coaster.staffCount;
        this.clientsCount = coaster.clientsCount;
        this.openingHour = coaster.openingHour;
        this.closingHour = coaster.closingHour;
        return this.save();
    }

    getMetadata(): {
        errors: string[];
        staffCount: number;
        requiredStaff: number;
    } {
        const errors = [] as string[];

        const staff = calculateRequiredStaff({
            wagons: this.wagons,
            staffCount: this.staffCount,
        });

        if (staff.errorMessage) {
            errors.push(staff.errorMessage);
        }

        const coasterCapacity = calculateCoasterCapacity(this);

        if (coasterCapacity.errorMessage) {
            errors.push(coasterCapacity.errorMessage);
        }

        return {
            staffCount: this.staffCount,
            errors: errors,
            requiredStaff: staff.requiredStaff,
        };
    }

    serialize() {
        return {
            data: this,
            id: this.id,
            model: Coaster.name,
        };
    }
}

export { ICoaster };
export default Coaster;
