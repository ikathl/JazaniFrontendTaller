import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { stringify } from 'qs';
import { type InvestmentFilter, type InvestmentResponse } from '../domain';
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
		ResponsePagination<InvestmentFilter>
	>(`${API_BASE_URL}/api/investment/paginatedsearch?${queryParams}`);

	console.log('data investmetn filter');
	console.log(response.data);
	return response.data;
};
