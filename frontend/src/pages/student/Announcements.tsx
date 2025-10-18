import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StudentAnnouncements() {
    const announcements = [
        { id: 1, title: "Mid-terms", body: "Mid-term dates published." },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Announcements</h1>
                <p className="text-muted-foreground">View campus announcements.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {announcements.map((a) => (
                            <motion.div key={a.id} className="p-3 border rounded"
                                whileHover={{ y: -1, scale: 1.005 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.6 }}
                            >
                                <div className="font-medium">{a.title}</div>
                                <div className="text-sm text-muted-foreground">{a.body}</div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
