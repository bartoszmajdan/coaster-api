import fs from 'fs';
import { join } from 'path';

import logger from './logger';
import prepareFolder from '../utils/prepareFolder';

import Wagon from '../models/Wagon';
import Coaster from '../models/Coaster';

interface ISerialize {
    id: string;
    model: string;
    data: Wagon | Coaster;
}

const loadModel = async (model: string, id: string): Promise<ISerialize | null> => {
    const folderPath = join(BASE_PATH, model);
    const filePath = getFilePath(folderPath, id);

    let fileContent = null;
    try {
        await fs.promises.access(filePath);
        fileContent = await fs.promises.readFile(filePath, ENCODING);
    } catch (error) {
        logger.error(`Error accessing file ${filePath}`, error);
        return null;
    }

    if (fileContent === null) {
        return null;
    }

    try {
        fileContent = JSON.parse(fileContent);
    } catch (error) {
        logger.error(`Error parsing file ${filePath}`, error);
        return null;
    }

    return {
        id,
        model,
        data: fileContent,
    };
};

abstract class FileDatabase {
    abstract serialize(): ISerialize;

    async save(): Promise<boolean> {
        const { id, model, data } = this.serialize();
        const folderPath = join(BASE_PATH, model);
        const filePath = getFilePath(folderPath, id);

        try {
            await prepareFolder(folderPath);
            await fs.promises.access(folderPath);
            await fs.promises.writeFile(filePath, JSON.stringify(data), ENCODING);
            return true;
        } catch (error) {
            logger.error(`Error accessing file ${filePath}`, error);
        }

        return false;
    }
}

const ENCODING = 'utf-8' as BufferEncoding;
const BASE_PATH = join(__dirname, '../', 'database');
const getFilePath = (folder: string, id: string): string => join(folder, `${id}.json`);

export { loadModel };
export default FileDatabase;
