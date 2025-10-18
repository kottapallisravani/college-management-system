import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FacultyAnnouncements() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Announcements</h1>
                <p className="text-muted-foreground">Post announcements for students.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Create Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">A simple announcement composer will be provided here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
