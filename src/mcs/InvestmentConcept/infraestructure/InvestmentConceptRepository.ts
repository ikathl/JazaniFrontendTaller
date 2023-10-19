import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { type InvestmentConceptResponse } from '../domain';

export const findAll = async (): Promise<InvestmentConceptResponse[]> => {
	const response: AxiosResponse<InvestmentConceptResponse[]> = await axios.get<
		InvestmentConceptResponse[]
	>(`${API_BASE_URL}/api/investmentconcept`);

	return response.data;
};
// await axios.get<InvestmentConceptResponse[]>('https://localhost:7044/api/investmentconcept');
