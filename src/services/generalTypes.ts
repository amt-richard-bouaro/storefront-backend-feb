
export interface RESPONSE {
    code: string;
    message: string;
    type: 'error' | 'success';
    stack?: any;
    data?: any;
    error?: any;
}


