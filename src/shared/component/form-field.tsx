import React from "react";

export interface FormField {
	type: string | undefined;
	isValid: boolean;
	placeholder: string;
	value: string | number | readonly string[] | undefined;
	changeHandler: (arg1: string, arg2: string) => void;
	disabled: boolean;
	label: string;
	isRequired: boolean;
	errorText: string;
	field: string;

	icon?: string;
	className?: string;
	id?: string;
	name?: string;
	toggleType?: () => void;
}

const FormField: React.FC<FormField> = ({ type, isValid, className, placeholder, value, changeHandler, field, disabled, label, isRequired, errorText, toggleType, id, name, icon }: FormField) => {
	const typeOfInput = typeof type === "boolean" ? (type ? "password" : "text") : type;

	return (
		<div className={`form-field ${className ? className : ""}`}>
			{/* NOTE: for phone field */}
			{field === "phone" && <span className="phone-label">+7</span>}
			{label && (
				<div className={`label${isValid ? " err" : ""}`}>
					{isRequired && <span>* </span>}
					<span>{label}</span>
				</div>
			)}
			<input
				placeholder={placeholder}
				className={`input-item ${className ? className : ""} ${!isValid ? "error" : ""} ${field === "phone" ? "phone" : ""}`}
				onChange={(e) => changeHandler(e.target.value, field)}
				value={value}
				type={typeOfInput}
				disabled={disabled}
				id={id}
				name={name}
				// ref={changeRef ? (input) => changeRef(fieldRef, input) : null}
			/>
			{errorText && !isValid && <div className={`form-field__err ${label ? "with_label" : ""}`}>{errorText}</div>}

			{/* NOTE: you can add icon after input field */}
			{icon && <span className={`common-input__icon icon-${icon}`} />}

			{/* NOTE: ONLY FOR PASSWORD FIELDS ---START---*/}
			{typeof type === "boolean" && (
				<button onClick={toggleType} className="common-input__btn">
					<span className={`icon-${typeOfInput === "password" ? "eye" : "eye-fill"}`} />
				</button>
			)}
			{/* ONLY FOR PASSWORD FIELDS ---END---*/}
		</div>
	);
};

export default FormField;
