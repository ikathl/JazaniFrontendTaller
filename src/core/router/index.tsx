import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { PrivateOutlet, PublicOutlet } from '@/core/router/CheckPageNavigator';

import Admin from '@/core/layouts/Admin';
import Home from '@/home';
import InvestmentConceptSearch from '@/mcs/InvestmentConcept/views/searchs';
import InvestmentSearch from '@/mcs/Investment/views/searchs';
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
				path: '/investment',
				element: <InvestmentSearch />,
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
