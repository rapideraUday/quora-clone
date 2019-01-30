
const os = require('os');
const ifaces = os.networkInterfaces();

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

    static getIp = () => {
        let address;
        Object.keys(ifaces).forEach((ifname) => {
            var alias = 0;

            ifaces[ifname].forEach((iface) => {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                }

                if (alias >= 1) {
                    // this single interface has multiple ipv4 addresses
                    console.log(ifname + ':' + alias, iface.address);
                    address = iface.address;
                } else {
                    // this interface has only one ipv4 adress
                    console.log(ifname, iface.address);
                    address = iface.address;
                }
                ++alias;
            });
        });
        console.log("Final Ip : ", address);
        return address;
    }

}