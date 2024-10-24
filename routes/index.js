import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import Auth from '~/routes/auth';
import Dashboard from '~/scenes/Dashboard';
import Errors from './errors';
import Report from '~/scenes/Report/routers';
import Config from '~/scenes/Config/routers';

export default [
    {
        key: 'dashboard',
        name: 'Dashboard',
        component: () => <Dashboard />,
        // component: () => <Redirect exact to='/dashboard' />,
        path: '/',
        hide: true,
        icon: <FontAwesomeIcon icon={faTachometerAlt} />,
        template: 'main',
    },
    ...Report,
    ...Config,
    ...Auth,
    ...Errors,
];
