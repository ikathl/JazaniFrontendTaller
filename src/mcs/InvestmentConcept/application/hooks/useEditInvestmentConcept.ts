import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentConceptResponse, type InvestmentConceptRequest } from '../../domain';
import { InvestmentConceptRepository } from '../../infraestructure';
import { FIND_BY_ID, PAGINATED_SEARCH } from '../QueryKeys';

interface EditInvestmentConceptProps {
	payload: InvestmentConceptRequest;
	id: number;
}

const useEditInvestmentConcept = (): UseMutationResult<
	InvestmentConceptResponse,
	Error,
	EditInvestmentConceptProps
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: EditInvestmentConceptProps) =>
			await InvestmentConceptRepository.edit(params.payload, params.id),
		onError: error => {
			console.error('Edit', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
			void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
		},
	});
};

export default useEditInvestmentConcept;
