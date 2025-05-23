"use client";

const NavBanner = () => {
  return (
    <div
      className="items-center"
      style={{ backgroundColor: "hsl(240, 50.60%, 15.90%)" }}
    >
      <div className="flex justify-between items-center mx-auto max-w-xl md:max-w-2xl w-full px-4 md:px-0 md:py-1 py-5">
        <i className="text-white text-xs md:text-xs font-light uppercase animate-pulse">
          Tech summer sales <span className="ml-2">-</span>
        </i>
        <p className="text-[#FACA15] text-xs md:text-sm">
          Enjoy 10% off on your next order over $100
        </p>
        <p className="text-white text-xs animate-pulse">
          <i className="text-white text-xs py-2 font-light">valid till</i>
           July 28, 2025 
        </p>
        <button className="hidden md:block text-[#FACA15] text-xs md:text-sm py-2">
          Get Discount
        </button>
      </div>
    </div>
  );
};
export default NavBanner;
