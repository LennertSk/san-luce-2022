import React from 'react';
import App from 'next/app';

import '../styles/app.scss';

class MyApp extends App {
    static async getInitialProps(appContext) {
        // calls page's `getInitialProps` and fills `appProps.pageProps`
        const appProps = await App.getInitialProps(appContext);

        return {...appProps};
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Component { ...pageProps } />
        );
    }
}

export default MyApp;
