import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import { InvestmentConceptRepository } from '../../infraestructure';
import { type InvestmentConceptResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';

const index = (): JSX.Element => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [mineralTypes, mineralTypesSet] = useState<InvestmentConceptResponse[]>([]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		void loadMineralTypes();
	}, []);

	const loadMineralTypes = async (): Promise<void> => {
		const response = await InvestmentConceptRepository.findAll();

		mineralTypesSet(response.data);
		console.log('response: ', response);
	};

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado Investment Types</Card.Header>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Nombre</th>
										<th>Descripcion</th>
										<th>Estado</th>
									</tr>
								</thead>
								<tbody>
									{mineralTypes.length > 0 &&
										mineralTypes.map(mineralType => (
											<tr key={mineralType.id}>
												<td>{mineralType.id}</td>
												<td>{mineralType.name}</td>
												<td>{mineralType.description}</td>
												<td>
													<Badge pill bg={mineralType.state ? 'success' : 'danger'}>
														{mineralType.state ? 'Activo' : 'Elminado'}
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
