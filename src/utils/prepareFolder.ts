import fs from 'fs';

const prepareFolder = (path: string): Promise<string | undefined> =>
    fs.promises.mkdir(path, { recursive: true });

export default prepareFolder;
