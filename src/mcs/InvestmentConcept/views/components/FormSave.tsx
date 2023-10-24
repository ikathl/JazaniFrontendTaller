import { useEffect, type JSX } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type InvestmentConceptRequest } from '../../domain';
import { Link } from 'react-router-dom';
import useFindByIdInvestmentConcept from '../../application/hooks/useFindByIdInvestmentConcept';

interface FormSaveProps {
	id?: number;
	pageTitle: string;
	onSave: (payload: InvestmentConceptRequest) => void;
}

const FormSave = ({ id, pageTitle, onSave }: FormSaveProps): JSX.Element => {
	// Attibutes

	const formik = useFormik<InvestmentConceptRequest>({
		initialValues: {
			name: '',
			description: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
		}),
		onSubmit: values => {
			console.log('data', values);

			onSave(values);
		},
	});

	// React Query
	const { data: InvestmentConcept } = useFindByIdInvestmentConcept(id);

	// Hooks
	useEffect(() => {
		if (InvestmentConcept != null) {
			void formik.setValues({
				...InvestmentConcept,
			});
		}
	}, [InvestmentConcept]);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item>InvestmentConcept</Breadcrumb.Item>
				<Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-secondary" to="/mineral-types">
						Atrás
					</Link>
				</li>
			</Breadcrumb>
			<Row>
				<Col xs={12} sm={10} md={8} lg={8} xl={6}>
					<Card>
						<Card.Header>Registro de Investment Concept</Card.Header>
						<Card.Body>
							<Form className="d-grid gap-3" onSubmit={formik.handleSubmit}>
								<Form.Group>
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										type="text"
										name="name"
										value={formik.values.name}
										onChange={formik.handleChange}
									/>
									{(formik.touched.name ?? false) && formik.errors.name != null && (
										<small className="text-danger">{formik.errors.name}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Descripcion</Form.Label>
									<Form.Control
										type="text"
										name="description"
										value={formik.values.description}
										onChange={formik.handleChange}
									/>
									{(formik.touched.description ?? false) && formik.errors.description != null && (
										<small className="text-danger">{formik.errors.description}</small>
									)}
								</Form.Group>
								<hr />
								<div className="d-flex justify-content-end">
									<Button type="submit" variant="primary" className="me-2">
										Guardar
									</Button>
									<Button type="button" variant="secondary" onClick={formik.handleReset}>
										Limpiar
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default FormSave;
