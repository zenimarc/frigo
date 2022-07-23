import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </AppProvider>
    );
  }
}
