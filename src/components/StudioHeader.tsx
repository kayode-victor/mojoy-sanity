import Link from "next/link";
import logo from "@/assets/logowhite.png";
import Image from "next/image";
import { IoReturnDownBack } from "react-icons/io5";

const StudioHeader = (props: any) => {
  return (
    <div>
      <div className="px-16 bg-gray-600 text-gray-100 flex items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-3 font-semibold hover:text-yellow-400 duration-200"
        >
          <IoReturnDownBack className="text-2xl" /> Go to Website
        </Link>
        <Image src={logo} alt="logo" className="w-24" />
        <p className="text-sm hidden lg:flex">
          Admin Studio for Mojoy. Contact{" "}
          <span className="text-yellow-400 mx-2">(+234-9130912078)</span> for
          help.
        </p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default StudioHeader;
