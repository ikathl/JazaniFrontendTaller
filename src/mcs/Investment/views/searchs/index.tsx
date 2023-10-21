import { useState } from 'react';

import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import { usePaginateSearchInvestment } from '@/mcs/Investment/application/hooks/usePaginateSearchInvestment';
import { useFormik } from 'formik';

// import { TableSimple } from '@/core/components/table';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';

const index = (): JSX.Element => {
	// const [Investment, InvestmentSet] = useState<InvestmentResponse[]>([]);

	const [investmentFilter, setInvestmentFilter] = useState<RequestPagination<InvestmentFilter>>({
		page: 1,
		perPage: 10,
	});
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
	const { data: investmentPaginated, isFetching } = usePaginateSearchInvestment(investmentFilter);

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
