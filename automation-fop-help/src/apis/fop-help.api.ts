import { APIResponse } from 'playwright';
import { IncomeByMonthDto } from 'src/dto/income.dto';
import { ReportByQuarterDto } from 'src/dto/report.dto';
import { IncomeTaxesDto } from 'src/dto/taxes.dto';
import { IApiService } from 'src/services/interfaces/i-api.service';

export class FopHelpApi {
    public constructor(private apiService: IApiService) { }

    public async getProfile():Promise<[IncomeByMonthDto | null, APIResponse]> {
        const response = await this.apiService.get('https://new.fophelp.pro/api/incomes?');

        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
        return [bodyJson, response];
    }

    public async getAddNewIncome(id?: string):Promise<[IncomeByMonthDto | null, APIResponse]> {
        const generatedId = id ?? `ID-${Math.floor(Math.random() * 100000)}`;
        const body = {
            'ID': generatedId,
            'Date': '2025-04-19',
            'Income': '50000',
            'Currency': 'UAH',
            'Comment': 'тест-дата-4',
            'Cash': true
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/add', body);
        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
        return [bodyJson, response];
    }

    public async getUpdateMyIncome(id: string):Promise<[IncomeByMonthDto | null, APIResponse]> {
        const body = {
            'ID': id,
            'Date':'2025-04-19T00:00:00',
            'Income':'10000',
            'Currency':'UAH',
            'Comment':'тест-дата-5',
            'Cash':false
        };
        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/update', body);
        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
        return [bodyJson, response];
    }

    public async getDeleteMyIncome(id:string):Promise<[IncomeByMonthDto | null, APIResponse]> {
        const body = {
            'ID': id,
            'Date': '2025-04-19T00:00:00',
            'Income': '10000',
            'Currency': 'UAH',
            'Comment': 'тест-дата-5',
            'Cash': false
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/delete', body);
        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
        return [bodyJson, response];
    }

    public async addIncomeWithCustomCommentAndAmount(comment: string, amount: number): Promise<[IncomeByMonthDto | null, APIResponse]> {
        const generatedId = `ID-${Math.floor(Math.random() * 100000)}`;
        const body = {
            ID: generatedId,
            Date: '2025-04-19',
            Income: amount.toString(),
            Currency: 'UAH',
            Comment: comment,
            Cash: true
        };

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/add', body);
        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
        return [bodyJson, response];
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

    public async updateIncomeCustom(body: {
        ID: string;
        Date: string;
        Income: string;
        Currency: string;
        Comment: string;
        Cash: boolean;
    }): Promise<[IncomeByMonthDto | null, APIResponse]> {

        const response = await this.apiService.post('https://new.fophelp.pro/api/incomes/update', body);

        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
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
