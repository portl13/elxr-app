import React from 'react'
import Layout from '../components/layout/Layout';
import { css } from '@emotion/core'

const PORTLValues = css`
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    text-align: center;
    .value-img{
        max-width: 700px;
        display: block;
        margin: auto;
    }
    hr{
        background-color: var(--primary-color);
    }
`

const PORTLValues = () => {
    return (
        <Layout>
            <div css={PORTLValues}>
                <div>
                    <img className="value-img" src="/img/values2.png" />
                </div>
                <p>
                    In a time where creative content has been de-valued by hyper-extractive technology platforms - and user data and has been abused for profit, PORTL represents a major disruption of the status quo.
                </p>
                <hr />
                <p>
                    Our promise to our community is that those who create value on our platform will get a fair share; and the communities our creatives build can trust that we will respect and protect our members data sovereignty.In a time where creative content has been de-valued by hyper-extractive technology platforms - and user data and has been abused for profit, PORTL represents a major disruption of the status quo.
                </p>
                <p>
                    Our promise to our community is that those who create value on our platform will get a fair share; and the communities our creatives build can trust that we will respect and protect our members data sovereignty.
                </p>
            </div>
        </Layout>
    )
}

export default PORTLValues
