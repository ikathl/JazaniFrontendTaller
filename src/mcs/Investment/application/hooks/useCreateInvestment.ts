import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentResponse, type InvestmentRequest } from '../../domain';
import { InvestmentRepository } from '../../infraestructure';
import { FIND_BY_ID, PAGINATE_SEARCH } from './QueryKeys';

const useCreateInvestment = (): UseMutationResult<InvestmentResponse, Error, InvestmentRequest> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: InvestmentRequest) => await InvestmentRepository.create(payload),
		onError: error => {
			console.error('Error', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATE_SEARCH] });
			void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
		},
	});
};

export default useCreateInvestment;
