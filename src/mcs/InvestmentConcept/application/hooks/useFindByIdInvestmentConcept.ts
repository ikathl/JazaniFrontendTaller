import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { FIND_BY_ID } from '../QueryKeys';
import { InvestmentConceptRepository } from '../../infraestructure';
import { type InvestmentConceptResponse } from '../../domain';

const useFindByIdInvestmentConcept = (
	id?: number,
): UseQueryResult<InvestmentConceptResponse, Error> => {
	return useQuery({
		queryKey: [FIND_BY_ID, id],
		queryFn: async () => await InvestmentConceptRepository.findById(id ?? 0),
		enabled: id != null,
		retry: 0,
		refetchOnWindowFocus: false,
	});
};

export default useFindByIdInvestmentConcept;
