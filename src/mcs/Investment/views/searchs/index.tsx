import { useState } from 'react';
import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import usePaginatedSearchInvestment from '../../application/hooks/usePaginateSearchInvestment';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';

const index = (): JSX.Element => {
	// const [Investment, InvestmentSet] = useState<InvestmentResponse[]>([]);
	// reacciona a camnios de estad useState
	const [investmentFilter, setInvestmentFilter] = useState<RequestPagination<InvestmentFilter>>({
		page: 1,
		perPage: 10,
	});

	const formik = useFormik<InvestmentFilter>({
		initialValues: {
			amountInvested: 0,
			description: '',
			monthName: '',
			accreditationCode: '',
			id: 0,
			year: 0,
			miningConcessionId: 0,
			investmentTypeId: 0,
			currencyTypeId: 0,
			periodTypeId: 0,
			measureUnitId: 0,
			registrationDate: '',
			state: false,
			monthId: 0,
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
		onSubmit: values => {
			console.log('data', values);

			setInvestmentFilter(prev => {
				return {
					...prev,
					filter: {
						amountInvested: values.amountInvested,
						description: values.description,
						monthName: values.monthName,
						accreditationCode: values.accreditationCode,
						id: values.id,
						year: values.year,
						miningConcessionId: values.miningConcessionId,
						investmentTypeId: values.investmentConceptId,
						currencyTypeId: values.currencyTypeId,
						periodTypeId: values.periodTypeId,
						measureUnitId: values.measureUnitId,
						registrationDate: values.registrationDate,
						state: values.state,
						monthId: values.monthId,
						accountantCode: values.accountantCode,
						holderId: values.holderId,
						declaredTypeId: values.declaredTypeId,
						documentId: values.documentId,
						investmentConceptId: values.investmentConceptId,
						module: values.module,
						frecuency: values.frecuency,
						isDAC: values.isDAC,
						metricTons: values.metricTons,
						declarationDate: values.declarationDate,
					},
				};
			});
		},
	});
	// React Query
	// tranformar esta petición a hook usando react query

	// useEffect(() => {
	// 	void loadInvestment();
	// }, []);

	// const loadInvestment = async (): Promise<void> => {
	// 	// const response = await InvestmentRepository.findAll();
	// 	const response = await InvestmentRepository.paginatedSearch(investmentFilter);
	// 	InvestmentSet(response.data);
	// 	console.log('response.filter: ', response);
	// };

	// react query
	const { data: investmentPaginated, isFetching } = usePaginatedSearchInvestment(investmentFilter);

	// react table
	const columnHelper = createColumnHelper<InvestmentResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('amountInvested', {
			header: 'AmountInvestment',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('description', {
			header: 'Description',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('year', {
			header: 'Year',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('holder', {
			header: 'Holder',
			cell: info => info.getValue().name,
		}),
		columnHelper.accessor('miningConcession', {
			header: 'Mining Concession',
			cell: info => info.getValue().name,
		}),
		columnHelper.accessor('investmentType', {
			header: 'Investment Type',
			cell: info => info.getValue().name,
		}),
		columnHelper.accessor('declarationDate', {
			header: 'Declaration Date',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('state', {
			header: 'State',
			cell: ({ row }) => (
				<div className="text-center">
					<Badge pill bg={row.original.state ? 'success' : 'danger'}>
						{row.original.state ? 'Activo' : 'Elminado'}
					</Badge>
				</div>
			),
		}),
	];

	// const table = useReactTable<InvestmentResponse>({
	// 	data: investmentPaginated?.data ?? [],
	// 	columns,
	// 	getCoreRowModel: getCoreRowModel(),
	// });

	// methods
	const goToPage = (payload: FilterPage): void => {
		setInvestmentFilter(prev => {
			return {
				...prev,
				page: payload.page,
				perPage: payload.perPage,
			};
		});
	};

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Busqueda</Card.Header>
						<Card.Body>
							<Row>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>AmountInvested</Form.Label>
										<Form.Control
											type="number"
											name="amountInvested"
											value={formik.values.amountInvested}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
								<Col xl={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Description</Form.Label>
										<Form.Control
											type="text"
											name="description"
											value={formik.values.description}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
								<Col xl={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>AccreditationCode</Form.Label>
										<Form.Control
											type="text"
											name="accreditationCode"
											value={formik.values.accreditationCode}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Card.Body>
						<Card.Footer className="d-flex justify-content-end">
							<Button type="button" variant="primary" onClick={() => formik.handleSubmit}>
								Buscar
							</Button>
							{''}
							<Button type="button" variant="secondary">
								Limpiar
							</Button>
						</Card.Footer>
						<Card.Header>Investment List</Card.Header>
						<Card.Body>
							{/* <TableSimple<InvestmentResponse>
								columns={columns}
								data={investmentPaginated?.data ?? []}
							/> */}
							<TablePaginated<InvestmentResponse>
								columns={columns}
								data={investmentPaginated}
								goToPage={goToPage}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
