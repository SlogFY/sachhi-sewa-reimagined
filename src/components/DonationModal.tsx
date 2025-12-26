import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, CheckCircle, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Campaign {
  id: string;
  title: string;
  goal_amount: number;
  amount_raised: number;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  onDonationComplete: () => void;
}

interface DonationReceipt {
  receipt_number: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  campaign_title: string;
  date: string;
}

const DonationModal = ({ isOpen, onClose, campaign, onDonationComplete }: DonationModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaign) return;
    
    if (!formData.name || !formData.email || !formData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setStep("processing");

    try {
      const { data, error } = await supabase
        .from("donations")
        .insert({
          campaign_id: campaign.id,
          donor_name: formData.name,
          donor_email: formData.email,
          donor_phone: formData.phone || null,
          amount: amount,
          message: formData.message || null,
          receipt_number: "TEMP", // Will be replaced by trigger
        })
        .select()
        .single();

      if (error) throw error;

      setReceipt({
        receipt_number: data.receipt_number,
        donor_name: formData.name,
        donor_email: formData.email,
        amount: amount,
        campaign_title: campaign.title,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });

      setStep("success");
      onDonationComplete();
    } catch (error: any) {
      console.error("Donation error:", error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
      setStep("form");
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({ name: "", email: "", phone: "", amount: "", message: "" });
    setReceipt(null);
    onClose();
  };

  const downloadReceipt = () => {
    if (!receipt) return;
    
    const receiptContent = `
=====================================
         DONATION RECEIPT
=====================================

Receipt No: ${receipt.receipt_number}
Date: ${receipt.date}

Donor Information:
Name: ${receipt.donor_name}
Email: ${receipt.donor_email}

Donation Details:
Campaign: ${receipt.campaign_title}
Amount: ₹${receipt.amount.toLocaleString("en-IN")}

=====================================
Thank you for your generous donation!
SacchiSewa Foundation
=====================================
    `.trim();

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donation-receipt-${receipt.receipt_number}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const predefinedAmounts = [500, 1000, 2500, 5000];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  {step === "success" ? "Thank You!" : "Make a Donation"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === "form" && campaign && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground">Donating to</p>
                    <p className="font-semibold text-foreground line-clamp-2">{campaign.title}</p>
                  </div>

                  {/* Predefined Amounts */}
                  <div>
                    <Label className="text-foreground">Select Amount</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setFormData({ ...formData, amount: amt.toString() })}
                          className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.amount === amt.toString()
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border hover:border-primary text-foreground"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="amount" className="text-foreground">Custom Amount (₹) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="mt-1"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message of support..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    Donate ₹{formData.amount || "0"}
                  </Button>
                </form>
              )}

              {step === "processing" && (
                <div className="py-12 text-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                  <p className="text-foreground font-medium">Processing your donation...</p>
                  <p className="text-muted-foreground text-sm mt-2">Please wait a moment</p>
                </div>
              )}

              {step === "success" && receipt && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    Donation Successful!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your generous contribution of ₹{receipt.amount.toLocaleString("en-IN")}
                  </p>

                  <div className="bg-muted rounded-xl p-4 text-left mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Receipt Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Receipt No:</span>
                        <span className="font-medium text-foreground">{receipt.receipt_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="text-foreground">{receipt.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold text-primary">₹{receipt.amount.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={downloadReceipt} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                    <Button variant="primary" onClick={handleClose} className="flex-1">
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
