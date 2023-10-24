import { type JSX } from 'react';
import { type InvestmentRequest } from '../../domain';
import FormSave from '../components/FormSave';
import { useNavigate, useParams } from 'react-router-dom';
import useEditInvestment from '../../application/hooks/useEditInvestment';

const index = (): JSX.Element => {
	// atributtes
	const { id } = useParams();
	const navigate = useNavigate();

	// react query
	const { mutateAsync } = useEditInvestment();

	// Methods
	const editInvestment = async (payload: InvestmentRequest): Promise<void> => {
		try {
			await mutateAsync({ payload, id: Number(id) });
			navigate('/investment');
		} catch (error) {
			console.log('Error Edit:', error);
		}
	};
	return (
		<FormSave
			id={Number(id)}
			pageTitle="Editar"
			onSave={payload => {
				void editInvestment(payload);
			}}
		/>
	);
};

export default index;
