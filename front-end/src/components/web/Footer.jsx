import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-background">
      <Separator />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-primary">MyApp</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A secure digital platform to manage, submit, and track banking
              complaints with transparency and ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              <li><Link to="/complaints/all" className="hover:text-primary">Complaints</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-3 font-medium">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-3 font-medium">Get in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Email: support@myapp.com
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: +92 300 1234567
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-2 border-t pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Built with ❤️ using React & shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
