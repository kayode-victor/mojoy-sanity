import React, { useState, useEffect } from "react";

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceChange,
}) => {
  const [min, setMin] = useState(currentMin.toString());
  const [max, setMax] = useState(currentMax.toString());

  // Sync with parent state
  useEffect(() => {
    setMin(currentMin.toString());
    setMax(currentMax.toString());
  }, [currentMin, currentMax]);

  // Handle min price change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    setMin(value);
  };

  // Handle max price change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    setMax(value);
  };

  // Reset to initial state
  const handleReset = () => {
    setMin(currentMin.toString());
    setMax(currentMax.toString());
    onPriceChange(currentMin, currentMax);
  };

  // Save and initialize the range select
  const handleSave = () => {
    const numMin = Number(min);
    const numMax = Number(max);
    if (
      min &&
      max &&
      numMin >= minPrice &&
      numMax <= maxPrice &&
      numMin <= numMax - 10
    ) {
      onPriceChange(numMin, numMax);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full md:w-1/3">
      <div className="flex gap-2 items-center">
        <span>₦</span>
        <input
          type="text"
          value={min}
          onChange={handleMinChange}
          className="border rounded px-2 py-1 w-24"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <span>to</span>
        <span>₦</span>
        <input
          type="text"
          value={max}
          max={maxPrice}
          onChange={handleMaxChange}
          className="border rounded px-2 py-1 w-24"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded border bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PriceRange;
