import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Admin from '../layouts/Admin';
import Home from '../../home';
import InvestmentConceptSearch from '../../mcs/InvestmentConcept/views/searchs';
// import MineralSearch from '../../generals/minerals/views/searchs';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Admin />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/investent-concept',
				element: <InvestmentConceptSearch />,
			},
			// ,
			// {
			// 	path: '/minerals',
			// 	element: <MineralSearch />,
			// },
		],
	},
];

export default createBrowserRouter(routes);
