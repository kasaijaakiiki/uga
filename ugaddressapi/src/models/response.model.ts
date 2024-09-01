
import { Request, Response } from 'express';
import { ApiResponse } from './interfaces/response.interface';
export class ResponseClass {
    /**
 * Sends a success JSON response.
 * @param {Response} res The response object.
 * @param {number} status The HTTP status code.
 * @param {string} message The message to include in the response.
 * @param {any} data The data to include in the response.
 */
    static sendSuccessResponse = (res: Response, status: number, message: string, data: any) => {
        const response: ApiResponse<any[]> = {
            status,
            message,
            isError: false,
            isSuccessful: true,
            data
        };
        return res.status(status).json(response);
    };

    /**
     * Sends an error JSON response.
     * @param {Response} res The response object.
     * @param {number} status The HTTP status code.
     * @param {string} message The error message to include in the response.
     */
    static sendErrorResponse = (res: Response, status: number, message: string) => {
        const response: ApiResponse<string> = {
            status,
            message,
            isError: true,
            isSuccessful: false,
            data: undefined
        };
        return res.status(status).json(response);
    };
}