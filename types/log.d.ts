declare type LogInput = {
    container?: string;
    type?: string;
    platform?: string;
};
declare type Status = {
    status: number;
    message?: string;
    error?: string;
};
declare const log: (message?: string, { platform, type, container }?: LogInput) => Promise<Status>;
export { log };
