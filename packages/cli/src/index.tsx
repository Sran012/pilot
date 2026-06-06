import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { StatusBar } from "./components/status-bar";
import { Inputbar } from "./components/input-bar";

function App() {
  return (
    <box alignItems="center" justifyContent="center" gap={2} width="100%" height="100%" backgroundColor="#0D0D12">
      <Header/>
      <box width='100%' maxWidth={78} paddingX={2}>
        <Inputbar onSubmit={()=> {}}/>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
