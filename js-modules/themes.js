export default class Themes {
    constructor(activeTheme) {
        this.themes = {};
        this.activeTheme = activeTheme;
        this.activeThemeName = activeTheme;
    }

    // Name, body, border, section, userType, userName, symbols, text
    insertTheme(name, _body, _border, _section, _userType, _userName, _symbols, _text, _link, _scrollbar0, _scrollbar100, _cmatrix, _cmatrixBackground) {
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
            cmatrix: _cmatrix,
            cmatrixBackground: _cmatrixBackground,
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
        // cmatrix color
        document.documentElement.style.setProperty('--cmatrix-color', theme.cmatrix);
        // cmatrix color
        document.documentElement.style.setProperty('--cmatrix-background', theme.cmatrixBackground);
    }

    setActiveTheme(theme) {
        this.activeTheme = theme;
        this.setTheme(theme);
    }

    getActiveTheme() {
        return this.activeTheme;
    }

    getActiveThemeName() {
        return this.activeThemeName;
    }

    // Returns an array containing all keys of the object
    // Array that contains all theme names
    getThemesList(themesList = this.themes) {
        return Object.keys(themesList);
    }

    getRandomTheme(themesList = this.themes) {
        const keys = Object.keys(themesList);
        const max = keys.length;
        const rand = Math.floor(Math.random() * max);
        const randKey = keys[rand];

        return randKey;
    }

    setRandomTheme() {
        this.activeThemeName = this.getRandomTheme();
        this.setActiveTheme(this.findTheme(this.activeThemeName));
    }
}
const themes = new Themes('omni');

export function getThemes() {
    return themes;
}


// // Name, body, border, section, userType, userName, symbols, text, link, scrollbar0, scrollbar100, cmatrix, cmatrixBackground

// Section left
themes.insertTheme('omni', '#000000', '#67E480', '#191622', '#FF79C6', '#67E480', '#ABB2BF', '#B4E1FD', '#E96379', '#191622', '#83FF08', 'rgba(103, 228, 128, 1)', 'rgba(0, 0, 0, 0.05)');
themes.insertTheme('palenight', '#000000', '#C3E88D', '#292D3E', '#F07178', '#C3E88D', '#959DCB', '#959DCB', '#82AAFF', '#292D3E', '#C3E88D', 'rgba(195, 232, 141, 1)', 'rgba(0, 0, 0, 0.05)');
themes.insertTheme('oxcarbon-dark', '#161616', '#DDE1E6', '#262626', '#EE5396', '#42BE65', '#FFFFFF', '#FFFFFF', '#EE5396', '#262626', '#DDE1E6', 'rgba(66, 190, 101, 1)', 'rgba(22, 22, 22, 0.05)');
themes.insertTheme('grape', '#2D283F', '#9DE3EB', '#171423', '#3BDEED', '#1FA91B', '#A9BCEC', '#9E9EA0', '#F0729A', '#171423', '#9DE3EB', 'rgba(59, 222, 237, 1)', 'rgba(45, 40, 63, 0.05)');
themes.insertTheme('morada', '#040404', '#48B117', '#211F46', '#1C96C7', '#48B117', '#F6F5FB', '#F6F5FB', '#0f64c4', '#211F46', '#48B117', 'rgba(72, 177, 23, 1)', 'rgba(4, 4, 4, 0.05)');

// Section middle
themes.insertTheme('selenized-dark', '#323232', '#41c7b9', '#103c48', '#dbb32d', '#75b938', '#cad8d9', '#cad8d9', '#4695f7', '#103c48', '#41c7b9', 'rgba(65, 199, 185, 1)', 'rgba(50, 50, 50, 0.05)');
themes.insertTheme('seafoam-pasetl', '#000000', '#825D4D', '#243435', '#8A7267', '#728C62', '#E0E0E0', '#E0E0E0', '#ADA16D', '#243435', '#825D4D', 'rgba(130, 93, 77, 1)', 'rgba(0, 0, 0, 0.05)');
themes.insertTheme('predawn', '#000000', '#666666', '#282828', '#B51A20', '#A6CC75', '#FFFFFF', '#FFFFFF', '#F18260', '#282828', '#666666', 'rgba(181, 26, 32, 1)', 'rgba(0, 0, 0, 0.05)');
themes.insertTheme('neopolitan', '#000000', '#800000', '#271F19', '#800000', '#61CE3C', '#D0B8A3', '#F8F8F8', '#800000', '#271F19', '#800000', 'rgba(128, 0, 0, 1)', 'rgba(0, 0, 0, 0.05)');
themes.insertTheme('neon-night', '#040404', '#69B4F9', '#20242D', '#FF8E8E', '#7EFDD0', '#DD92F6', '#DD92F6', '#8CE8FF', '#20242D', '#DD92F6', 'rgba(105, 180, 249, 1)', 'rgba(4, 4, 4, 0.05)');

// Section right
themes.insertTheme('gogh', '#000000', '#F580FF', '#292D3E', '#F07178', '#62DE84', '#ABB2BF', '#FFFEFE', '#82AAFF', '#292D3E', '#F580FF', 'rgba(245, 128, 255, 1)', 'rgba(0, 0, 0, 0.05)');
themes.insertTheme('fairy-floss', '#040404', '#75507B', '#2d2840', '#A8757B', '#F1568E', '#F8F8F0', '#F8F8F0', '#FFB8D1', '#2d2840', '#F1568E', 'rgba(241, 86, 142, 1)', 'rgba(4, 4, 4, 0.05)');
themes.insertTheme('fairy-floss-dark', '#040404', '#75507B', '#000000', '#A8757B', '#F1568E', '#F8F8F0', '#F8F8F0', '#FFB8D1', '#000000', '#75507B', 'rgba(241, 86, 142, 1)', 'rgba(4, 4, 4, 0.05)');
themes.insertTheme('everforest-dark', '#5C6A72', '#5C6A72', '#2D353B', '#E67E80', '#A7C080', '#D3C6AA', '#D3C6AA', '#DBBC7F', '#2D353B', '#5C6A72', 'rgba(45, 53, 59, 1)', 'rgba(92, 106, 114, 0.05)');
themes.insertTheme('tokyo-night-storm', '#040404', '#414868', '#24283B', '#F7768E', '#9ECE6A', '#C0CAF5', '#C0CAF5', '#7AA2F7', '#24283B', '#414868', 'rgba(192, 202, 245, 1)', 'rgba(4, 4, 4, 0.05)');


// Activates a random theme
themes.setRandomTheme();
