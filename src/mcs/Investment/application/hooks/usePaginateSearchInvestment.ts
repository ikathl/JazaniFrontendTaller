import { type DefinedUseQueryResult, type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type InvestmentResponse, type InvestmentFilter } from '../../domain';
import { type ResponsePagination, type RequestPagination } from '@/shared/domain';
import { PAGINATE_SEARCH } from './QueryKeys';
import { InvestmentRepository } from '../../infraestructure';

export const usePaginateSearchInvestment = (
	searchFilter: RequestPagination<InvestmentFilter>,
): UseQueryResult<ResponsePagination<InvestmentResponse>, Error> => {
	return useQuery({
		queryKey: [PAGINATE_SEARCH, searchFilter],
		queryFn: async () => await InvestmentRepository.paginatedSearch(searchFilter),
		retry: 0,
		refetchOnWindowFocus: false,
	});
};
