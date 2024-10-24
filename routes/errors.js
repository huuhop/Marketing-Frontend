import React from 'react';
import { Redirect } from 'react-router-dom'
import NotFound from '~/scenes/Errors/scenes/NotFound'
import Forbidden from '~/scenes/Errors/scenes/Forbidden'
import InternalServerError from '~/scenes/Errors/scenes/InternalServerError'

export default [
    {   
        key: 'errors',
        name: 'Lỗi',
        component: ()=><Redirect exact to='/errors/404' /> ,
        path: '/errors',
        hide: true,
        children: [
            {
                key: 'errors.404',
                name: '404',
                component: NotFound,
                path: '/errors/404',
                hide: true,
                template: 'main'
            },
            {
                key: 'errors.403',
                name: '403',
                component: Forbidden,
                path: '/errors/403',
                hide: true,
                template: 'main'
            },
            {
                key: 'errors.500',
                name: '500',
                component: InternalServerError,
                path: '/errors/500',
                hide: true,
                template: 'main'
            }
        ]
    }
]