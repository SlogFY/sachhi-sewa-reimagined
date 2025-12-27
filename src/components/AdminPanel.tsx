import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, LogOut, Users, IndianRupee, TrendingUp, Loader2, Clock, Check, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  receipt_number: string;
  created_at: string;
  campaigns: {
    title: string;
  };
}

interface Campaign {
  id: string;
  title: string;
  category: string;
  goal_amount: number;
  amount_raised: number;
  is_active: boolean;
}

interface FundraiserRequest {
  id: string;
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  title: string;
  description: string;
  category: string;
  goal_amount: number;
  story: string | null;
  image_url: string | null;
  video_url: string | null;
  status: string;
  created_at: string;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"donations" | "campaigns" | "requests" | "add">("donations");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [requests, setRequests] = useState<FundraiserRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    category: "",
    goal_amount: "",
    image_url: "",
  });

  const categories = ["Medical", "Education", "Animal Welfare", "Environment", "Disaster Relief", "Community"];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch donations with campaign info
      const { data: donationsData, error: donationsError } = await supabase
        .from("donations")
        .select(`
          id,
          donor_name,
          donor_email,
          amount,
          receipt_number,
          created_at,
          campaigns (title)
        `)
        .order("created_at", { ascending: false });

      if (donationsError) throw donationsError;
      setDonations(donationsData || []);

      // Fetch campaigns
      const { data: campaignsData, error: campaignsError } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (campaignsError) throw campaignsError;
      setCampaigns(campaignsData || []);

      // Fetch fundraiser requests
      const { data: requestsData, error: requestsError } = await supabase
        .from("fundraiser_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (requestsError) throw requestsError;
      setRequests(requestsData || []);
    } catch (error: any) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleAddCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCampaign.title || !newCampaign.description || !newCampaign.category || !newCampaign.goal_amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("campaigns")
        .insert({
          title: newCampaign.title,
          description: newCampaign.description,
          category: newCampaign.category,
          goal_amount: parseFloat(newCampaign.goal_amount),
          image_url: newCampaign.image_url || null,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign created successfully",
      });

      setNewCampaign({
        title: "",
        description: "",
        category: "",
        goal_amount: "",
        image_url: "",
      });
      setActiveTab("campaigns");
      fetchData();
    } catch (error: any) {
      console.error("Create campaign error:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveRequest = async (request: FundraiserRequest) => {
    try {
      // Create campaign from request
      const { error: campaignError } = await supabase
        .from("campaigns")
        .insert({
          title: request.title,
          description: request.description,
          category: request.category,
          goal_amount: request.goal_amount,
          image_url: request.image_url,
        });

      if (campaignError) throw campaignError;

      // Update request status
      const { error: updateError } = await supabase
        .from("fundraiser_requests")
        .update({ status: "approved" })
        .eq("id", request.id);

      if (updateError) throw updateError;

      toast({
        title: "Approved!",
        description: "The fundraiser is now live.",
      });
      fetchData();
    } catch (error: any) {
      console.error("Approve error:", error);
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from("fundraiser_requests")
        .update({ status: "rejected" })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Rejected",
        description: "The request has been rejected.",
      });
      fetchData();
    } catch (error: any) {
      console.error("Reject error:", error);
      toast({
        title: "Error",
        description: "Failed to reject request",
        variant: "destructive",
      });
    }
  };

  const pendingRequests = requests.filter(r => r.status === "pending");
  const totalDonations = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalCampaigns = campaigns.length;
  const totalDonors = new Set(donations.map(d => d.donor_email)).size;

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background flex flex-col"
        >
          {/* Header */}
          <div className="bg-card border-b border-border shrink-0">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Donations</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(totalDonations)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Active Campaigns</p>
                    <p className="text-2xl font-bold text-foreground">{totalCampaigns}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Donors</p>
                    <p className="text-2xl font-bold text-foreground">{totalDonors}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={activeTab === "donations" ? "primary" : "outline"}
                onClick={() => setActiveTab("donations")}
              >
                Donations
              </Button>
              <Button
                variant={activeTab === "campaigns" ? "primary" : "outline"}
                onClick={() => setActiveTab("campaigns")}
              >
                Campaigns
              </Button>
              <Button
                variant={activeTab === "requests" ? "primary" : "outline"}
                onClick={() => setActiveTab("requests")}
                className="relative"
              >
                <Clock className="w-4 h-4 mr-2" />
                Pending Requests
                {pendingRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {pendingRequests.length}
                  </span>
                )}
              </Button>
              <Button
                variant={activeTab === "add" ? "primary" : "outline"}
                onClick={() => setActiveTab("add")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Campaign
              </Button>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <>
                {activeTab === "donations" && (
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Donor Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Receipt No</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No donations yet
                            </TableCell>
                          </TableRow>
                        ) : (
                          donations.map((donation) => (
                            <TableRow key={donation.id}>
                              <TableCell className="font-medium">{donation.donor_name}</TableCell>
                              <TableCell>{donation.donor_email}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{donation.campaigns?.title}</TableCell>
                              <TableCell className="text-primary font-semibold">
                                {formatCurrency(Number(donation.amount))}
                              </TableCell>
                              <TableCell className="font-mono text-sm">{donation.receipt_number}</TableCell>
                              <TableCell>
                                {new Date(donation.created_at).toLocaleDateString("en-IN")}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {activeTab === "campaigns" && (
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Goal</TableHead>
                          <TableHead>Raised</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaigns.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No campaigns yet
                            </TableCell>
                          </TableRow>
                        ) : (
                          campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                              <TableCell className="font-medium max-w-[200px] truncate">{campaign.title}</TableCell>
                              <TableCell>{campaign.category}</TableCell>
                              <TableCell>{formatCurrency(Number(campaign.goal_amount))}</TableCell>
                              <TableCell className="text-primary font-semibold">
                                {formatCurrency(Number(campaign.amount_raised))}
                              </TableCell>
                              <TableCell>
                                {((Number(campaign.amount_raised) / Number(campaign.goal_amount)) * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  campaign.is_active 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {campaign.is_active ? "Active" : "Inactive"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {activeTab === "requests" && (
                  <div className="space-y-4">
                    {requests.length === 0 ? (
                      <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
                        No fundraiser requests yet
                      </div>
                    ) : (
                      requests.map((request) => (
                        <div
                          key={request.id}
                          className="bg-card rounded-xl border border-border p-6"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  request.status === "pending"
                                    ? "bg-yellow-500/10 text-yellow-600"
                                    : request.status === "approved"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-destructive/10 text-destructive"
                                }`}>
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(request.created_at).toLocaleDateString("en-IN")}
                                </span>
                              </div>
                              <h3 className="text-lg font-display font-bold text-foreground mb-1">
                                {request.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {request.description}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Requester:</span>{" "}
                                  <span className="font-medium text-foreground">{request.requester_name}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Email:</span>{" "}
                                  <span className="text-foreground">{request.requester_email}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Category:</span>{" "}
                                  <span className="text-foreground">{request.category}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Goal:</span>{" "}
                                  <span className="font-semibold text-primary">{formatCurrency(Number(request.goal_amount))}</span>
                                </div>
                              </div>
                              {request.image_url && (
                                <div className="mt-3">
                                  <img
                                    src={request.image_url}
                                    alt={request.title}
                                    className="w-32 h-24 object-cover rounded-lg"
                                  />
                                </div>
                              )}
                            </div>
                            {request.status === "pending" && (
                              <div className="flex gap-2 shrink-0">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleApproveRequest(request)}
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRejectRequest(request.id)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "add" && (
                  <div className="bg-card rounded-xl border border-border p-6 max-w-2xl">
                    <h2 className="text-xl font-display font-bold text-foreground mb-6">Create New Campaign</h2>
                    <form onSubmit={handleAddCampaign} className="space-y-5">
                      <div>
                        <Label htmlFor="title" className="text-foreground">Campaign Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter campaign title"
                          value={newCampaign.title}
                          onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-foreground">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your campaign..."
                          value={newCampaign.description}
                          onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                          className="mt-1"
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="category" className="text-foreground">Category *</Label>
                          <Select
                            value={newCampaign.category}
                            onValueChange={(value) => setNewCampaign({ ...newCampaign, category: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="goal" className="text-foreground">Goal Amount (₹) *</Label>
                          <Input
                            id="goal"
                            type="number"
                            placeholder="Enter goal amount"
                            value={newCampaign.goal_amount}
                            onChange={(e) => setNewCampaign({ ...newCampaign, goal_amount: e.target.value })}
                            className="mt-1"
                            min="1"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="image" className="text-foreground">Image URL (Optional)</Label>
                        <Input
                          id="image"
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={newCampaign.image_url}
                          onChange={(e) => setNewCampaign({ ...newCampaign, image_url: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Campaign
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
