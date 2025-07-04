import { FaFacebook, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full shadow-inner">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 font-bold">
        <p className="text-sm text-gray-700">
          © 2025. Developed by{" "}
          <span className="text-green-500">Thanh Sang</span>. All rights reserved.
        </p>

        <div className="flex gap-3 text-sm text-blue-600">
          <a href="https://www.facebook.com/nguyensanggg" className="hover:underline"><FaFacebook /></a>
          <a href="https://github.com/SangNguyen-BT" className="hover:underline"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
