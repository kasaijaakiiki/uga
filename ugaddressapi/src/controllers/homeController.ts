import fs from 'fs';
import path from 'path';
import { Request, Response } from "express";
import { ResponseClass } from '../models/response.model';
export class HomeController {

    static async GetMainRegion(req: Request, res: Response) {
        try {
            const directoryPath = path.join(__dirname, '../configs/services'); // Replace with your directory path

            fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    return res.status(500).json({ error: 'Unable to scan directory: ' + err });
                }
                // Filter only directories
                const folderNames = files
                    .filter(file => file.isDirectory())
                    .map(file => file.name);
                return ResponseClass.sendSuccessResponse(res, 201, "Region created successfully", folderNames);
            });
        } catch (error) {
            return ResponseClass.sendErrorResponse(res, 500, "An Error Occurred!");
        }
    }

    static async GetMainRegionByRegionName(req: Request, res: Response) {
        try {
            const { regionName } = req.params;
            console.log(`Get main region`, regionName);
            const directoryPath = path.join(__dirname, `../configs/services/${regionName}`); // Adjust the path as needed

            // Use fs.promises for a more modern approach with async/await
            const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });

            // Filter only JSON files and remove the .json extension
            const jsonFileNames = files
                .filter(file => file.isFile() && file.name.endsWith('.json'))
                .map(file => file.name.replace('.json', '')); // Remove the .json extension

            return ResponseClass.sendSuccessResponse(res, 200, "JSON files retrieved successfully", jsonFileNames);
        } catch (error) {
            console.error('Error fetching JSON files:', error);
            return ResponseClass.sendErrorResponse(res, 500, "An Error Occurred!");
        }
    }
}