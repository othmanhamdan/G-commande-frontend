export interface ApiResponse<T> {
    content: any;
    timeStamp : string;
    statusCode : number;
    status : string;
    message : string;
    data : { page : T};
}