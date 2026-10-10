import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { StatusBar } from "./components/status-bar";
import { Inputbar } from "./components/input-bar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboard-layer";
import { ThemeProvider, useTheme } from "./providers/theme";

function ThemeRoot() {
  const { colors } = useTheme();
  return (
    <box alignItems="center" justifyContent="center" gap={2} width="100%" height="100%" backgroundColor={colors.background}>
      <Header />
      <box width='100%' maxWidth={78} paddingX={2}>
        <Inputbar onSubmit={() => { }} />
      </box>
    </box>
  )
}

function App() {
  return (
    <ThemeProvider>
      <KeyboardLayerProvider>
        <ToastProvider>
          <ThemeRoot/>
        </ToastProvider>
      </KeyboardLayerProvider>
    </ThemeProvider>
  );
}

const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false,
});
createRoot(renderer).render(<App />);
