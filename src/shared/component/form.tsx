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
		//TODO apply condition for phone
		// if (field === "phone") {
		// 	if (value.length > 10 || value[0] === "0") return;
		// 	if (phoneErrorTxt) clearUserPhoneExistErrorAction();
		// 	if (value.length === 10) {
		// 		if (!phoneErrorTxt)
		// 			signUpUserPhoneExistAction({ phone: +value });
		// 	}
		// }

        // TODO btter apply lodash library
        setInputValue({
            ...input,
            [field]: { ...input.password,
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
