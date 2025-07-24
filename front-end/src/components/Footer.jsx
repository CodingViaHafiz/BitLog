import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-100 text-emerald-700 font-medium pt-10 pb-6 mt-10 border-t shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-emerald-600">BitLog</h2>
          <p className="text-sm">
            BitLog is your modern blogging platform built with MERN stack. Share, explore, and grow with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@bitlog.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +92 300 1234567
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Lahore, Pakistan
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-4 text-center text-sm text-emerald-500">
        &copy; {new Date().getFullYear()} BitLog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
