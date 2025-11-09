"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getUserByEmail, updateUserByEmail } from "@/actions";
import BottomNav from "./bottomNav";

interface SettingsPageProps {
  onLogout: () => void;
  onNavigate: (
    page: "home" | "transfers" | "invest" | "analytics" | "settings"
  ) => void;
}

// Loading Spinner
function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Editable fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const identifier = localStorage.getItem("identifier");
      if (!identifier) return;
      setLoading(true);
      try {
        const data = await getUserByEmail(identifier);
        const user = data.user!;
        setUserData(user);

        // Populate editable fields
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setPhone(user.phone ?? "");
        setEmail(user.email ?? "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    const identifier = localStorage.getItem("identifier");
    if (!identifier) return;

    setLoading(true);
    try {
      const updated = await updateUserByEmail(identifier, {
        firstName,
        lastName,
        phone,
        email,
      });

      setUserData(updated);
      localStorage.setItem("identifier", email);
      toast.success("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32 relative">
      {loading && <LoadingOverlay />}

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="h-10 text-sm bg-transparent"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Editable fields */}
            <div>
              <Label className="mb-1">First Name</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-1">Last Name</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-1">Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <Label className="mb-1">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Read-only fields */}
            <div>
              <Label className="mb-1">Account Number</Label>
              <Input value={userData?.accountNumber ?? ""} readOnly />
            </div>

            <div>
              <Label className="mb-1">Account Type</Label>
              <Input value={userData?.accountType ?? ""} readOnly />
            </div>

            <Button className="w-full mt-4" onClick={handleSave}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <BottomNav />
      </main>
    </div>
  );
}
