import { FaArrowLeft } from "react-icons/fa6";

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 hover:text-yellow-400 duration-300 cursor-pointer flex items-center justify-center z-10 absolute top-[35%] left-2"
    >
      <span className="text-xl">
        <FaArrowLeft />
      </span>
    </div>
  );
};

export default PrevArrow;
