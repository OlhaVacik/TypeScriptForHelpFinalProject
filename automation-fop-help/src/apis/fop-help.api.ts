import { APIResponse } from 'playwright';
import { IncomeByMonthDto, IncomeRecordDto } from 'src/dto/income.dto';
import { ReportByQuarterDto } from 'src/dto/report.dto';
import { IncomeTaxesDto, IncomeTaxesRecordDto } from 'src/dto/taxes.dto';
import { IApiService } from 'src/services/interfaces/i-api.service';

export class FopHelpApi {
    public constructor(private apiService: IApiService) { }

    public async getProfile():Promise<[IncomeByMonthDto | null, APIResponse]> {
        const response = await this.apiService.get('https://new.fophelp.pro/api/incomes?');
        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);

        return [bodyJson, response];
    }

    public async getAddNewIncome(id?: string):Promise<[string, APIResponse]> {
        const generatedId = id ?? `ID-${Math.floor(Math.random() * 100000)}`;
        const generatedComment = `autotest-${Date.now()}`;
        const body = {
            'ID': generatedId,
            'Date': '2025-04-22',
            'Income': '50000',
            'Currency': 'UAH',
            'Comment': generatedComment,
            'Cash': true
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/add', body);
        const bodyJson = await response.text();

        return [bodyJson, response];
    }

    public async getUpdateMyIncome(incomeToUpdate: IncomeRecordDto):Promise<[IncomeRecordDto | null, APIResponse]> {
        const body = {
            'ID': incomeToUpdate.ID,
            'Date': incomeToUpdate.Date,
            'Income': incomeToUpdate.Income,
            'Currency': incomeToUpdate.Currency,
            'Comment': incomeToUpdate.Comment,
            'Cash': incomeToUpdate.Cash
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/update', body);
        const bodyJson = await this.safeJsonParse<IncomeRecordDto>(response);

        return [bodyJson, response];
    }

    public async getDeleteMyIncome(incomeToDelete: IncomeRecordDto):Promise<[IncomeRecordDto | null, APIResponse]> {
        const body = {
            'ID': incomeToDelete.ID,
            'Date': incomeToDelete.Date.split('T')[0],
            'Income': incomeToDelete.Income.toString(),
            'Currency': incomeToDelete.Currency,
            'Comment': incomeToDelete.Comment,
            'Cash': incomeToDelete.Cash
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/delete', body);
        const bodyJson = await this.safeJsonParse<IncomeRecordDto>(response);

        return [bodyJson, response];
    }

    public async getCurrentUnpaidTaxes(): Promise<[IncomeTaxesDto | null, APIResponse]> {
        const response = await this.apiService.get('https://new.fophelp.pro/api/taxes?');
        const bodyJson = await this.safeJsonParse<IncomeTaxesDto>(response);

        return [bodyJson, response];
    }

    public async getPayedTaxes(): Promise<[IncomeTaxesDto | null, APIResponse]> {
        const response = await this.apiService.get('https://new.fophelp.pro/api/taxes/payed');
        const bodyJson = await this.safeJsonParse<IncomeTaxesDto>(response);

        return [bodyJson, response];
    }

    public async getAddPayTaxes(taxToPay: IncomeTaxesRecordDto):Promise<[string, APIResponse]> {
        const generatedComment = `added-${Date.now()}`;
        const body: IncomeTaxesRecordDto = {
            ID: taxToPay.ID,
            Date: taxToPay.Date,
            Incomes: taxToPay.Incomes,
            Expenses: taxToPay.Expenses,
            FlatTax: taxToPay.FlatTax,
            SSP: taxToPay.SSP,
            VAT: taxToPay.VAT,
            Comment: generatedComment,
            Payed: taxToPay.Payed
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/taxes/pay', body);

        return [generatedComment, response];
    }

    public async getCurrentTaxesReports(): Promise<[IncomeTaxesDto | null, APIResponse]> {
        const response = await this.apiService.get('https://new.fophelp.pro/api/reports/taxes');
        const bodyJson = await this.safeJsonParse<IncomeTaxesDto>(response);

        return [bodyJson, response];
    }

    public async getAllReports(): Promise<[ReportByQuarterDto | null, APIResponse]> {
        const response = await this.apiService.get('https://new.fophelp.pro/api/reports/all');
        const bodyJson = await this.safeJsonParse<ReportByQuarterDto>(response);

        return [bodyJson, response];
    }

    private async safeJsonParse<T>(response: APIResponse): Promise<T | null> {
        const contentType = response.headers()['content-type'] ?? '';

        try {
            if (contentType.includes('application/json')) {
                const parsed = await response.json();
                if (typeof parsed === 'string') {
                    const manuallyParsed = JSON.parse(parsed);

                    return manuallyParsed as T;
                } else {
                    return parsed as T;
                }
            } else {
                const textBody = await response.text();
                const manuallyParsed = JSON.parse(textBody);

                return manuallyParsed as T;
            }
        } catch (error) {
            console.error('Parsing error JSON:', error);

            return null;
        }
    }
}
