import Wagon from './Wagon';
import FileDatabase from '../providers/fileDatabase';

interface ICoaster {
    id: string;
    staffCount: number;
    clientsCount: number;
    routeLength: number;
    openingHour: string;
    closingHour: string;
    wagons?: Wagon[] | [];
}

class Coaster extends FileDatabase implements ICoaster {
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
