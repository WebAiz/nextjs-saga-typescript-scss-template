import React, { useEffect } from "react";
import styles from './theme-button.module.scss';

// Theme Button which adds "data-theme" attribute to html tag, and switches between light and dark mode
const ThemeButton: React.FC = () => {
    useEffect(() => {
        const htmlElement = document.getElementsByTagName("html")[0].getAttribute("data-theme");
        if (!htmlElement) {
            document.getElementsByTagName("html")[0].setAttribute("data-theme", "light");
        }
    });
    const toggleTheme = () => {
        const themeMode = document.getElementsByTagName("html")[0].getAttribute("data-theme");
        if (themeMode === "light") {
            document.getElementsByTagName("html")[0].setAttribute("data-theme", "dark");
        } else {
            document.getElementsByTagName("html")[0].setAttribute("data-theme", "light");
        }
    };
    return (
        <div className={styles.container} onClick={toggleTheme}>
            Toggle Theme
        </div>
    );
};

export default ThemeButton;

// TODO: insert below css code into your global css file, to be able to access globally
// [data-theme = dark] {
//     //--color-primary: #17ed90;
//     //--color-secondary: #243133;
//     //--color-accent: #12cdea;
//
//     --font-color: #{$darkThemeFontColor};
//     --background-color: #{$darkThemeBackground};
// }
//
// [data-theme = light] {
//     //--color-primary: #0060df;
//     //--color-secondary: #fbfbfe;
//     //--color-accent: #fd6f53;
//
//     --font-color: #{$LightThemeFontColor};
//     --background-color: #{$lightThemeBackground};
// }
