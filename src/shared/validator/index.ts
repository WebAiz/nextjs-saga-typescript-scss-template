import SimpleReactValidator from 'simple-react-validator';
import lang from "../locale";

SimpleReactValidator.addLocale('ru', lang);

export const validator = () =>  new SimpleReactValidator({
    locale: 'ru',
    validators: {
        password: {  // name the rule
            message: ':attribute  должен быть минимум 8 символов, 1 заглавная буква, 1 спец. символ',
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(val,/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i) && params.indexOf(val) === -1
            },
            messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),
            required: true  // optional
        }
    }
});
