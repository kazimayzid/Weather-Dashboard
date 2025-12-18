import "./App.css";
import Page from "./page/Page";
import { FavouriteProvider, WeatherProvider } from "./provider";

function App() {
  return (
    <>
      <WeatherProvider>
        <FavouriteProvider>
          <Page />
        </FavouriteProvider>
      </WeatherProvider>
    </>
  );
}

export default App;
