import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-cyan-400/20 bg-slate-900/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 text-sm text-slate-200/80">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-slate-50 mb-2">
            Contact Us
          </h2>
          <p className="mb-1">
            <span className="font-medium">Email:</span>{' '}
            <a
              href="mailto:info@dreamhouse.com"
              className="text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              info@dreamhouse.com
            </a>
          </p>
          <p className="mb-1">
            <span className="font-medium">Phone:</span>{' '}
            <a
              href="tel:+1234567890"
              className="text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              +1 (234) 567-890
            </a>
          </p>
          <p className="mb-1">
            <span className="font-medium">Location:</span> 123 Dream Street,
            Dream City, DC 00000
          </p>
        </div>

        <div className="text-xs text-slate-400 sm:text-right">
          <p>
            © {new Date().getFullYear()} Dreamhouse. Crafted with{' '}
            <span className="text-cyan-300">neon clarity</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
