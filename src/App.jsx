import "./App.css";
import Page from "./page/Page";
import { WeatherProvider } from "./provider";

function App() {
  return (
    <>
      <WeatherProvider>
        <Page />
      </WeatherProvider>
    </>
  );
}

export default App;
