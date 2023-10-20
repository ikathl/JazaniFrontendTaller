import { useState } from 'react';
import Table from 'react-bootstrap/Table';

import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import { type RequestPagination } from '@/shared/domain';
import { usePaginateSearchInvestment } from '@/mcs/Investment/application/hooks/usePaginateSearchInvestment';

const index = (): JSX.Element => {
	const [Investment, InvestmentSet] = useState<InvestmentResponse[]>([]);

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
	const { data: investmentTypePaginated, isFetching } =
		usePaginateSearchInvestment(investmentFilter);

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado Investment</Card.Header>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Descripcion</th>
										<th>Año</th>
										<th>Holder</th>
										<th>Mining Consession</th>
										<th>Investment Type</th>
										<th>Estado</th>
									</tr>
								</thead>
								<tbody>
									{investmentTypePaginated?.data?.map(investment => (
										<tr key={investment.id}>
											<td>{investment.id}</td>
											<td>{investment.description}</td>
											<td>{investment.year}</td>
											<td>{investment.holder.name}</td>
											<td>{investment.miningConcession.name}</td>
											<td>{investment.investmentType.name}</td>
											<td>
												<Badge pill bg={investment.state ? 'success' : 'danger'}>
													{investment.state ? 'Activo' : 'Elminado'}
												</Badge>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
