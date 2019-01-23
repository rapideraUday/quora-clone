import { Injectable } from '@angular/core';


/**
 *
 */
export interface IApiEndpoint {
  name: string;
  method?: string;
  url: string;
  restfull?: boolean;
}

/**
 *
 */
export enum ApiEndpointType {
  GET, PUT, POST, DELETE
}

/**
 *
 */
@Injectable({
  providedIn:'root'
})
export class EndpointService {

  private readonly baseUrl: string = 'http://localhost:3770/api/v1';
  private endpoints: Array<IApiEndpoint> = [];

  constructor() {
    this.init();
  }


  get(name: string): IApiEndpoint {

    const requiredEndpoint = this.endpoints.find((endpoint) => endpoint.name === name);

    if (requiredEndpoint && requiredEndpoint.url.indexOf(this.baseUrl) !== 0) {// check if endpoint url has the baseUrl already.
      requiredEndpoint.url = this.baseUrl + requiredEndpoint.url;
    }

    return requiredEndpoint;
  }
  private init() {

    this.endpoints = [
      /**
       * FOR LOGIN & LOGOUT
       */
      { name: 'LOGIN', url: '/login', method: 'POST' },
      { name: 'ALL_USER', url: '/auth/allUsers', method: 'GET' },
      { name: 'LOGOUT', url: '/v1/auth/logout', method: 'POST' },

      { name: 'UPDATE_USER', url: '/update', method: 'PUT' },
      { name: 'DELETE_USER', url: '/delete', method: 'DELETE' },




      /***
       * 
       */
    ];
  }
}
