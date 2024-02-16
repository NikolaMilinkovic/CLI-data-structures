export default class Themes {
    constructor(activeTheme) {
        this.themes = {};
        this.activeTheme = activeTheme;
    }

    // Name, body, border, section, userType, userName, symbols, text
    insertTheme(name, _body, _border, _section, _userType, _userName, _symbols, _text) {
        const theme = {
            bodyBackground: _body,
            border: _border,
            section: _section,
            userType: _userType,
            userName: _userName,
            symbols: _symbols,
            text: _text,
        };

        this.themes[name] = theme;
    }

    findTheme(themeName, themesList = this.themes) {
        const theme = themesList[themeName];
        if (theme) {
            return theme;
        }
    }

    setTheme(theme) {
        // body background
        document.documentElement.style.setProperty('--body-background-color', theme.bodyBackground);
        // border color
        document.documentElement.style.setProperty('--border-color', theme.border);
        // section background
        document.documentElement.style.setProperty('--section-background-color', theme.section);
        // usert type
        document.documentElement.style.setProperty('--user-type-color', theme.userType);
        // user name
        document.documentElement.style.setProperty('--user-name-color', theme.userName);
        // symbols
        document.documentElement.style.setProperty('--symbols-color', theme.symbols);
        // text color
        document.documentElement.style.setProperty('--text-color', theme.text);

        this.setActiveTheme(theme);
    }

    setActiveTheme(theme) {
        this.activeTheme = theme;
    }

    // Returns an array containing all keys of the object
    // Array that contains all theme names
    getThemesList(themesList = this.themes) {
        return Object.keys(themesList);
    }
}

const themes = new Themes('omni');

export function getThemes() {
    return themes;
}


// Name, body, border, section, userType, userName, symbols, text
themes.insertTheme('omni', '#000000', '#67E480', '#191622', '#FF79C6', '#67E480', '#ABB2BF', '#B4E1FD');
themes.insertTheme('palenight', '#000000', '#C3E88D', '#292D3E', '#F07178', '#C3E88D', '#959DCB', '#959DCB');
themes.insertTheme('oxcarbon-dark', '#161616', '#DDE1E6', '#262626', '#EE5396', '#42BE65', '#FFFFFF', '#FFFFFF');
themes.insertTheme('grape', '#2D283F', '#9DE3EB', '#171423', '#3BDEED', '#1FA91B', '#A9BCEC', '#9E9EA0');
// themes.insertTheme('', '', '', '', '', '', '', '');
