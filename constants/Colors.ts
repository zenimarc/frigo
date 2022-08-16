export const mainColor2 = "#007AFF";
export const mainColor1 = "#FFC90B";

const darkColor = "#000";
const lightColor = "#fff"
const mainColor = "#5000ca";

const themes = {
  light: {
    
    textColorful: darkColor,
    colorful: mainColor1,
    backgroundNeutral: "#ddd",
    tabIconDefault: "#ccc",
    tabIconSelected: mainColor2,
    
    //Introduced by us
    header: mainColor,
    headerTextAndArrow : lightColor,
    tabBarBackground: lightColor,
    tabBarIconActiveTint: "#fec260",
    tabBarIconActiveTint2: "#3fc996",
    tabBarIconInactiveTint: "grey",
    buttonTint: mainColor,
    background: "#fff",
    background2: "#eee",
    text: darkColor,
    text2: lightColor,
  },
  dark: {
    
    textColorful: lightColor,
    colorful: mainColor2,
    backgroundNeutral: "#222",
    tabIconDefault: "#ccc",
    tabIconSelected: lightColor,
    
    //Introduced by us
    header: mainColor,
    headerTextAndArrow : lightColor,
    tabBarBackground: darkColor,
    tabBarIconActiveTint: lightColor,
    tabBarIconActiveTint2: lightColor,
    tabBarIconInactiveTint: "grey",
    buttonTint: lightColor,
    background: "#000",
    background2: "#111",
    text: lightColor,
    text2: darkColor,
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
