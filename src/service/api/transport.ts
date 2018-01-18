import fetch from 'node-fetch';

export default class Transport {
    private endPoint: string;

    constructor(endPoint) {
        this.endPoint = endPoint;
    }

    request(url: string, method: Method = Method.GET, data: any = null): Promise<any> {
        return fetch((this.endPoint + url), {
        	method: method,
			body: data
		})
            .then((response) => response.json())
            .catch((err) => {
                throw err;
            });
    }
}


export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
