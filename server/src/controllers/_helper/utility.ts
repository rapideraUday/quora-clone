import { IResponseFormat } from "../interfaces/common/ResponseFormat";

export default class Utility {
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