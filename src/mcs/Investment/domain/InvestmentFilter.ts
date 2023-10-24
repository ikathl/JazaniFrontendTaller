import type InvestmentResponse from './InvestmentResponse';

export default interface InvestmentFilter {
	amountInvested: number;
	description: string;
	accreditationCode: string;
}
