import { useSelector } from "react-redux";
import InputType from "../types/inputType";
import { IRootState } from "../store";

function ConversionHistory() {
  const history = useSelector((state: IRootState) => state.history);
  return (
    <div
      id="card"
      className="min-md:h-5/6 h-fit overflow-auto max-md:my-8 mx-8 min-md:mr-16 backdrop-blur-sm bg-white/80 rounded-lg space-y-8"
    >
      <div className="flex flex-col w-full text-start items-center my-8 gap-4">
        {history?.map((item: InputType, idx: number) => (
          <div
            key={idx}
            className="border-2 border-pink-400 rounded-lg px-8 py-4 w-3/4"
          >
            <p>
              {item.fromCurrency}: {item.fromValue}
            </p>
            <p>
              {item.toCurrency}: {item.toValue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversionHistory;
