import { useQuery } from "@tanstack/react-query";
import getCurrencies from "../usecases/getCurrencies";
import Input from "./Input";
import { useState } from "react";
import InputType from "../types/inputType";
import getSymbols from "../usecases/getSymbols";
import { useDispatch } from "react-redux";
import { append } from "../store";

function CurrencyConverter() {
  const {
    isLoading: isLoadingCurrencies,
    isError: isErrorCurrencies,
    data: currencies,
  } = useQuery({
    queryKey: ["getCurrencies"],
    queryFn: getCurrencies,
    staleTime: Infinity,
  });

  const {
    isLoading: isLoadingSymbols,
    isError: isErrorSymbols,
    data: symbols,
  } = useQuery({
    queryKey: ["getSymbols"],
    queryFn: getSymbols,
    staleTime: Infinity,
    enabled: currencies?.success,
  });

  const [input, setInput] = useState<InputType>({
    fromCurrency: "AED",
    toCurrency: "AED",
    fromValue: "",
    toValue: "",
  });

  const [isInputFrom, setIsInputFrom] = useState(true);

  const dispath = useDispatch();

  if (isLoadingCurrencies || isLoadingSymbols) return <div>Laoading</div>;
  if (
    isErrorCurrencies ||
    isErrorSymbols ||
    !currencies?.success ||
    !symbols?.success
  ) {
    return <div>An error occured.</div>;
  }

  const onInputChange = (value: string, isFromCurrency: boolean) => {
    if (!currencies || !currencies?.data) return;

    let inputFrom;
    let inputTo;
    if (isFromCurrency) {
      setIsInputFrom(true);
      inputFrom = input.fromCurrency as string;
      inputTo = input.toCurrency as string;
      const res = calculateExchange(inputFrom, inputTo, value);

      setInput({
        ...input,
        fromValue: value,
        toValue: res,
      });
    } else {
      setIsInputFrom(false);
      inputFrom = input.toCurrency as string;
      inputTo = input.fromCurrency as string;

      const res = calculateExchange(inputFrom, inputTo, value);

      setInput({
        ...input,
        fromValue: res,
        toValue: value,
      });
    }
  };

  const onSelectChange = (value: string, isFromCurrency: boolean) => {
    if (!isInputFrom) {
      setIsInputFrom(true);
    }

    if (isFromCurrency) {
      const res = calculateExchange(value, input.toCurrency!, input.fromValue);
      setInput({ ...input, fromCurrency: value, toValue: res });
    } else {
      const res = calculateExchange(
        input.fromCurrency!,
        value,
        input.fromValue,
      );
      setInput({
        ...input,
        toCurrency: value,
        toValue: res,
      });
    }
  };

  const onClear = () => {
    dispath(append(input));
    setInput({ ...input, fromValue: "", toValue: "" });
  };

  function calculateExchange(from: string, to: string, value: string): string {
    if (value == "") return "";

    const res = (
      parseFloat(value.replace(/,/g, "")) *
      (parseFloat(currencies!.data![to]) / parseFloat(currencies!.data![from]))
    ).toFixed(2);
    console.log("Result: ", res);

    return res.toString();
  }

  return (
    <div
      id="card"
      className="min-md:h-5/6 mx-8 min-md:ml-16 backdrop-blur-sm bg-white/80 rounded-lg py-8"
    >
      <div className="container mx-auto w-full flex flex-col items-center space-y-8 ">
        <h1 className="text-xl font-bold mt-12 mb-8 px-8">
          {symbols.data![input.fromCurrency!]} to{" "}
          {symbols.data![input.toCurrency!]}
        </h1>
        <h3 className="text-lg font-medium mb-16">
          {new Date().toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </h3>
        <div className="h-fit flex flex-row px-8">
          <Input
            defaultValue={input.fromValue}
            onChange={(val) => onInputChange(val, true)}
          />
          <select
            defaultValue="Currency"
            className="appearance-none px-6 text-center border-2 border-teal-400 rounded-r-md cursor-pointer outline-none font-medium w-3/4"
            onChange={(e) => onSelectChange(e.target.value, true)}
          >
            {Object.keys(currencies.data!).map((currency) => (
              <option
                className="appearance-none w-36 bg-cyan-100"
                value={currency}
                key={currency}
              >
                {symbols.data![currency]}
              </option>
            ))}
          </select>
        </div>

        <div className="h-fit flex flex-row px-8">
          <Input
            defaultValue={input.toValue}
            onChange={(val) => onInputChange(val, false)}
          />
          <select
            defaultValue="Currency"
            className="appearance-none px-6 text-center  border-2 border-teal-400  rounded-r-md cursor-pointer outline-none font-medium w-3/4"
            onChange={(e) => onSelectChange(e.target.value, false)}
          >
            {Object.keys(currencies.data!).map((currency) => (
              <option
                className="appearance-none w-36 bg-pink-100"
                value={currency}
              >
                {symbols.data![currency]}
              </option>
            ))}
          </select>
        </div>

        <div className="max-md:w-full max-md:px-8 w-1/2">
          <button
            className="w-full h-12 bg-sky-500 rounded-lg cursor-pointer"
            onClick={onClear}
          >
            <p>Clear</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
