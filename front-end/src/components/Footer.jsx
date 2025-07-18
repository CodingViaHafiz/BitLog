const Footer = () => {
  return (
    <footer className="bg-white/60 text-fontColor font-semibold text-md py-6 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} BitLog. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Terms</a>
          <a href="#" className="hover:text-black">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
