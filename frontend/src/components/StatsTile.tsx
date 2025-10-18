import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsTileProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: LucideIcon;
    trend?: { value: number; positive: boolean };
}

export function StatsTile({ title, value, description, icon: Icon, trend }: StatsTileProps) {
    return (
        <motion.div
            className="p-5 border rounded-2xl bg-card/80 backdrop-blur-xl shadow-card hover:shadow-elevated transition-all duration-300"
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 18, mass: 0.5 }}
        >
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-sm text-muted-foreground">{title}</div>
                    <div className="text-3xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{value}</div>
                    {description && <div className="text-xs text-muted-foreground">{description}</div>}
                </div>
                {Icon && (
                    <div className="h-10 w-10 rounded-xl bg-[hsl(var(--primary-light))] flex items-center justify-center shadow-card">
                        <Icon className="h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                )}
            </div>
            {trend && (
                <div className="text-xs mt-2">
                    <span className={trend.positive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--destructive))]"}>
                        {trend.positive ? "+" : ""}{trend.value}%
                    </span>
                    <span className="text-muted-foreground ml-2">since last month</span>
                </div>
            )}
        </motion.div>
    );
}
