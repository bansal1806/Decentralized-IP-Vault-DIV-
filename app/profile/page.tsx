"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
    User, 
    Mail, 
    Phone, 
    ShieldCheck, 
    Wallet, 
    Bell, 
    Lock, 
    Globe, 
    Download,
    CheckCircle2,
    XCircle,
    Clock,
    CreditCard,
    Key
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function ProfilePage() {
    const { toast } = useToast();
    const [kycStatus, setKycStatus] = useState<"verified" | "pending" | "not_started">("verified");
    const [walletConnected, setWalletConnected] = useState(true);
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        payout: true,
        investment: true,
    });

    const handleSave = () => {
        toast({
            variant: "success",
            title: "Settings Saved",
            description: "Your profile settings have been updated successfully.",
        });
    };

    return (
        <div className="container py-8 max-w-screen-2xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile & Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your account settings, KYC verification, and preferences
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" defaultValue="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" defaultValue="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="flex gap-2">
                                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                        <Button variant="outline" size="icon">
                                            <Mail className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="flex gap-2">
                                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                                        <Button variant="outline" size="icon">
                                            <Phone className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" defaultValue="United States" />
                                </div>
                                <Button onClick={handleSave}>Save Changes</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wallet className="w-5 h-5" />
                                    Wallet Connection
                                </CardTitle>
                                <CardDescription>
                                    Connect and manage your cryptocurrency wallets
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {walletConnected ? (
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                <Wallet className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">MetaMask</p>
                                                <p className="text-sm text-muted-foreground">0x71C7656EC7ab88b098defB751B7401B5f6d8976A2</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-green-500 border-green-500/50">
                                                Connected
                                            </Badge>
                                            <Button variant="outline" size="sm" onClick={() => setWalletConnected(false)}>
                                                Disconnect
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-muted-foreground mb-4">No wallet connected</p>
                                        <Button onClick={() => setWalletConnected(true)}>
                                            Connect Wallet
                                        </Button>
                                    </div>
                                )}
                                <Separator />
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Add Payment Method
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Wallet
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    Password & Authentication
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                                <Button>Update Password</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="w-5 h-5" />
                                    Two-Factor Authentication
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                    <div>
                                        <p className="font-semibold">2FA Status</p>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Button variant="outline">Enable 2FA</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div>
                                            <p className="font-medium">Current Session</p>
                                            <p className="text-sm text-muted-foreground">Windows • Chrome • New York, US</p>
                                        </div>
                                        <Badge variant="outline" className="text-green-500">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div>
                                            <p className="font-medium">Mobile Device</p>
                                            <p className="text-sm text-muted-foreground">iOS • Safari • Last active 2 days ago</p>
                                        </div>
                                        <Button variant="outline" size="sm">Revoke</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* KYC Tab */}
                    <TabsContent value="kyc" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    KYC Verification Status
                                </CardTitle>
                                <CardDescription>
                                    Complete KYC verification to unlock full platform access
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4 p-6 rounded-lg bg-muted/50">
                                    {kycStatus === "verified" && (
                                        <>
                                            <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-lg">Verified</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Your identity has been verified. You have full access to all platform features.
                                                </p>
                                            </div>
                                            <Badge className="bg-green-500">Verified</Badge>
                                        </>
                                    )}
                                    {kycStatus === "pending" && (
                                        <>
                                            <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                                                <Clock className="w-8 h-8" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-lg">Under Review</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Your documents are being reviewed. This usually takes 1-2 business days.
                                                </p>
                                            </div>
                                            <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                                Pending
                                            </Badge>
                                        </>
                                    )}
                                    {kycStatus === "not_started" && (
                                        <>
                                            <div className="p-3 rounded-full bg-muted text-muted-foreground">
                                                <XCircle className="w-8 h-8" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-lg">Not Started</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Complete KYC verification to start investing.
                                                </p>
                                            </div>
                                            <Button>Start Verification</Button>
                                        </>
                                    )}
                                </div>

                                {kycStatus !== "verified" && (
                                    <div className="space-y-4">
                                        <Separator />
                                        <div>
                                            <h3 className="font-semibold mb-4">Required Documents</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-4 rounded-lg border">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded bg-primary/10 text-primary">
                                                            <Globe className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Government ID</p>
                                                            <p className="text-sm text-muted-foreground">Passport, Driver's License, or National ID</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm">Upload</Button>
                                                </div>
                                                <div className="flex items-center justify-between p-4 rounded-lg border">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded bg-primary/10 text-primary">
                                                            <Mail className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Proof of Address</p>
                                                            <p className="text-sm text-muted-foreground">Utility bill or bank statement (last 3 months)</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm">Upload</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold mb-2">Why KYC?</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Required for investments over $10,000</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Enables instant withdrawals</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Compliance with SEC regulations</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="w-5 h-5" />
                                    Notification Preferences
                                </CardTitle>
                                <CardDescription>
                                    Choose how you want to be notified about important updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.email}
                                        onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                                        className="w-5 h-5 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg border">
                                    <div>
                                        <p className="font-medium">Push Notifications</p>
                                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.push}
                                        onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                                        className="w-5 h-5 rounded"
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <p className="font-semibold">Notification Types</p>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div>
                                            <p className="font-medium">Payout Notifications</p>
                                            <p className="text-sm text-muted-foreground">When you receive royalty payouts</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notifications.payout}
                                            onChange={(e) => setNotifications({ ...notifications, payout: e.target.checked })}
                                            className="w-5 h-5 rounded"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                        <div>
                                            <p className="font-medium">Investment Updates</p>
                                            <p className="text-sm text-muted-foreground">New investment opportunities</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notifications.investment}
                                            onChange={(e) => setNotifications({ ...notifications, investment: e.target.checked })}
                                            className="w-5 h-5 rounded"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleSave}>Save Preferences</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}
