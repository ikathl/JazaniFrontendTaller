import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { InvestmentConceptRepository } from '../../infraestructure';
import { type InvestmentConceptResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const index = (): JSX.Element => {
	const [investmentconcept, investmentConceptSet] = useState<InvestmentConceptResponse[]>([]);
	useEffect(() => {
		void loadinvestmentconcept();
	}, []);

	const loadinvestmentconcept = async (): Promise<void> => {
		const response = await InvestmentConceptRepository.findAll();

		investmentConceptSet(response);
		console.log('response: ', response);
	};

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item active>Investment Concept</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-success" to="/investment-concept/create">
						Nuevo
					</Link>
				</li>
			</Breadcrumb>

			<Row>
				<Col xs={12}>
					<Card className="mb-2">
						<Card.Header>Listado de Investment Concept</Card.Header>
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
									{investmentconcept.length > 0 &&
										investmentconcept.map(investment => (
											<tr key={investment.id}>
												<td>{investment.id}</td>
												<td>{investment.name}</td>
												<td>{investment.description}</td>
												<td>
													<Badge pill bg={investment.state ? 'success' : 'danger'}>
														{investment.state ? 'Activo' : 'Elminado'}
													</Badge>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
							;
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
