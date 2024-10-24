import React from 'react';
import { Redirect } from 'react-router-dom'
import Login from '~/scenes/Auth';

export default [
     {   
        key: 'auth',
        name: 'Auth',
        component: ()=><Redirect exact to='/auth/login' /> ,
        path: '/auth',
        hide: true,
        template: 'auth',  
        children: [
            {
                key: 'auth.login',
                name: 'Login',
                component: Login,
                path: '/auth/login',
                hide: true,
                is_public: true,
                template: 'auth',  
            },
        ]
    }
]