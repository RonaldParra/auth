export interface ResponseLogin {
    data:               Data;
    count:              number;
    transaction_status: TransactionStatus;
}

export interface Data {
    token: string;
    email: string;
}

export interface TransactionStatus {
    code: number;
    msg:  string;
}
