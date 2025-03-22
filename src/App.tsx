import ConversionHistory from "./components/ConversionHistory";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <main className="w-full min-md:h-screen h-fit text-center  text-indigo-950">
      <h1 className="text-5xl font-bold pt-24 mb-16">Currency Converter</h1>

      <div className="grid grid-cols-2 max-md:grid-cols-1 h-3/4 justify-center">
        <CurrencyConverter />
        <ConversionHistory />
      </div>
    </main>
  );
}

export default App;
