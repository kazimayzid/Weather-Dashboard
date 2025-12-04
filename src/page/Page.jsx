import Header from "../components/header/Header";
import WeatherBoard from "../components/weatherBoard/WeatherBoard";

export default function Page() {
    return <>
     <div className="bg-body font-roboto text-light bg-[url('../assets/body-bg.png')] bg-no-repeat bg-cover h-screen grid place-items-center">
        <Header/>
     <WeatherBoard/>
     </div>
    </>
}