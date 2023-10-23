import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentConceptResponse, type InvestmentConceptRequest } from '../../domain';
import { InvestmentConceptRepository } from '../../infraestructure';
import { PAGINATED_SEARCH } from '../QueryKeys';

const useCreateInvestmentConcept = (): UseMutationResult<
	InvestmentConceptResponse,
	Error,
	InvestmentConceptRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: InvestmentConceptRequest) =>
			await InvestmentConceptRepository.create(payload),
		onError: error => {
			console.error('Error', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
		},
	});
};

export default useCreateInvestmentConcept;
