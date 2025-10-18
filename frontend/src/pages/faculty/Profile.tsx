import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, BookOpen, Award, Calendar, Save, Upload } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FacultyProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const profile = {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@campusorbit.edu",
        phone: "+91 98765 43210",
        employeeId: "FAC001",
        department: "Computer Science",
        designation: "Associate Professor",
        joiningDate: "2018-07-15",
        qualification: "Ph.D. in Computer Science",
        specialization: "Machine Learning, Data Science",
        experience: "7 years",
        address: "Mumbai, Maharashtra, India",
        bio: "Experienced educator and researcher with a passion for machine learning and artificial intelligence. Published 15+ research papers in international journals.",
    };

    const courses = [
        { code: "CS301", name: "Data Structures", semester: "3", students: 45 },
        { code: "CS302", name: "Database Systems", semester: "3", students: 42 },
        { code: "CS401", name: "Machine Learning", semester: "4", students: 38 },
    ];

    const achievements = [
        { title: "Best Faculty Award", year: "2024", organization: "Campus Orbit University" },
        { title: "Research Excellence Award", year: "2023", organization: "IEEE" },
        { title: "Outstanding Teaching Award", year: "2022", organization: "Department of CSE" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-muted-foreground">View and manage your profile information.</p>
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
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                                <AvatarFallback>SJ</AvatarFallback>
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
                                    <p className="text-lg text-muted-foreground">{profile.designation}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="outline">{profile.employeeId}</Badge>
                                        <Badge>{profile.department}</Badge>
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
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Personal Details</TabsTrigger>
                    <TabsTrigger value="courses">My Courses</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                {/* Personal Details */}
                <TabsContent value="details" className="space-y-4">
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
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue={profile.email} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" defaultValue={profile.phone} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="employeeId">Employee ID</Label>
                                        <Input id="employeeId" defaultValue={profile.employeeId} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input id="department" defaultValue={profile.department} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="designation">Designation</Label>
                                        <Input id="designation" defaultValue={profile.designation} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="qualification">Qualification</Label>
                                        <Input id="qualification" defaultValue={profile.qualification} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="specialization">Specialization</Label>
                                        <Input id="specialization" defaultValue={profile.specialization} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="joiningDate">Joining Date</Label>
                                        <Input id="joiningDate" type="date" defaultValue={profile.joiningDate} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Experience</Label>
                                        <Input id="experience" defaultValue={profile.experience} disabled={!isEditing} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" defaultValue={profile.address} disabled={!isEditing} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea id="bio" rows={4} defaultValue={profile.bio} disabled={!isEditing} />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* My Courses */}
                <TabsContent value="courses" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Teaching Assignments</CardTitle>
                                    <Badge variant="outline" className="text-base">
                                        {courses.length} Courses
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {courses.map(course => (
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
                                                                <BookOpen className="h-6 w-6 text-primary" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-lg">{course.name}</h3>
                                                                <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                                                                    <span>Code: {course.code}</span>
                                                                    <span>•</span>
                                                                    <span>Semester {course.semester}</span>
                                                                    <span>•</span>
                                                                    <span>{course.students} Students</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" size="sm">View Details</Button>
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

                {/* Achievements */}
                <TabsContent value="achievements" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Awards & Recognition</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {achievements.map((achievement, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -2, scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 rounded-lg" style={{ background: "hsl(var(--chart-2) / 0.1)" }}>
                                                            <Award className="h-6 w-6" style={{ color: "hsl(var(--chart-2))" }} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                                            <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {achievement.year}
                                                                </span>
                                                                <span>•</span>
                                                                <span>{achievement.organization}</span>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline" style={{ background: "hsl(var(--chart-2) / 0.1)", borderColor: "hsl(var(--chart-2))" }}>
                                                            Award
                                                        </Badge>
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
            </Tabs>
        </div>
    );
}
