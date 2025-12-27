import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Start a Fundraiser", href: "/fundraisers" },
    { name: "Browse Causes", href: "/causes" },
    { name: "Contact Us", href: "/contact" },
  ];

  const supportLinks = [
    { name: "FAQs", href: "/how-it-works" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-2xl font-display font-bold">
                Sacchi<span className="text-primary">Sewa</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
              Together, we can make a difference. Join our community of 
              changemakers and help transform lives across India.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Charity Lane, New Delhi,<br />India - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:contact@sacchisewa.org"
                  className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  contact@sacchisewa.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} SacchiSewa. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-secondary fill-current" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
