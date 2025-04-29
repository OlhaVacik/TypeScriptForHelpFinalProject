export interface ReportByQuarterDto {
    [quarter: string]: {
        ID: string;
        Date: string;
        Incomes: number;
        Expenses: number;
        FlatTax: number;
        FlatTaxQ: number;
        SSP: number;
        VAT: number;
    }[];
}

export interface DetailsAllReportDTO {
    ID: string;
    Date: string;
    Incomes: number;
    Expenses: number;
    FlatTax: number;
    FlatTaxQ: number;
    SSP: number;
    VAT: number;
}
