import { motion } from "framer-motion";
import { FileText, Share2, CreditCard, HeartHandshake, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Create Your Campaign",
    description: "Sign up and create your fundraiser in minutes. Add your story, photos, and set your goal. Our team will verify your campaign to ensure authenticity.",
    details: [
      "Fill out a simple form with your story",
      "Upload photos and documents",
      "Set your fundraising goal",
      "Campaign verification within 24 hours",
    ],
  },
  {
    icon: Share2,
    step: "02",
    title: "Share Your Story",
    description: "Share your campaign on social media, WhatsApp, and with your network. The more you share, the more people you reach.",
    details: [
      "One-click sharing to social media",
      "WhatsApp and email templates",
      "Personalized campaign link",
      "Embed on websites and blogs",
    ],
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Collect Donations",
    description: "Receive donations through secure payment gateways. Donors can pay via UPI, cards, net banking, and more.",
    details: [
      "Multiple payment options (UPI, Cards, Net Banking)",
      "Secure bank-grade encryption",
      "Real-time donation tracking",
      "Automated thank you messages",
    ],
  },
  {
    icon: HeartHandshake,
    step: "04",
    title: "Get Quick Disbursement",
    description: "Funds are disbursed directly to the hospital or beneficiary quickly and securely. Track every transaction with full transparency.",
    details: [
      "Direct disbursement to beneficiary/hospital",
      "24-48 hour processing time",
      "Complete transaction transparency",
      "Regular updates to donors",
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: "0% Platform Fee",
    description: "100% of your donation goes to the cause. We don't charge any platform fees.",
  },
  {
    icon: Clock,
    title: "Quick Disbursement",
    description: "Funds reach beneficiaries within 24-48 hours of approval.",
  },
  {
    icon: CheckCircle,
    title: "Verified Campaigns",
    description: "Every campaign is verified by our team for authenticity.",
  },
];

const faqs = [
  {
    question: "How long does it take to start a fundraiser?",
    answer: "You can create a fundraiser in just 5 minutes. Our team verifies campaigns within 24 hours, after which you can start receiving donations.",
  },
  {
    question: "What documents do I need?",
    answer: "Basic identity proof and documents related to your cause (like medical bills, school certificates, etc.). This helps us verify and build trust with donors.",
  },
  {
    question: "How will I receive the funds?",
    answer: "Funds can be disbursed directly to hospitals, educational institutions, or to your verified bank account, depending on the nature of the campaign.",
  },
  {
    question: "Is there a minimum or maximum fundraising goal?",
    answer: "There's no minimum goal. You can start fundraising for any amount. For larger campaigns, our team provides dedicated support.",
  },
  {
    question: "Can I withdraw funds before reaching my goal?",
    answer: "Yes, you can request partial withdrawals as funds come in. We process these requests within 24-48 hours.",
  },
];

const HowItWorksPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              How It Works
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Start your fundraiser in just a few simple steps and begin making 
              a difference today. Our platform makes it easy and transparent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-5xl font-display font-bold text-primary/20">
                      {step.step}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-primary-light/50 rounded-2xl p-8 aspect-video flex items-center justify-center ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}>
                  <step.icon className="w-32 h-32 text-primary/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground">
              Why Choose SacchiSewa?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center border border-border"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h3 className="font-display font-bold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your Fundraiser?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join thousands of changemakers who are making a difference. 
              Start your fundraiser today and transform lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg">
                Start a Fundraiser
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Link to="/fundraisers">
                <Button variant="ctaOutline" size="lg">
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HowItWorksPage;
