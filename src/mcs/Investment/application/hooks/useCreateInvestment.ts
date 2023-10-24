import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentResponse, type InvestmentRequest } from '../../domain';
import { InvestmentRepository } from '../../infraestructure';
import { PAGINATE_SEARCH } from './QueryKeys';

const useCreateInvestment = (): UseMutationResult<InvestmentResponse, Error, InvestmentRequest> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: InvestmentRequest) => await InvestmentRepository.create(payload),
		onError: error => {
			console.error('Error', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATE_SEARCH] });
		},
	});
};

export default useCreateInvestment;
