export interface User {
  data:               DataU;
  count:              number;
  transaction_status: TransactionStatus;
}

export interface DataU {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthday: string;
  total_points: number,
  points_expiration: string;
}

export interface TransactionStatus {
  code: number;
  msg:  string;
}
