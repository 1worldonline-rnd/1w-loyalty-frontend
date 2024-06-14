export type ErrorType = {
    error: string;
    message: string;
    path: string;
    status: number;
    timestamp: string;
};

// export const isErrorType = <T>(data: T | ErrorType): data is ErrorType => {
//     const { error, message } = data as ErrorType;
//     return Boolean(error && message);
// };
