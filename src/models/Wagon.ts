class Wagon {
    id: string;
    speed: number;
    seatsCount: number;

    constructor(wagon: Wagon) {
        this.id = wagon.id;
        this.speed = wagon.speed;
        this.seatsCount = wagon.seatsCount;
    }
}

export default Wagon;
