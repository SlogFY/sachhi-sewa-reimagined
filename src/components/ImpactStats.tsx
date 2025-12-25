import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, HandHeart, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Heart,
    value: 1000,
    suffix: "+",
    label: "Lives Transformed",
    description: "People helped through our campaigns",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Active Donors",
    description: "Generous supporters in our community",
  },
  {
    icon: HandHeart,
    value: 100,
    suffix: "+",
    label: "Successful Campaigns",
    description: "Fundraisers that reached their goals",
  },
  {
    icon: TrendingUp,
    value: 50,
    suffix: "L+",
    prefix: "₹",
    label: "Funds Raised",
    description: "Total amount raised for causes",
  },
];

const Counter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const ImpactStats = () => {
  return (
    <section className="py-20 bg-gradient-soft relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">
            Making a Real Difference
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Every donation, no matter how small, creates ripples of change across communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/30 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-4xl font-display font-bold text-foreground mb-1">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
