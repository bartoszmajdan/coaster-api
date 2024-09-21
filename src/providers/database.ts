import fs from 'fs';
import { join } from 'path';

import logger from './logger';

import Wagon from '../models/Wagon';
import Coaster from '../models/Coaster';

import prepareFolder from '../utils/prepareFolder';
import getEnvioroment from '../utils/getEnvioroment';

interface ISerialize {
    id: string;
    model: string;
    data: Wagon | Coaster;
}

const loadModel = async (modelName: string, id: string): Promise<ISerialize | null> => {
    const folderPath = join(BASE_PATH, modelName);
    const filePath = getFilePath(folderPath, id);

    let fileContent = null;
    try {
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
        model: modelName,
        data: fileContent,
    };
};

const loadModelList = async (modelName: string): Promise<ISerialize[]> => {
    const folderPath = join(BASE_PATH, modelName);

    let files: string[] = [];
    try {
        await prepareFolder(folderPath);
        files = await fs.promises.readdir(folderPath);
    } catch (error) {
        logger.error(`Error reading folder ${folderPath}`, error);
        return [];
    }

    const models: ISerialize[] = [];
    for (const file of files) {
        const id = file.replace('.json', '');
        const model = await loadModel(modelName, id);
        if (model !== null) {
            models.push(model);
        }
    }

    return models;
};

abstract class FileDatabase {
    abstract serialize(): ISerialize;

    async save(): Promise<boolean> {
        const { id, model, data } = this.serialize();
        const folderPath = join(BASE_PATH, model);
        const filePath = getFilePath(folderPath, id);

        try {
            await prepareFolder(folderPath);
            await fs.promises.writeFile(filePath, JSON.stringify(data), ENCODING);
            return true;
        } catch (error) {
            logger.error(`Error accessing file ${filePath}`, error);
        }

        return false;
    }
}

const ENCODING = 'utf-8' as BufferEncoding;
const BASE_PATH = join(__dirname, '../../', 'database', getEnvioroment());
const getFilePath = (folder: string, id: string): string => join(folder, `${id}.json`);

export { loadModel, loadModelList };
export default FileDatabase;
