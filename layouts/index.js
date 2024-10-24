import React, { Component, Suspense } from 'react';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import MainLayout from './MainLayout'
import AuthLayout from './AuthLayout'
import PrintLayout from './PrintLayout'

const query = {
    'screen_xs': {
      maxWidth: 575,
    },
    'screen_sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'is_mobile': {
      maxWidth: 767,
    },
    'screen_md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen_lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen_xl': {
      minWidth: 1200,
      maxWidth: 1599,
    },
    'screen_break_menu': {
      maxWidth: 1270,
    },
    'screen_xxl': {
      minWidth: 1600,
    },
};
class index extends Component {
    render() {
        const { template, children, ...props } = this.props
        
        const getTemplate =(screens)=>{
            switch(template){
                case 'auth':
                    return <AuthLayout {...props}>
                        {children}
                    </AuthLayout>
                case 'print':
                  return <PrintLayout {...props}>
                      {children}
                  </PrintLayout>
                case 'blank':
                    return children
                default:
                  return <MainLayout screens={screens} {...props}>
                    {children}
                  </MainLayout>
            }
        }

        return (
            <div style={{ width: '100%', overflowX: 'hidden' }}>
                <ContainerQuery query={query}>
                    {params => (
                        <div className={classNames(params)}>
                            {getTemplate(params)}
                        </div>
                    )}
                </ContainerQuery>
                {/* <Suspense fallback={<h1>Loading</h1>}></Suspense> */}
            </div>
        )
    }
}

export default index;