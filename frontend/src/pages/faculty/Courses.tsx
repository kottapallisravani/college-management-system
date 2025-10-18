import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function FacultyCourses() {
    const courses = [
        { code: "CS101", title: "Computer Science 101" },
        { code: "DS201", title: "Data Structures" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Courses</h1>
                <p className="text-muted-foreground">View and manage your assigned courses.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {courses.map((c) => (
                            <motion.div key={c.code} className="p-3 border rounded flex items-center justify-between"
                                whileHover={{ y: -1, scale: 1.005 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                            >
                                <div>
                                    <div className="font-medium">{c.title}</div>
                                    <div className="text-sm text-muted-foreground">{c.code}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
