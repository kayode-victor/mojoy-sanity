// components/WhatsAppButton.tsx
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

const WhatsAppButton = () => {
  const pathname = usePathname();

  // Hide button on Sanity Studio routes
  if (pathname.startsWith("/studio")) return null;

  const phoneNumber = "2348053698403"; // Your WhatsApp number in international format
  const message = encodeURIComponent(
    "Hello MojoYICL, I have a question about your products!"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-4 z-50 flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 md:w-16 md:h-16"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8 text-white md:w-10 md:h-10" />
    </a>
  );
};

export default WhatsAppButton;
