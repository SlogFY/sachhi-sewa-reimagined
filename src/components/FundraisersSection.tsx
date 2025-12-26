import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCampaigns, Campaign } from "@/hooks/useCampaigns";
import DonationModal from "./DonationModal";

const formatCurrency = (amount: number) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

const FundraisersSection = () => {
  const { campaigns, isLoading, refetch } = useCampaigns();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const handleDonateClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDonationModalOpen(true);
  };

  const handleDonationComplete = () => {
    refetch();
  };

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
          <Button variant="outline" className="mt-6 md:mt-0 group" asChild>
            <Link to="/fundraisers">
              View All Fundraisers
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No active campaigns at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.slice(0, 6).map((campaign, index) => (
              <motion.div
                key={campaign.id}
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
                      src={campaign.image_url || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800"}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {campaign.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-primary">
                          {formatCurrency(Number(campaign.amount_raised))} raised
                        </span>
                        <span className="text-muted-foreground">
                          of {formatCurrency(Number(campaign.goal_amount))}
                        </span>
                      </div>
                      <Progress
                        value={(Number(campaign.amount_raised) / Number(campaign.goal_amount)) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Ongoing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {((Number(campaign.amount_raised) / Number(campaign.goal_amount)) * 100).toFixed(0)}% funded
                        </span>
                      </div>
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => handleDonateClick(campaign)}
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        campaign={selectedCampaign}
        onDonationComplete={handleDonationComplete}
      />
    </section>
  );
};

export default FundraisersSection;
