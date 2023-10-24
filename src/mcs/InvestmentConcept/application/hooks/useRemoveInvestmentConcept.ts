import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentConceptResponse } from '../../domain';
import { InvestmentConceptRepository } from '../../infraestructure';
import { FIND_BY_ID, PAGINATED_SEARCH } from '../QueryKeys';

const useRemoveInvestmentConcept = (): UseMutationResult<
	InvestmentConceptResponse,
	Error,
	number
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => await InvestmentConceptRepository.remove(id),
		onError: error => {
			console.error('Error', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
			void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
		},
	});
};

export default useRemoveInvestmentConcept;
