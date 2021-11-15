import React, { useState } from "react";
import { REGEX, REGS } from "../validator/regex-validator";
import FormField from "./form-field";

const formFieldData = {
	type: "text",
	placeholder: "Password",
	disabled: false,
	isRequired: true,
};

const Form: React.FC = () => {
	const [input, setInputValue] = useState({
		password: {
			value: "",
			errorText: "Wrong Password",
			label: "Password",
			field: "password",
		},
		login: {
			value: "",
			errorText: "Wrong Login",
			label: "Login",
			field: "login",
		},
	});
	const [isValid, setIsValid] = useState(false);
	const changeHandler = (value: string, field: string) => {
		setInputValue({
			...input,
			[field]: {
				value: value,
			},
		});
		setIsValid(REGS[field as keyof REGEX].test(value));
	};
	return (
		<div className="form">
			<FormField {...formFieldData} value={input.password.value} isValid={isValid} errorText={input.password.errorText} field={"password"} label={input.password.label} changeHandler={changeHandler} />
		</div>
	);
};

export default Form;
