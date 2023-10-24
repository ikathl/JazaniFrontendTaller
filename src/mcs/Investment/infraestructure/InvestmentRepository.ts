import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { stringify } from 'qs';
import { type InvestmentFilter, type InvestmentResponse, type InvestmentRequest } from '../domain';
import { type RequestPagination, type ResponsePagination } from '@/shared/domain';

export const findAll = async (): Promise<InvestmentResponse[]> => {
	const response: AxiosResponse<InvestmentResponse[]> = await axios.get<InvestmentResponse[]>(
		`${API_BASE_URL}/api/investment`,
	);
	console.log('----------------data investment-----------');
	console.log(response.data);
	return response.data;
};

export const paginatedSearch = async (
	payload: RequestPagination<InvestmentFilter>,
): Promise<ResponsePagination<InvestmentResponse>> => {
	const queryParams: string = stringify(payload, { allowDots: true });
	const response: AxiosResponse<ResponsePagination<InvestmentResponse>> = await axios.get<
		ResponsePagination<InvestmentResponse>
	>(`${API_BASE_URL}/api/investment/paginatedsearch?${queryParams}`);

	console.log('data investmetn filter');
	console.log(response.data);
	return response.data;
};

export const findById = async (id: number): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.get<InvestmentResponse>(
		`${API_BASE_URL}/api/Investment/${id}`,
	);

	return response.data;
};

export const create = async (payload: InvestmentRequest): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.post<InvestmentResponse>(
		`${API_BASE_URL}/api/Investment`,
		payload,
	);

	return response.data;
};

export const edit = async (payload: InvestmentRequest, id: number): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.put<InvestmentResponse>(
		`${API_BASE_URL}/api/Investment/${id}`,
		payload,
	);

	return response.data;
};

export const remove = async (id: number): Promise<InvestmentResponse> => {
	console.log('id from delete', id);
	const response: AxiosResponse<InvestmentResponse> = await axios.delete<InvestmentResponse>(
		`${API_BASE_URL}/api/Investment/${id}`,
	);

	return response.data;
};
