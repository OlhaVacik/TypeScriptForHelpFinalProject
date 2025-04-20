export interface IncomeRecordDto {
    ID: string;
    Date: string;
    Income: number;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

export interface IncomeByMonthDto {
    [month: string]: IncomeRecordDto[];
}
