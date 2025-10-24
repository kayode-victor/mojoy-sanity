"use client";
import Container from "@/components/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import aboutOffice from "@/assets/about-hero.jpg"; // replace with your own image
import { FaHandshake, FaLightbulb, FaShieldAlt } from "react-icons/fa";

const AboutPage = () => {
  const stats = [
    { number: 20, label: "Years of Experience", suffix: "+" },
    { number: 1000, label: "Happy Clients", suffix: "+" },
    { number: 5000, label: "Products Delivered", suffix: "+" },
    { number: 20, label: "Brand Partnerships", suffix: "+" },
  ];

  return (
    <Container className="font-raleway text-[#ffffff] overflow">
      {/* ===== HERO ===== */}
      <section className="bg-[#CD661A] text-[#FFF345] py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-[Vonique_64] text-4xl md:text-6xl"
        >
          About MOJOY
        </motion.h1>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="bg-[#F3F4F6] py-16 px-6 lg:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-[Vonique_64] text-[#1B4351] mb-4"
        >
          Who We Are
        </motion.h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          MOJOY is a leading IT retail and distribution organization dedicated
          to delivering premium IT products at competitive prices. Our mission
          is to empower individuals and businesses with innovative ICT solutions
          while ensuring customer satisfaction at every step.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:bg-[#FFF354]/10 transition">
            <h3 className="font-bold text-xl mb-2 text-[#1B4351]">
              What We Do
            </h3>
            <p className="text-gray-700 text-sm">
              We provide high-quality IT products, accessories, and
              services—ensuring our customers get reliable and affordable
              solutions tailored to their needs.
            </p>
          </div>
          <div className="bg-[#FFF354]/20 shadow-md p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-xl mb-2 text-[#CD661A]">
              Our Vision
            </h3>
            <p className="text-gray-700 text-sm">
              To be Africa’s most trusted ICT solutions provider, prioritizing
              customer success and continuous innovation in the tech industry.
            </p>
          </div>
          <div className="bg-[#CD661A]/10 shadow-md p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-xl mb-2 text-[#1B4351]">
              Our Beginning
            </h3>
            <p className="text-gray-700 text-sm">
              Founded in the bustling hub of Computer Village, Lagos — our
              journey is built on resilience, innovation, and a relentless drive
              to provide value.
            </p>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="bg-[#FFFFFF] py-20 px-6 lg:px-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src={aboutOffice}
            alt="Mojoy Office"
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-[Vonique_64] mb-6 text-[#1B4351]">
            Our Story
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            What began as a small IT shop in Computer Village has grown into a
            trusted name in ICT retail and distribution across Africa. Over the
            years, we’ve expanded our network, strengthened our partnerships,
            and continuously improved our services to meet customer demands.
          </p>
          <p className="text-[#1B4351] text-lg leading-relaxed">
            Today, MOJOY stands as a symbol of excellence — providing solutions
            that help businesses and individuals stay ahead in the digital era.
          </p>
        </motion.div>
      </section>

      {/* ===== MOJOY IN NUMBERS ===== */}
      <section className="bg-[#CD661A] text-white py-20 text-center">
        <h2 className="text-3xl font-[Vonique_64] text-[#FFF354] mb-10">
          Mojoy In Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className="text-5xl font-bold text-[#FFF354]">
                <CountUp end={item.number} duration={8} />
                {item.suffix}
              </span>
              <p className="text-sm mt-2 text-gray-100">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="bg-[#4b7888] py-20 px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-[Vonique_64] text-[#ffffff] mb-10">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-[#FFF354]/20 p-8 rounded-2xl shadow-md hover:scale-105 transition">
            <div className="flex justify-center mb-4 text-4xl text-[#FFF354]">
              <FaHandshake />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1B4351]">
              Customer First
            </h3>
            <p className="text-white text-sm">
              We put our customers at the center of everything we do — ensuring
              satisfaction and long-term trust.
            </p>
          </div>

          <div className="bg-[#1B4351]/10 p-8 rounded-2xl shadow-md hover:scale-105 transition">
            <div className="flex justify-center mb-4 text-4xl text-[#FFF354]">
              <FaLightbulb />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1B4351]">
              Innovation
            </h3>
            <p className="text-white text-sm">
              We embrace creativity and technology to deliver cutting-edge
              solutions that empower individuals and businesses.
            </p>
          </div>

          <div className="bg-[#CD661A]/10 p-8 rounded-2xl shadow-md hover:scale-105 transition">
            <div className="flex justify-center mb-4 text-4xl text-[#FFF354]">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#1B4351]">
              Integrity
            </h3>
            <p className="text-white text-sm">
              We uphold honesty and transparency in every transaction — building
              relationships based on trust.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutPage;
