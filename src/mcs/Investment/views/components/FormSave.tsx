import { useEffect, type JSX } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type InvestmentRequest } from '../../domain';
import { Link } from 'react-router-dom';
import useFindByIdInvestment from '../../application/hooks/useFindByIdInvestment';

interface FormSaveProps {
	id?: number;
	pageTitle: string;
	onSave: (payload: InvestmentRequest) => void;
}

const FormSave = ({ id, pageTitle, onSave }: FormSaveProps): JSX.Element => {
	// Attibutes

	const formik = useFormik<InvestmentRequest>({
		initialValues: {
			amountInvested: 0,
			year: 0,
			description: '',
			miningConcessionId: 0,
			investmentTypeId: 0,
			currencyTypeId: 0,
			periodTypeId: 0,
			measureUnitId: 0,
			monthName: '',
			monthId: 0,
			accreditationCode: '',
			accountantCode: '',
			holderId: 0,
			declaredTypeId: 0,
			documentId: 0,
			investmentConceptId: 0,
			module: false,
			frecuency: 0,
			isDAC: 0,
			metricTons: '',
			declarationDate: '',
		},
		validationSchema: Yup.object({
			description: Yup.string().required(),
			// year: Yup.number().required(),
			// monthname: Yup.string().required(),
			// miningconcessionid: Yup.number(),
			// investmenttypeid: Yup.number(),
			// periodtypeid: Yup.number(),
			// measureunitid: Yup.number(),
			// holderid: Yup.number(),
			// investmentconceptid: Yup.number(),
		}),
		onSubmit: values => {
			console.log('save investment values', values);

			onSave(values);
		},
	});

	// React Query
	const { data: Investment } = useFindByIdInvestment(id);

	// Hooks
	useEffect(() => {
		if (Investment != null) {
			void formik.setValues({
				...Investment,
			});
		}
	}, [Investment]);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>MC</Breadcrumb.Item>
				<Breadcrumb.Item>Inversiones</Breadcrumb.Item>
				<Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-secondary" to="/investment">
						Atras
					</Link>
				</li>
			</Breadcrumb>
			<Row>
				<Col xs={12} sm={10} md={8} lg={8} xl={6}>
					<Card>
						<Card.Header>Registro de Inversiones</Card.Header>
						<Card.Body>
							<Form className="d-grid gap-3" onSubmit={formik.handleSubmit}>
								<Form.Group>
									<Form.Label>Monto de la inversión</Form.Label>
									<Form.Control
										type="text"
										name="amountInvested"
										value={formik.values.amountInvested}
										onChange={formik.handleChange}
									/>
									{(formik.touched.amountInvested ?? false) &&
										formik.errors.amountInvested != null && (
											<small className="text-danger">{formik.errors.amountInvested}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Año</Form.Label>
									<Form.Control
										type="number"
										name="year"
										value={formik.values.year}
										onChange={formik.handleChange}
									/>
									{(formik.touched.year ?? false) && formik.errors.year != null && (
										<small className="text-danger">{formik.errors.year}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Description</Form.Label>
									<Form.Control
										type="text"
										name="description"
										value={formik.values.description}
										onChange={formik.handleChange}
									/>
									{(formik.touched.miningConcessionId ?? false) &&
										formik.errors.miningConcessionId != null && (
											<small className="text-danger">{formik.errors.miningConcessionId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Mining Concession Id</Form.Label>
									<Form.Control
										type="text"
										name="miningConcessionId"
										value={formik.values.miningConcessionId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.miningConcessionId ?? false) &&
										formik.errors.miningConcessionId != null && (
											<small className="text-danger">{formik.errors.miningConcessionId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Investment Type Id</Form.Label>
									<Form.Control
										type="text"
										name="investmentTypeId"
										value={formik.values.investmentTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.investmentTypeId ?? false) &&
										formik.errors.investmentTypeId != null && (
											<small className="text-danger">{formik.errors.investmentTypeId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Currency Type Id</Form.Label>
									<Form.Control
										type="text"
										name="currencyTypeId"
										value={formik.values.currencyTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.currencyTypeId ?? false) &&
										formik.errors.currencyTypeId != null && (
											<small className="text-danger">{formik.errors.currencyTypeId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Period Type Id</Form.Label>
									<Form.Control
										type="text"
										name="periodTypeId"
										value={formik.values.periodTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.periodTypeId ?? false) && formik.errors.periodTypeId != null && (
										<small className="text-danger">{formik.errors.periodTypeId}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Measure Unit Id</Form.Label>
									<Form.Control
										type="text"
										name="measureUnitId"
										value={formik.values.measureUnitId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.measureUnitId ?? false) &&
										formik.errors.measureUnitId != null && (
											<small className="text-danger">{formik.errors.measureUnitId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Month Name</Form.Label>
									<Form.Control
										type="text"
										name="monthName"
										value={formik.values.monthName}
										onChange={formik.handleChange}
									/>
									{(formik.touched.monthName ?? false) && formik.errors.monthName != null && (
										<small className="text-danger">{formik.errors.monthName}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Month Id</Form.Label>
									<Form.Control
										type="text"
										name="monthId"
										value={formik.values.monthId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.monthId ?? false) && formik.errors.monthId != null && (
										<small className="text-danger">{formik.errors.monthId}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Accreditation Code</Form.Label>
									<Form.Control
										type="text"
										name="accreditationCode"
										value={formik.values.accreditationCode}
										onChange={formik.handleChange}
									/>
									{(formik.touched.accreditationCode ?? false) &&
										formik.errors.accreditationCode != null && (
											<small className="text-danger">{formik.errors.accreditationCode}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Accountant Code</Form.Label>
									<Form.Control
										type="text"
										name="accountantCode"
										value={formik.values.accountantCode}
										onChange={formik.handleChange}
									/>
									{(formik.touched.accountantCode ?? false) &&
										formik.errors.accountantCode != null && (
											<small className="text-danger">{formik.errors.accountantCode}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Holder Id</Form.Label>
									<Form.Control
										type="text"
										name="holderId"
										value={formik.values.holderId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.holderId ?? false) && formik.errors.holderId != null && (
										<small className="text-danger">{formik.errors.holderId}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Declared Type Id</Form.Label>
									<Form.Control
										type="text"
										name="declaredTypeId"
										value={formik.values.declaredTypeId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.declaredTypeId ?? false) &&
										formik.errors.declaredTypeId != null && (
											<small className="text-danger">{formik.errors.declaredTypeId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Document Id</Form.Label>
									<Form.Control
										type="text"
										name="documentId"
										value={formik.values.documentId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.documentId ?? false) && formik.errors.documentId != null && (
										<small className="text-danger">{formik.errors.documentId}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Investment Concept Id</Form.Label>
									<Form.Control
										type="text"
										name="investmentConceptId"
										value={formik.values.investmentConceptId}
										onChange={formik.handleChange}
									/>
									{(formik.touched.investmentConceptId ?? false) &&
										formik.errors.investmentConceptId != null && (
											<small className="text-danger">{formik.errors.investmentConceptId}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>frecuency</Form.Label>
									<Form.Control
										type="text"
										name="frecuency"
										value={formik.values.frecuency}
										onChange={formik.handleChange}
									/>
									{(formik.touched.frecuency ?? false) && formik.errors.frecuency != null && (
										<small className="text-danger">{formik.errors.frecuency}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>isDAC</Form.Label>
									<Form.Control
										type="text"
										name="isDAC"
										value={formik.values.isDAC}
										onChange={formik.handleChange}
									/>
									{(formik.touched.isDAC ?? false) && formik.errors.isDAC != null && (
										<small className="text-danger">{formik.errors.isDAC}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>metricTons</Form.Label>
									<Form.Control
										type="text"
										name="metricTons"
										value={formik.values.metricTons}
										onChange={formik.handleChange}
									/>
									{(formik.touched.metricTons ?? false) && formik.errors.metricTons != null && (
										<small className="text-danger">{formik.errors.metricTons}</small>
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
