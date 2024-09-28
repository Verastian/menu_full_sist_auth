'use server';

import { FooterJson } from '@/interfaces';
import fsPromises from 'fs/promises';
import path from 'path';

export const getLocalData = async () => {
    // ruta del archivo JSON
    const filePath = path.join(process.cwd(), 'src/staticDataJson.json');
    try {
        // Lee el archivo JSON
        const jsonData = await fsPromises.readFile(filePath);

        // Parsear los datos como JSON
        const objectData = JSON.parse(jsonData.toString());
        return {
            data: objectData
        }

    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}
