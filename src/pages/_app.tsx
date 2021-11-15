import { AppProps }                         from "next/app";
import { NextPage }                         from "next";
import { wrapper, SagaStore }               from "@/store/index";
import App, { AppContext, AppInitialProps } from "next/app";
import React                                from "react";
import "../assets/styles/index.scss";
import { END }                              from "redux-saga";
import ThemeButton                          from "@/src/app/components/theme-button";

// import ThemeButton  from "@/src/app/components/theme-button";

class WrappedApp extends App<AppInitialProps> {
    public static getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}: AppContext) => {
        // 1. Wait for all page actions to dispatch
        const pageProps = {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
        };

        // 2. Stop the saga if on server
        if (ctx.req) {
            console.log("Saga is executing on server, we will wait");
            store.dispatch(END);
            await (store as SagaStore).sagaTask.toPromise();
        }

        // 3. Return props
        return {
            pageProps,
        };
    });

    public render() {
        const {Component, pageProps} = this.props;
        return (
            <div className="theme-provider">
                <ThemeButton/>
                <Component {...pageProps} />
            </div>
        )
    }
}

export default wrapper.withRedux(WrappedApp);
