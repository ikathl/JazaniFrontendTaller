import { type JSX } from 'react';
import { type InvestmentConceptRequest } from '../../domain';
import FormSave from '../components/FormSave';
import { useNavigate, useParams } from 'react-router-dom';
import useEditInvestmentConcept from '../../application/hooks/useEditInvestmentConcept';

const index = (): JSX.Element => {
	// Atributes
	const { id } = useParams();
	const navigate = useNavigate();

	// React Query
	const { mutateAsync } = useEditInvestmentConcept();

	// Methods
	const editInvestmentConcept = async (payload: InvestmentConceptRequest): Promise<void> => {
		try {
			await mutateAsync({ payload, id: Number(id) });
			navigate('/investment-concept');
		} catch (error) {
			console.log('Error Edit:', error);
		}
	};
	return (
		<FormSave
			id={Number(id)}
			pageTitle="Editar"
			onSave={payload => {
				void editInvestmentConcept(payload);
			}}
		/>
	);
};

export default index;
