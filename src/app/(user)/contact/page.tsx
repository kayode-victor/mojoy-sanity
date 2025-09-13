// pages/contact.tsx
import Container from "@/components/Container";
import { FaHome, FaPhone, FaInfoCircle } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { FaX, FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Address from "@/assets/address.png";

const socials = [
  {
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/mojoytechhub", },
  { icon: <FaX />, link: "https://twitter.com/mojoytechhub" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/mojoytechhub" },
  { icon: <FaTiktok />, link: "https://www.tiktok.com/@mojoytechhub" },
];
const ContactPage = () => {
  return (
    <Container className="">
      <div className="flex flex-col lg:flex-row pt-15 justify-center items-center ">
        <div className="relative w-full h-[400px]">
          <Image 
              src={Address}
              alt='hell'
              width={700}
              height={700}
          />
  {/* <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.419917614367!2d3.3373867102114643!3d6.594617993371598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b92273801b885%3A0x2961cfdc611b8d39!2sMojoy%20Computers!5e0!3m2!1sen!2sng!4v1709947692419!5m2!1sen!2sng"
    className="absolute top-0 left-0 w-full h-full"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe> */}
</div>

        <div className="px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="lg:text-3xl text-2xl font-bold mb-6 text-center">
              GET IN TOUCH WITH US
            </h1>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-start">
                <div className="flex mb-6 gap-4 items-center justify-center">
                  <FaHome className="text-xl" />
                 <a
    href="https://www.google.com/maps/place/13+Oshitelu+Street,+Lagos,+Nigeria"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="text-center hover:text-blue-400 lg:text-left cursor-pointer">
      13 Oshitelu St, Computer Village, Lagos, Nigeria
    </p>
  </a>
                </div>
                <div className="flex mb-6 gap-4 items-center justify-center">
  <FaPhone className="text-xl" />
  <a
    href="tel:+2348023636583"
    className="text-md text-gray-700 hover:text-blue-500 transition"
  >
    (+234)802-363-6583
  </a>
</div>

<div className="flex mb-6 gap-4 items-center justify-center">
  <AiFillMail className="text-xl" />
  <a
    href="mailto:shop@mojoyicl.com"
    className="text-md text-gray-700 hover:text-blue-500 transition"
  >
     shop@mojoyicl.com
  </a>
</div>

                <div className="flex mb-6 gap-4 items-center justify-center">
                  <FaInfoCircle className="text-xl" />
                  <p className="text-md text-gray-700">
                    Monday - Friday (9am - 6pm), Saturday(9am to 3pm)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div>
          <p>or</p>
        </div>
        <div className="flex gap-4 lg:gap-10">
          {socials.map((social, index) => (
            <Link key={index} href={social.link}>
              <div className="text-(#1b4351)-200 lg:text-5xl text-3xl hover:text--400 hover:scale-125 transition-transform duration-300 ease-in-out">
                {social.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
