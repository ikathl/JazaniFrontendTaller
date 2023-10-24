import { type JSX } from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Badge from 'react-bootstrap/Badge';
// import { Card } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// import Breadcrumb from 'react-bootstrap/Breadcrumb';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { type InvestmentConceptRequest } from '../../domain';
import useCreateInvestmentConcept from '../../application/hooks/useCreateInvestmentConcept';
// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormSave from '../components/FormSave';

const index = (): JSX.Element => {
	// Attibutes
	const navigate = useNavigate();

	// const formik = useFormik<InvestmentConceptRequest>({
	// 	initialValues: {
	// 		name: '',
	// 		description: '',
	// 		slug: '',
	// 	},
	// 	validationSchema: Yup.object({
	// 		name: Yup.string().required(),
	// 	}),
	// 	onSubmit: values => {
	// 		console.log('values', values);

	// 		void createInvestmentConcept(values);
	// 	},
	// });

	// React Query
	const { mutateAsync } = useCreateInvestmentConcept();

	// Methods
	const createInvestmentConcept = async (payload: InvestmentConceptRequest): Promise<void> => {
		try {
			await mutateAsync(payload);
			navigate('/investment-concept');
		} catch (error) {
			console.log('Error creare', error);
		}
	};

	return (
		<>
			<FormSave
				pageTitle="Registrar"
				onSave={payload => {
					void createInvestmentConcept(payload);
				}}
			/>
		</>
	);
};

export default index;
