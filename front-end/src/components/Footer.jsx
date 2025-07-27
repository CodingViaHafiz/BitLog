import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-emerald-100/90 text-emerald-700 font-medium pt-10 pb-6 mt-10 border-t shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2 text-emerald-600">BitLog</h2>
          <p className="text-sm">
            BitLog is your modern blogging platform built with MERN stack. Share, explore, and grow with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> hafizabdurrehman2005@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +92 317 5744576
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> khanewal, Pakistan
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-10 border-t pt-4 text-center text-sm text-emerald-600"
      >
        &copy; {new Date().getFullYear()} BitLog. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
