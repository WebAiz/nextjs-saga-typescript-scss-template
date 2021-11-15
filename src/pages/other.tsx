import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import { wrapper } from "@/store/index";
import { startClockAction, tickClockAction } from "@/store/actions/example";
import Link from "next/link";
import Clock from "@/src/app/components/clock";
import Counter from "@/src/app/components/counter";
import { createSelector } from "reselect";
import { State } from "@/store/reducers";
import Form from "../shared/component/form";

const selectData = createSelector(
	(state: State) => state.exampleReducer.error,
	(state) => state.exampleReducer.lastUpdate,
	(state) => state.exampleReducer.light,
	(state) => state.exampleReducer.placeholderData,
	(error, lastUpdate, light, placeholderData) => ({ error, lastUpdate, light, placeholderData })
);
const Other: NextPage = () => {
	const dispatch = useDispatch();
	const { error, lastUpdate, light, placeholderData } = useSelector(selectData);

	useEffect(() => {
		dispatch(startClockAction());
	});
	return (
		<div id="other">
			<h1>React Redux Saga Template with TypeScript and SASS</h1>
			<Clock lastUpdate={lastUpdate} light={light} />
			<Counter />
			<nav>
				<Link href="/">Go to Main page</Link>
			</nav>
			<Form />
		</div>
	);
};


Other.getInitialProps = async ({store}) => {
	store.dispatch(tickClockAction(false));
};
export default Other;
