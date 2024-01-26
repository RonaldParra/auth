export interface ResponseValidate {
    data:               Data;
    count:              number;
    transaction_status: TransactionStatus;
}

export interface Data {
    exist_customer: number;
}

export interface TransactionStatus {
    code: number;
    msg:  string;
}

