import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Bell, Shield, Database, Mail, Users, Globe, Palette, Save } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminSettings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);
    const [autoBackup, setAutoBackup] = useState(true);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Configure system settings, security, and preferences.</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="backup">Backup</TabsTrigger>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <SettingsIcon className="h-5 w-5" />
                                    <CardTitle>General Settings</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="institution-name">Institution Name</Label>
                                    <Input id="institution-name" placeholder="Enter institution name" defaultValue="Campus Orbit University" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Admin Email</Label>
                                    <Input id="admin-email" type="email" placeholder="admin@campus.edu" defaultValue="admin@campusorbit.edu" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="asia-kolkata">
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                                            <SelectItem value="utc">UTC</SelectItem>
                                            <SelectItem value="america-new-york">America/New_York (EST)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="academic-year">Academic Year</Label>
                                    <Select defaultValue="2025-2026">
                                        <SelectTrigger id="academic-year">
                                            <SelectValue placeholder="Select academic year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2025-2026">2025-2026</SelectItem>
                                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                                            <SelectItem value="2023-2024">2023-2024</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    <CardTitle>Notification Preferences</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-notifications">Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
                                    </div>
                                    <Switch
                                        id="email-notifications"
                                        checked={emailNotifications}
                                        onCheckedChange={setEmailNotifications}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="push-notifications">Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                                    </div>
                                    <Switch
                                        id="push-notifications"
                                        checked={pushNotifications}
                                        onCheckedChange={setPushNotifications}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notification-frequency">Notification Frequency</Label>
                                    <Select defaultValue="immediate">
                                        <SelectTrigger id="notification-frequency">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="immediate">Immediate</SelectItem>
                                            <SelectItem value="daily">Daily Digest</SelectItem>
                                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="gap-2">
                                    <Save className="h-4 w-4" />
                                    Save Preferences
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    <CardTitle>Security Settings</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Switch
                                        id="two-factor"
                                        checked={twoFactorAuth}
                                        onCheckedChange={setTwoFactorAuth}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                    <Input id="session-timeout" type="number" defaultValue="30" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-policy">Password Policy</Label>
                                    <Select defaultValue="strong">
                                        <SelectTrigger id="password-policy">
                                            <SelectValue placeholder="Select policy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weak">Weak (6+ characters)</SelectItem>
                                            <SelectItem value="medium">Medium (8+ characters, mixed case)</SelectItem>
                                            <SelectItem value="strong">Strong (12+ characters, mixed case, numbers, symbols)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="gap-2">
                                    <Save className="h-4 w-4" />
                                    Update Security
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        { device: "Chrome on Windows", location: "Mumbai, India", lastActive: "Active now" },
                                        { device: "Safari on MacBook", location: "Delhi, India", lastActive: "2 hours ago" }
                                    ].map((session, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{session.device}</p>
                                                <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                                            </div>
                                            <Button variant="outline" size="sm">Revoke</Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Backup */}
                <TabsContent value="backup" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    <CardTitle>Backup & Restore</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="auto-backup">Automatic Backups</Label>
                                        <p className="text-sm text-muted-foreground">Schedule regular database backups</p>
                                    </div>
                                    <Switch
                                        id="auto-backup"
                                        checked={autoBackup}
                                        onCheckedChange={setAutoBackup}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                                    <Select defaultValue="daily">
                                        <SelectTrigger id="backup-frequency">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="default">Create Backup Now</Button>
                                    <Button variant="outline">Restore from Backup</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Backups</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        { date: "2025-10-17 08:00 AM", size: "45.6 MB", status: "success" },
                                        { date: "2025-10-16 08:00 AM", size: "44.2 MB", status: "success" },
                                        { date: "2025-10-15 08:00 AM", size: "43.8 MB", status: "success" }
                                    ].map((backup, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Database className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{backup.date}</p>
                                                    <p className="text-sm text-muted-foreground">{backup.size}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="default" style={{ background: "hsl(var(--success))", borderColor: "hsl(var(--success))" }}>
                                                    {backup.status}
                                                </Badge>
                                                <Button variant="outline" size="sm">Download</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* User Management */}
                <TabsContent value="users" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <CardTitle>User Roles & Permissions</CardTitle>
                                    </div>
                                    <Button size="sm">Add New Role</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        { role: "Super Admin", users: 2, permissions: ["All Access"], color: "hsl(var(--destructive))" },
                                        { role: "Admin", users: 5, permissions: ["Manage Users", "View Reports", "Edit Content"], color: "hsl(var(--primary))" },
                                        { role: "Faculty", users: 86, permissions: ["Grade Students", "View Courses", "Upload Content"], color: "hsl(var(--success))" },
                                        { role: "Student", users: 1245, permissions: ["View Courses", "Submit Assignments", "View Grades"], color: "hsl(var(--chart-2))" }
                                    ].map((roleData, idx) => (
                                        <Card key={idx}>
                                            <CardContent className="pt-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 rounded-lg" style={{ background: `${roleData.color} / 0.1` }}>
                                                            <Users className="h-5 w-5" style={{ color: roleData.color }} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{roleData.role}</h3>
                                                            <p className="text-sm text-muted-foreground">{roleData.users} users</p>
                                                            <div className="flex gap-2 mt-2">
                                                                {roleData.permissions.map((perm, pidx) => (
                                                                    <Badge key={pidx} variant="outline" className="text-xs">{perm}</Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                        <Button variant="outline" size="sm">View Users</Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
