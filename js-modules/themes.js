export default class Themes {
    constructor(activeTheme) {
        this.themes = {};
        this.activeTheme = activeTheme;
    }

    // Name, body, border, section, userType, userName, symbols, text
    insertTheme(name, _body, _border, _section, _userType, _userName, _symbols, _text, _link, _scrollbar0, _scrollbar100) {
        const theme = {
            bodyBackground: _body,
            border: _border,
            section: _section,
            userType: _userType,
            userName: _userName,
            symbols: _symbols,
            text: _text,
            link: _link,
            scrollbar0: _scrollbar0,
            scrollbar100: _scrollbar100,
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
        // link color
        document.documentElement.style.setProperty('--link-color', theme.link);
        // scrollbar 0% color
        document.documentElement.style.setProperty('--scrollbar-0', theme.scrollbar0);
        // scrollbar 100% color
        document.documentElement.style.setProperty('--scrollbar-100', theme.scrollbar100);

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


// Name, body, border, section, userType, userName, symbols, text, link, scrollbar0, scrollbar100

//              // Name,        body,      border,  section,     userType, userName,  symbols,    text, link
themes.insertTheme('omni', '#000000', '#67E480', '#191622', '#FF79C6', '#67E480', '#ABB2BF', '#B4E1FD', '#E96379', '#E9FFCF', '#83FF08');
themes.insertTheme('palenight', '#000000', '#C3E88D', '#292D3E', '#F07178', '#C3E88D', '#959DCB', '#959DCB', '#82AAFF', '#F3FFDC', '#C3E88D');
themes.insertTheme('oxcarbon-dark', '#161616', '#DDE1E6', '#262626', '#EE5396', '#42BE65', '#FFFFFF', '#FFFFFF', '#EE5396', '#F5F7FA', '#DDE1E6');
themes.insertTheme('grape', '#2D283F', '#9DE3EB', '#171423', '#3BDEED', '#1FA91B', '#A9BCEC', '#9E9EA0', '#F0729A', '#E3F6FB', '#9DE3EB');
themes.insertTheme('morada', '#040404', '#48B117', '#211F46', '#1C96C7', '#48B117', '#F6F5FB', '#F6F5FB', '#0f64c4', '#A0D977', '#48B117');

//              // Name,        body,      border,  section,     userType, userName,  symbols,    text, link
themes.insertTheme('selenized-dark', '#323232', '#41c7b9', '#103c48', '#dbb32d', '#75b938', '#cad8d9', '#cad8d9', '#4695f7', '#9adbd6', '#41c7b9');
themes.insertTheme('seafoam-pasetl', '#000000', '#825D4D', '#243435', '#8A7267', '#728C62', '#E0E0E0', '#E0E0E0', '#ADA16D', '#714D3D', '#825D4D');
themes.insertTheme('predawn', '#000000', '#666666', '#282828', '#B51A20', '#A6CC75', '#FFFFFF', '#FFFFFF', '#F18260', '#999999', '#666666');
themes.insertTheme('neopolitan', '#000000', '#800000', '#271F19', '#800000', '#61CE3C', '#D0B8A3', '#F8F8F8', '#800000', '#CC3333', '#800000');
themes.insertTheme('neon-night', '#040404', '#69B4F9', '#20242D', '#FF8E8E', '#7EFDD0', '#DD92F6', '#DD92F6', '#8CE8FF', '#B4D9FF', '#DD92F6');

//              // Name,        body,      border,  section,     userType, userName,  symbols,    text, link
themes.insertTheme('gogh', '#000000', '#F580FF', '#292D3E', '#F07178', '#62DE84', '#ABB2BF', '#FFFEFE', '#82AAFF', '#FFB3FF', '#F580FF');
themes.insertTheme('fairy-floss', '#040404', '#75507B', '#42395D', '#A8757B', '#F1568E', '#F8F8F0', '#F8F8F0', '#FFB8D1');
themes.insertTheme('fairy-floss-dark', '#040404', '#75507B', '#000000', '#A8757B', '#F1568E', '#F8F8F0', '#F8F8F0', '#FFB8D1', '#AE8DBB', '#75507B');
themes.insertTheme('everforest-dark', '#5C6A72', '#5C6A72', '#2D353B', '#E67E80', '#A7C080', '#D3C6AA', '#D3C6AA', '#DBBC7F', '#8E9FA7', '#5C6A72');
themes.insertTheme('tokyo-night-storm', '#040404', '#414868', '#24283B', '#F7768E', '#9ECE6A', '#C0CAF5', '#C0CAF5', '#7AA2F7', '#6D7C86', '#414868');
// themes.insertTheme('', '', '', '', '', '', '', '');
