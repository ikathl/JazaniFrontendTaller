import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { type InvestmentConceptRequest, type InvestmentConceptResponse } from '../domain';

export const findAll = async (): Promise<InvestmentConceptResponse[]> => {
	const response: AxiosResponse<InvestmentConceptResponse[]> = await axios.get<
		InvestmentConceptResponse[]
	>(`${API_BASE_URL}/api/investmentconcept`);

	return response.data;
};

// await axios.get<InvestmentConceptResponse[]>('https://localhost:7044/api/investmentconcept');
// CRUD

export const findById = async (id: number): Promise<InvestmentConceptResponse> => {
	const response: AxiosResponse<InvestmentConceptResponse> =
		await axios.get<InvestmentConceptResponse>(`${API_BASE_URL}/api/InvestmentConcept/${id}`);

	return response.data;
};

export const create = async (
	payload: InvestmentConceptRequest,
): Promise<InvestmentConceptResponse> => {
	const response: AxiosResponse<InvestmentConceptResponse> =
		await axios.post<InvestmentConceptResponse>(`${API_BASE_URL}/api/InvestmentConcept`, payload);

	return response.data;
};

export const edit = async (
	payload: InvestmentConceptRequest,
	id: number,
): Promise<InvestmentConceptResponse> => {
	const response: AxiosResponse<InvestmentConceptResponse> =
		await axios.put<InvestmentConceptResponse>(
			`${API_BASE_URL}/api/InvestmentConcept/${id}`,
			payload,
		);

	return response.data;
};

export const remove = async (id: number): Promise<InvestmentConceptResponse> => {
	const response: AxiosResponse<InvestmentConceptResponse> =
		await axios.delete<InvestmentConceptResponse>(`${API_BASE_URL}/api/InvestmentConcept/${id}`);

	return response.data;
};
