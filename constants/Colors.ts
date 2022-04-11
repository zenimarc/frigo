const tintColorLight = "#5000ca";
const tintColorDark = "#fff";

const themes = {
  light: {
    text: "#000",
    text2: "#fff",
    background: "#FFC90B",
    background2: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    tabIconInactive: "grey",
    header: "#5000ca",
  },
  dark: {
    text: "#000",
    text2: "#fff",
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
