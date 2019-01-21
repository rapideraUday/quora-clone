import { IResponseFormat } from "../interfaces/common/ResponseFormat";

export default class Utility {

    /**
     * @function generateResponse
     * @description used to create custom response 
     * @param statusCode 
     * @param message 
     * @param isSuccess 
     * @param data 
     */
    static generateResponse(statusCode: number, message: string, isSuccess: boolean, data: any) {
        let _responseFormat = new IResponseFormat();
        return _responseFormat = {
            statusCode,
            message,
            isSuccess,
            data
        }
    }

}