// pages/contact.tsx
import Container from "@/components/Container";
import {
  FaPhone,
  FaX,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaHouse,
  FaCircleInfo,
} from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import Address from "@/assets/address.png";

const socials = [
  { icon: <FaFacebookF />, link: "https://www.facebook.com/mojoytechhub" },
  { icon: <FaX />, link: "https://twitter.com/mojoytechhub" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/mojoytechhub" },
  { icon: <FaTiktok />, link: "https://www.tiktok.com/@mojoytechhub" },
];

const ContactPage = () => {
  return (
    <Container className="font-raleway text-[#1B4351]">
      {/* ======= MAIN SECTION ======= */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 py-16">
        {/* ======= LEFT (Map / Image) ======= */}
        <div className="relative w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={Address}
            alt="Mojoy Address Map"
            width={800}
            height={600}
            className="object-cover w-full h-[400px] rounded-3xl"
            priority
          />
        </div>

        {/* ======= RIGHT (Contact Info) ======= */}
        <div className="w-full lg:w-1/2 max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-[Vonique_64] text-center lg:text-left text-[#1B4351] mb-8">
            Get in Touch With Us
          </h1>

          <div className="flex flex-col gap-6 text-base">
            {/* Address */}
            <div className="flex items-start gap-4">
              <FaHouse className="text-2xl text-[#1B4351]" />
              <a
                href="https://www.google.com/maps/place/13+Oshitelu+Street,+Lagos,+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFF354] transition-colors"
              >
                13 Oshitelu St, Computer Village, Lagos, Nigeria
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <FaPhone className="text-2xl text-[#1B4351]" />
              <a
                href="tel:+2347066755185"
                className="hover:text-[#FFF354] transition-colors"
              >
                (+234) 706-675-5185
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <AiFillMail className="text-2xl text-[#1B4351]" />
              <a
                href="mailto:shop@mojoyicl.com"
                className="hover:text-[#FFF354] transition-colors"
              >
                shop@mojoyicl.com
              </a>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <FaCircleInfo className="text-2xl text-[#1B4351]" />
              <p>
                <span className="font-semibold">Hours:</span> <br />
                Monday – Friday: 9am – 6pm <br />
                Saturday: 9am – 3pm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======= SOCIALS SECTION ======= */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[#1B4351] mb-3">Or reach us on:</p>
        <div className="flex justify-center gap-6 lg:gap-10">
          {socials.map((social, index) => (
            <Link key={index} href={social.link} target="_blank">
              <div className="text-3xl lg:text-4xl text-[#1B4351] hover:text-[#FFF354] hover:scale-110 transition-transform duration-300">
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
