import { useState } from 'react';
import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useFormik } from 'formik';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import usePaginatedSearchInvestment from '../../application/hooks/usePaginateSearchInvestment';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useRemoveInvestment from '../../application/hooks/useRemoveInvestment';

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
			accreditationCode: '',
		},
		onSubmit: values => {
			console.log('onsubmit data', values);

			setInvestmentFilter(prev => {
				return {
					...prev,
					filter: {
						amountInvested: values.amountInvested,
						description: values.description,
						accreditationCode: values.accreditationCode,
					},
				};
			});
		},
	});

	// react query
	const { data: investmentPaginated, isFetching } = usePaginatedSearchInvestment(investmentFilter);
	const { mutateAsync } = useRemoveInvestment();

	// react table
	const columnHelper = createColumnHelper<InvestmentResponse>();

	const columns = [
		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center">Acciones</span>,
			cell: ({ row }) => (
				<span className="d-flex align-items-center justify-content-center">
					<Link className="btn btn-primary btn-sm me-2" to={`/investment/edit/${row.original.id}`}>
						✎{' '}
					</Link>
					<Button
						type="button"
						variant="danger"
						className="me-2 btn-sm"
						onClick={() => {
							void removeById(row.original);
						}}
					>
						🗑{' '}
					</Button>
				</span>
			),
		}),
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
			cell: info => (info.getValue() == null ? '' : info.getValue().name),
		}),
		columnHelper.accessor('miningConcession', {
			header: 'Mining Concession',
			cell: info => (info.getValue() == null ? '' : info.getValue().name),
		}),
		columnHelper.accessor('investmentType', {
			header: 'Investment Type',
			cell: info => (info.getValue() == null ? '' : info.getValue().name),
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
	const removeById = async (payload: InvestmentResponse): Promise<void> => {
		const selectedOption = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		});

		if (selectedOption.isConfirmed) {
			await mutateAsync(payload.id);
		}
	};

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item active>Investment</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-success" to="/investment/create">
						Nuevo
					</Link>
				</li>
			</Breadcrumb>

			<Row>
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
							<Button
								type="button"
								variant="primary"
								className="me-2"
								onClick={() => {
									formik.handleSubmit();
								}}
							>
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
