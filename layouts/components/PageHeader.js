import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'antd';

const PageHeaderTitle = ({ title, subTitle, children, buttons=[] }) => {
    return (
        <PageHeader
            // style={{padding: '0 0 16px 0'}}
            // ghost={false}
            // onBack={() => window.history.back()}
            title={title}
            subTitle={subTitle}
            extra={buttons}
            >
            {children}
        </PageHeader>
    )
}

PageHeaderTitle.propTypes = {
    buttons: PropTypes.array
}

export default PageHeaderTitle
