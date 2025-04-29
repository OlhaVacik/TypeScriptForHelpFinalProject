export interface IncomeRecordDto {
    ID: string;
    Date: string;
    Income: string;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

export interface IncomeByMonthDto {
    [month: string]: IncomeRecordDto[];
}
