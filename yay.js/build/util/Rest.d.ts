import { AxiosResponse } from 'axios';
import { RequestOptions } from './Types';
import { RESTOptions } from './Types';
export declare class REST {
    private logger;
    private api;
    constructor(options: RESTOptions);
    private filterRequests;
    request: (options: RequestOptions) => Promise<AxiosResponse>;
}
