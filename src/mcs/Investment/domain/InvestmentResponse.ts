import type HolderResponse from './HolderResponse';
import type InvestmentTypeResponse from './InvestmentTypeResponse';
import type MeasureUnitResponse from './MeasureUnitResponse';
import type PeriodTypeResponse from './PeriodTypeResponse';
import type MiningConcessionReponse from './MiningConsessionResponse';

export default interface InvestmentResponse {
	id: number;
	amountInvested: number;
	year: number;
	description: string;
	miningConcessionId: number;
	investmentTypeId: number;
	currencyTypeId: number;
	periodTypeId: number;
	measureUnitId: number;
	registrationDate: string;
	state: boolean;
	monthName: string;
	monthId: number;
	accreditationCode: string;
	accountantCode: string;
	holderId: number;
	declaredTypeId: number;
	documentId: number;
	investmentConceptId: number;
	module: boolean;
	frecuency: number;
	isDAC: number;
	metricTons: string;
	declarationDate: string;
	holder: HolderResponse;
	investmentType: InvestmentTypeResponse;
	measureUnit: MeasureUnitResponse;
	miningConcession: MiningConcessionReponse;
	periodType: PeriodTypeResponse;
}
