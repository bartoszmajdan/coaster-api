import Coaster from '../models/Coaster';
import leadingZero from '../utils/leadingZero';
import { loadModelList } from './database';
import logger from './logger';
import { checkIsMaster } from './master';

class CoasterManager {
    coasters: Coaster[] = [];

    async loadCoasters() {
        const models = await loadModelList('Coaster');
        this.coasters = models.map((model) => new Coaster(model.data as Coaster));
    }

    manageCoaster(coaster: Coaster): string {
        const metadata = coaster.getMetadata();

        let status = 'Status: OK';
        if (metadata.errors.length) {
            status = `Problem: ${metadata.errors.join(', ')}`;
        }

        const message = [
            `[Kolejka: ${coaster.id}]`,
            `\t Godziny działania: ${coaster.openingHour} - ${coaster.closingHour}`,
            `\t Liczba wagonów: ${coaster.wagons.length}/${coaster.wagons.length}`,
            `\t Dostepny personel: ${metadata.staffCount}/${metadata.requiredStaff}`,
            `\t Klienci dziennie: ${coaster.clientsCount}`,
            `\t ${status}`,
        ].join('\n');

        return message;
    }

    async start() {
        setInterval(async () => {
            const isMaster = checkIsMaster();
            if (!isMaster) {
                return;
            }

            await this.loadCoasters();
            const messages: string[] = [];
            this.coasters.forEach((coaster) => {
                messages.push(this.manageCoaster(coaster));
            });

            const date = new Date();
            const hour = leadingZero(date.getHours());
            const minute = leadingZero(date.getMinutes());
            console.clear();

            if (!messages.length) {
                messages.push('Brak kolejek do wyświetlenia');
            }

            logger.info(['', `[Godzina ${hour}:${minute}]`, ...messages, '\n'].join('\n'));
        }, 1000);
    }
}

export default CoasterManager;
