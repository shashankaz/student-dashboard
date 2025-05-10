const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} Student Dashboard. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
