import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function FacultyStudents() {
    const students = [
        { id: "S001", name: "Alice Johnson" },
        { id: "S002", name: "Bob Smith" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Student List</h1>
                <p className="text-muted-foreground">View students enrolled in your courses.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {students.map((s) => (
                            <motion.div key={s.id} className="p-3 border rounded flex items-center justify-between"
                                whileHover={{ y: -1, scale: 1.005 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                            >
                                <div>
                                    <div className="font-medium">{s.name}</div>
                                    <div className="text-sm text-muted-foreground">{s.id}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
