import { useEffect, useState } from "react";

function Input({
  defaultValue,
  onChange,
}: {
  defaultValue: string | null;
  onChange: (arg: string) => void;
}) {
  const [value, setValue] = useState("");

  const formatNumber = (inputValue: string) => {
    const [integerPart, decimalPart] = inputValue.split(".");

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ",",
    );

    return decimalPart !== undefined
      ? `${formattedIntegerPart}.${decimalPart}`
      : `${formattedIntegerPart}`;
  };

  useEffect(() => {
    if (defaultValue) {
      const formattedValue = formatNumber(defaultValue.toString());
      setValue(formattedValue);
    } else {
      setValue("");
    }
  }, [defaultValue]);

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = e.target.value;

    inputValue = inputValue.replace(/[^0-9.]/g, "");

    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts[0] + "." + parts.slice(1).join("");
    } else {
      inputValue = parts.join(".");
    }

    const formattedValue = formatNumber(inputValue);

    setValue(formattedValue);
    e.target.value = formattedValue;

    onChange(formattedValue);
  }

  return (
    <input
      type="text"
      placeholder="Type here"
      className="appearance-none p-4 border-2 border-teal-400 rounded-l-md outline-none w-3/4 "
      value={value}
      onChange={onInput}
    />
  );
}

export default Input;
