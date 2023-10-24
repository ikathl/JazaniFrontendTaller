import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { FIND_BY_ID } from './QueryKeys';
import { InvestmentRepository } from '../../infraestructure';
import { type InvestmentResponse } from '../../domain';

const useFindByIdInvestment = (id?: number): UseQueryResult<InvestmentResponse, Error> => {
	return useQuery({
		queryKey: [FIND_BY_ID, id],
		queryFn: async () => await InvestmentRepository.findById(id ?? 0),
		enabled: id != null,
		retry: 0,
		refetchOnWindowFocus: false,
	});
};

export default useFindByIdInvestment;
