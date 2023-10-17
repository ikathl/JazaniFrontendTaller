import axios, { type AxiosResponse } from 'axios';
import { type InvestmentConceptResponse } from '../domain';

export const findAll = async (): Promise<AxiosResponse<InvestmentConceptResponse[]>> =>
	await axios.get<InvestmentConceptResponse[]>('https://localhost:7044/api/investmentconcept');
