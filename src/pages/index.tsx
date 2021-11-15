import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import { END } from "redux-saga";
import { wrapper } from "@/store/index";
import Link from "next/link";
import Image from 'next/image'

import { loadDataComplexAction, postExampleAction, startClockAction, tickClockAction } from "@/store/actions/example";
import Clock from "@/src/app/components/clock";
import { createSelector } from "reselect";
import { State } from "@/store/reducers";
import Counter from "@/src/app/components/counter";

const selectData = createSelector(
	(state: State) => state.exampleReducer.error,
	(state) => state.exampleReducer.lastUpdate,
	(state) => state.exampleReducer.light,
	(state) => state.exampleReducer.placeholderData,
	(error, lastUpdate, light, placeholderData) => ({ error, lastUpdate, light, placeholderData })
);

const HomePage: NextPage = () => {
	const dispatch = useDispatch();
	const { error, lastUpdate, light, placeholderData } = useSelector(selectData);

	useEffect(() => {
		dispatch(startClockAction());
	});

	return (
		<main id="home-page" className="container">
			<h1>React Redux Saga Template with TypeScript and SASS</h1>
			<Clock lastUpdate={lastUpdate} light={light} />
			<Counter />
			<nav>
				<Link href={"/other"}>
					<a>Navigate: Other Page</a>
				</Link>
			</nav>
			{placeholderData && (
				<pre>
					<code>{JSON.stringify(placeholderData, null, 2)}</code>
				</pre>
			)}
			{error && <p style={{ color: "red" }}>Error: {error.message}</p>}
		</main>
	);
};

HomePage.getInitialProps = async ({store}) => {
	store.dispatch(tickClockAction(false));
	const payload = {
		name: "name",
		num: 12,
		obj: {
			text: "text",
		},
	};
	store.dispatch(postExampleAction(payload));
	if (!store.getState().exampleReducer.placeholderData) {
		store.dispatch(loadDataComplexAction());
		store.dispatch(END);
	}
	await store.sagaTask?.toPromise();
};

export default HomePage;
