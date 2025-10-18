import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StudentResults() {
    const results = [
        { course: "Mathematics", grade: "A" },
        { course: "Physics", grade: "B+" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Results & Grades</h1>
                <p className="text-muted-foreground">View your academic results.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {results.map((r, idx) => (
                            <motion.div key={idx} className="p-3 border rounded flex items-center justify-between"
                                whileHover={{ y: -1, scale: 1.005 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                            >
                                <div className="font-medium">{r.course}</div>
                                <div className="text-sm text-muted-foreground">{r.grade}</div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
