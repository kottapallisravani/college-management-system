import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function FacultyAssignments() {
    const assignments = [
        { id: "A1", title: "Assignment 3", course: "CS101", due: "2 days" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Assignments</h1>
                <p className="text-muted-foreground">Create and manage assignments.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {assignments.map((a) => (
                            <motion.div key={a.id} className="p-3 border rounded"
                                whileHover={{ y: -1, scale: 1.005 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                            >
                                <div className="font-medium">{a.title}</div>
                                <div className="text-sm text-muted-foreground">{a.course} • Due {a.due}</div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
