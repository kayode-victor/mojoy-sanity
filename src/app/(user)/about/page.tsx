import Container from "@/components/Container";
import Image from "next/image";
import { FaHandshake, FaLightbulb, FaShieldAlt } from "react-icons/fa";

const AboutPage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <section className="relative w-full h-[300px] lg:h-[400px] flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl lg:text-6xl font-bold text-center">
          About MOJOY
        </h1>
      </section>

      {/* Intro Section */}
      <section className="py-12 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          MOJOY is a leading IT retail and distribution organization dedicated
          to delivering premium IT products at competitive prices. Our mission is
          to empower individuals and businesses with innovative ICT solutions
          while ensuring customer satisfaction at every step.
        </p>
      </section>

      {/* Grid Section */}
      <section className="py-12 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">What We Do</h3>
            <p className="text-gray-700">
              We provide high-quality IT products, accessories, and services,
              ensuring our customers get reliable and affordable solutions
              tailored to their needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be Africa’s most trusted ICT solutions provider, prioritizing
              customer success and continuous innovation in the tech industry.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Our Beginning</h3>
            <p className="text-gray-700">
              Founded in the bustling hub of Computer Village, Lagos, our journey
              is built on resilience, innovation, and a relentless drive to
              provide value.
            </p>
          </div>
        </div>
      </section>

      {/* Image & Story Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/2">
          <Image
            src="/about-img.jpg" // Replace with  image
            alt="MOJOY Office"
            width={600}
            height={400}
            className="rounded-2xl shadow"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            What began as a small IT shop in Computer Village has grown into a
            trusted name in ICT retail and distribution across Africa. Over the
            years, we’ve expanded our network, strengthened our partnerships,
            and continuously improved our services to meet customer demands.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, MOJOY stands as a symbol of excellence, providing solutions
            that help businesses and individuals stay ahead in the digital era.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <FaHandshake className="text-5xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-700">
                We put our customers at the center of everything we do, ensuring
                satisfaction and long-term trust.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <FaLightbulb className="text-5xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-700">
                We embrace creativity and technology to deliver cutting-edge
                solutions that empower individuals and businesses.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <FaShieldAlt className="text-5xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-700">
                We uphold honesty and transparency in every transaction,
                building relationships based on trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutPage;
