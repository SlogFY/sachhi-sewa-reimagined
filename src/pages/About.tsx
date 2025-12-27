import { motion } from "framer-motion";
import { Heart, Users, Award, Target, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const stats = [
    { value: "1000+", label: "Lives Changed" },
    { value: "₹50L+", label: "Funds Raised" },
    { value: "100+", label: "Active Campaigns" },
    { value: "5000+", label: "Donors" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We believe in the power of empathy and kindness to transform lives.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Together, we are stronger. Our community drives positive change.",
    },
    {
      icon: Award,
      title: "Transparency",
      description: "100% of donations go directly to the cause. Zero platform fees.",
    },
    {
      icon: Target,
      title: "Impact",
      description: "Every contribution creates measurable, lasting change.",
    },
  ];

  const milestones = [
    { year: "2020", title: "SacchiSewa Founded", description: "Started with a vision to make charitable giving accessible to all." },
    { year: "2021", title: "First 100 Campaigns", description: "Reached our first milestone of 100 successful fundraising campaigns." },
    { year: "2022", title: "₹10 Lakhs Raised", description: "Crossed the ₹10 lakh mark in total funds raised for various causes." },
    { year: "2023", title: "National Recognition", description: "Received recognition for our impact in healthcare and education." },
    { year: "2024", title: "₹50 Lakhs & Growing", description: "Continuing to expand our reach and impact across India." },
  ];

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
              About SacchiSewa
            </h1>
            <p className="text-lg text-primary-foreground/80">
              We are a community-driven platform dedicated to connecting compassionate 
              donors with those in need. Our mission is to make giving simple, transparent, 
              and impactful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3 mb-6">
                Making a Difference, One Life at a Time
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SacchiSewa was born from a simple belief: everyone deserves a helping hand 
                  when they need it most. Founded in 2020, we set out to create a platform 
                  that makes charitable giving accessible, transparent, and impactful.
                </p>
                <p>
                  What started as a small initiative has grown into a movement of thousands 
                  of compassionate individuals coming together to support medical treatments, 
                  education, animal welfare, and more.
                </p>
                <p>
                  With our 0% platform fee policy, we ensure that every rupee you donate 
                  goes directly to those who need it. This commitment to transparency has 
                  earned us the trust of donors across India.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-light rounded-2xl p-8"
            >
              <h3 className="text-xl font-display font-bold text-foreground mb-6">Our Mission</h3>
              <ul className="space-y-4">
                {[
                  "Provide a transparent platform for charitable giving",
                  "Connect donors directly with verified causes",
                  "Ensure 100% of donations reach beneficiaries",
                  "Build a community of compassionate changemakers",
                  "Create lasting, measurable impact in communities",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-light flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">
              Milestones We've Achieved
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="shrink-0 w-20 text-right">
                  <span className="text-primary font-display font-bold">{milestone.year}</span>
                </div>
                <div className="relative pl-6 border-l-2 border-primary/30 pb-8 last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="font-display font-bold text-foreground mb-1">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
