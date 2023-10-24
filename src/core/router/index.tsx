import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { PrivateOutlet, PublicOutlet } from '@/core/router/CheckPageNavigator';

import Admin from '@/core/layouts/Admin';
import Home from '@/home';
import InvestmentConceptSearch from '@/mcs/InvestmentConcept/views/searchs';
import InvestmentConceptCreate from '@/mcs/InvestmentConcept/views/create';
import InvestmentConceptEdit from '@/mcs/InvestmentConcept/views/edit';
import InvestmentSearch from '@/mcs/Investment/views/searchs';
import InvestmentCreate from '@/mcs/Investment/views/create';
import InvestmentEdit from '@/mcs/Investment/views/edit';
// Auth
import Auth from '@/core/layouts/Auth';
import Login from '@/auth/login/views';

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<PrivateOutlet>
				<Admin />
			</PrivateOutlet>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/investment-concept',
				element: <InvestmentConceptSearch />,
			},
			{
				path: '/investment-concept/create',
				element: <InvestmentConceptCreate />,
			},
			{
				path: '/investment-concept/edit/:id',
				element: <InvestmentConceptEdit />,
			},
			{
				path: '/investment',
				element: <InvestmentSearch />,
			},
			{
				path: '/investment/create',
				element: <InvestmentCreate />,
			},
			{
				path: '/investment/edit/:id',
				element: <InvestmentEdit />,
			},
		],
	},
	{
		path: '/login',
		element: (
			<PublicOutlet>
				<Auth />
			</PublicOutlet>
		),
		children: [
			{
				index: true,
				element: <Login />,
			},
		],
	},
];

export default createBrowserRouter(routes);
