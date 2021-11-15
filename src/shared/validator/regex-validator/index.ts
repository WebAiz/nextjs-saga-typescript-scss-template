export const PASSWORD_REG = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const BIN_REG = /^(\d{12})$/;

export type REGEX = Record<string, RegExp>;

export const REGS: REGEX = {
    companyName: /^.{2,250}$/,
    legalName: /^.{2,250}$/,
    legalType: /[\s\S]+/,
    headFullName: /^[A-Za-zА-Яа-яәғқңөұүhіӘҒҚҢӨҰҮҺІ ]{4,}$/,
    mkoName: /^[A-Za-zА-Яа-яәғқңөұүhіӘҒҚҢӨҰҮҺІ "'`]{4,}$/,
    headFirstName: /^[A-Za-zА-Яа-яәғқңөұүhіӘҒҚҢӨҰҮҺІ ]{2,}$/,
    headLastName: /^[A-Za-zА-Яа-яәғқңөұүhіӘҒҚҢӨҰҮҺІ ]{2,}$/,
    headSurName: /^[A-Za-zА-Яа-яәғқңөұүhіӘҒҚҢӨҰҮҺІ ]{0,}$/,
    staticPhone: /^[0-9]{10}$/,
    headPhone: /^[0-9]{10}$/,
    responsePhone: /^[0-9]{10}$/,
    responseFullName: /^[A-Za-zА-Яа-яәғқңөұүhіӘҒҚҢӨҰҮҺІ ]{4,}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    addresses: /^.{4,}$/,
    cities: /[\s\S]+/,
    provinces: /[\s\S]+/,
    places: /[\s\S]+/,
    prices: /^[+-]?([0-9]+([0-9]*)?)$/,
    minOrderAmount: /^[+-]?([0-9]+([0-9]*)?)$/,
    deliveryDays: /^(?:[1-9]\d*|0)$/,
    workTime: /^.{4,}$/,
    shopTextInputs: /^.{2,250}$/,
    shopDescription: /^.{2,600}$/,
    supportDesc: /^.{5,250}$/,
    sms: /^\d{4}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};
