export const mainColor2 = "#007AFF";
const tintColorDark = "#fff";
export const mainColor1 = "#FFC90B";

const themes = {
  light: {
    text: "#000",
    text2: "#fff",
    textColorful: "#000",
    colorful: mainColor1,
    background: mainColor1,
    background2: "#fff",
    tint: mainColor2,
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor2,
    tabIconInactive: "grey",
    header: mainColor2,
  },
  dark: {
    text: "#000",
    text2: "#fff",
    textColorful: "#fff",
    colorful: mainColor2,
    background: "#000",
    background2: "#fff",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    tabIconInactive: "grey",
    header: "#5000ca",
  },
};

const forceTheme = (name: "light" | "dark") => {
  return {
    light: themes[name],
    dark: themes[name],
  };
};

const adaptiveTheme = themes;

//export default forceTheme("light");
export default adaptiveTheme;
