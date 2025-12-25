import { motion } from "framer-motion";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const fundraisers = [
  {
    id: 1,
    title: "Save Ranjan From Sigmoid Colon Cancer",
    description: "Mr. Ranjan Kumar Sahani, a 33-year-old, has been diagnosed with recurrent adenocarcinoma. Help him get the treatment he desperately needs.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    raised: 178002,
    goal: 3676000,
    daysLeft: 15,
    donors: 42,
    category: "Medical",
  },
  {
    id: 2,
    title: "Help Priya Complete Her Engineering",
    description: "Priya comes from a humble background and dreams of becoming an engineer. Support her education journey.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    raised: 125000,
    goal: 250000,
    daysLeft: 30,
    donors: 28,
    category: "Education",
  },
  {
    id: 3,
    title: "Rescue & Rehabilitation for Street Animals",
    description: "Help us provide medical care, shelter, and food for stray animals in Delhi NCR region.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    raised: 89000,
    goal: 150000,
    daysLeft: 20,
    donors: 65,
    category: "Animal Welfare",
  },
];

const formatCurrency = (amount: number) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

const FundraisersSection = () => {
  return (
    <section id="fundraisers" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Active Campaigns
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3">
              Our Top Fundraisers
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              These campaigns need your support right now. Every contribution brings hope.
            </p>
          </div>
          <Button variant="outline" className="mt-6 md:mt-0 group">
            View All Fundraisers
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fundraisers.map((fundraiser, index) => (
            <motion.div
              key={fundraiser.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/30">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={fundraiser.image}
                    alt={fundraiser.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {fundraiser.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {fundraiser.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {fundraiser.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-primary">
                        {formatCurrency(fundraiser.raised)} raised
                      </span>
                      <span className="text-muted-foreground">
                        of {formatCurrency(fundraiser.goal)}
                      </span>
                    </div>
                    <Progress
                      value={(fundraiser.raised / fundraiser.goal) * 100}
                      className="h-2"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{fundraiser.daysLeft} days left</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{fundraiser.donors} donors</span>
                    </div>
                  </div>

                  <Button variant="primary" className="w-full">
                    Donate Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundraisersSection;
