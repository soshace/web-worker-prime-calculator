export enum WorkerInputType {'start', 'status'}

export enum WorkerResponseType {'calculated', 'status'}

export enum WorkerMode {'silent', 'log'}

export interface WorkerInput {
    type: WorkerInputType;
    arg: any;
}

export interface WorkerResponse {
    type: WorkerResponseType;
    data: any;
}

export interface StatusEntry {
    active: boolean;
    position?: number;
    prime?: number;
    percentage?: number;
}