export declare type LogInput = {
    container?: string;
    type?: string;
    platform?: string;
    config?: {
        container?: string;
        disabled?: boolean;
    };
};
export declare type Status = {
    status: number;
    message?: string;
    error?: string;
};
