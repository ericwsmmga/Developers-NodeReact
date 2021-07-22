import Home from "../src/pages/Home";
import { ContextDeveloperProvider } from "../src/context/ContextDeveloper";

function App() {
  return (
    <ContextDeveloperProvider>
      <Home />
    </ContextDeveloperProvider>
  );
}

export default App;
