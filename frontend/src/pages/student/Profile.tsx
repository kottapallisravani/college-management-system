import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, BookOpen, Calendar, GraduationCap, Save, Upload } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const profile = {
        name: "John Smith",
        rollNo: "CS001",
        email: "john.smith@student.campusorbit.edu",
        phone: "+91 98765 43210",
        dob: "2002-05-15",
        bloodGroup: "O+",
        gender: "Male",
        course: "B.Tech Computer Science",
        semester: "3",
        section: "A",
        admissionYear: "2023",
        department: "Computer Science & Engineering",
        address: "Mumbai, Maharashtra, India",
        guardianName: "Robert Smith",
        guardianPhone: "+91 98765 43200",
        guardianRelation: "Father",
    };

    const academicInfo = {
        cgpa: "8.5",
        sgpa: "8.7",
        totalCredits: "90",
        attendancePercentage: "92",
        backlogs: "0",
    };

    const enrolledCourses = [
        { code: "CS301", name: "Data Structures", credits: 4, grade: "A" },
        { code: "CS302", name: "Database Systems", credits: 4, grade: "A-" },
        { code: "CS303", name: "Web Development", credits: 3, grade: "B+" },
        { code: "MA301", name: "Discrete Mathematics", credits: 3, grade: "A" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-muted-foreground">View and manage your personal and academic information.</p>
                </div>
                <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                >
                    {isEditing ? (
                        <>
                            <Save className="h-4 w-4" />
                            Save Changes
                        </>
                    ) : (
                        "Edit Profile"
                    )}
                </Button>
            </div>

            {/* Profile Header */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                                    <Upload className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                                    <p className="text-lg text-muted-foreground">{profile.course}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="outline">{profile.rollNo}</Badge>
                                        <Badge>Semester {profile.semester}</Badge>
                                        <Badge variant="outline">Section {profile.section}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Admission: {profile.admissionYear}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Academic Performance Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">{academicInfo.cgpa}</p>
                            <p className="text-sm text-muted-foreground mt-1">CGPA</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{academicInfo.sgpa}</p>
                            <p className="text-sm text-muted-foreground mt-1">Current SGPA</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{academicInfo.totalCredits}</p>
                            <p className="text-sm text-muted-foreground mt-1">Credits Earned</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold" style={{ color: "hsl(var(--success))" }}>{academicInfo.attendancePercentage}%</p>
                            <p className="text-sm text-muted-foreground mt-1">Attendance</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold" style={{ color: academicInfo.backlogs === "0" ? "hsl(var(--success))" : "hsl(var(--destructive))" }}>
                                {academicInfo.backlogs}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">Backlogs</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Details</TabsTrigger>
                    <TabsTrigger value="academic">Academic Info</TabsTrigger>
                    <TabsTrigger value="guardian">Guardian Details</TabsTrigger>
                </TabsList>

                {/* Personal Details */}
                <TabsContent value="personal" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" defaultValue={profile.name} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rollNo">Roll Number</Label>
                                        <Input id="rollNo" defaultValue={profile.rollNo} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue={profile.email} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" defaultValue={profile.phone} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input id="dob" type="date" defaultValue={profile.dob} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bloodGroup">Blood Group</Label>
                                        <Input id="bloodGroup" defaultValue={profile.bloodGroup} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Input id="gender" defaultValue={profile.gender} disabled={!isEditing} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" defaultValue={profile.address} disabled={!isEditing} />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Academic Info */}
                <TabsContent value="academic" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Academic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Course</Label>
                                        <Input defaultValue={profile.course} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Department</Label>
                                        <Input defaultValue={profile.department} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Current Semester</Label>
                                        <Input defaultValue={profile.semester} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Section</Label>
                                        <Input defaultValue={profile.section} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Admission Year</Label>
                                        <Input defaultValue={profile.admissionYear} disabled />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Current Semester Courses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {enrolledCourses.map(course => (
                                        <motion.div
                                            key={course.code}
                                            whileHover={{ y: -2, scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 rounded-lg bg-primary/10">
                                                                <BookOpen className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold">{course.name}</h3>
                                                                <p className="text-sm text-muted-foreground">{course.code}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Badge variant="outline">{course.credits} Credits</Badge>
                                                            <Badge style={{ background: "hsl(var(--success))", borderColor: "hsl(var(--success))" }}>
                                                                Grade: {course.grade}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Guardian Details */}
                <TabsContent value="guardian" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Guardian Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardianName">Guardian Name</Label>
                                        <Input id="guardianName" defaultValue={profile.guardianName} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="guardianRelation">Relation</Label>
                                        <Input id="guardianRelation" defaultValue={profile.guardianRelation} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="guardianPhone">Guardian Phone</Label>
                                        <Input id="guardianPhone" defaultValue={profile.guardianPhone} disabled={!isEditing} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
