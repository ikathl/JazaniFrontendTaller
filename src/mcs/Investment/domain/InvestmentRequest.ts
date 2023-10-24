export default interface InvestmentRequest {
	amountInvested: number;
	year: number;
	description: string;
	miningConcessionId: number;
	investmentTypeId: number;
	currencyTypeId: number;
	periodTypeId: number;
	measureUnitId: number;
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
}
