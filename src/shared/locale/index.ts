import ru from "./ru";
import en from "./en";

const getCurrentLanguage = (langCode = 'ru') => {
    switch (langCode) {
        case 'en': {
            return en;
        }
        default :
            return ru;
    }
};

const lang = getCurrentLanguage();

export default lang;
