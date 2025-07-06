const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 p-6 text-center text-sm shadow-inner">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} My Kanban App. All rights reserved.
        </p>
        <p className="mt-2">Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
