import React from "react";
import { API_BASE } from "@/lib/api";

type MealName = "Breakfast" | "Lunch" | "Snacks" | "Dinner";
type DayName = string;
type MealMap = Record<DayName, Record<MealName, string[]>>;
type MessRow = { day?: string; Day?: string; meal?: MealName; Meal?: MealName; item?: string; Item?: string };

const sampleData: MealMap = {
    Monday: {
        Breakfast: ["Bread", "Jam", "Boiled Egg", "Tea / Coffee"],
        Lunch: ["Rice", "Dal Tadka", "Veg Curry", "Pickle"],
        Snacks: ["Tea / Coffee", "Pakoda"],
        Dinner: ["Chapathi", "Paneer Curry", "Rasam", "Rice"],
    },
    Tuesday: {
        Breakfast: ["Idli", "Sambar", "Chutney"],
        Lunch: ["Luchi", "Aloo Dum", "Dal"],
        Snacks: ["Tea / Coffee", "Samosa"],
        Dinner: ["Ghee Pulao", "Chappathi", "Veg Salad"],
    },
    Wednesday: {
        Breakfast: ["Upma", "Banana", "Tea"],
        Lunch: ["Curd Rice", "Fryums", "Pickle"],
        Snacks: ["Tea / Coffee", "Biscuits"],
        Dinner: ["Rice", "Dal", "Veg Curry"],
    },
    Thursday: {
        Breakfast: ["Bread", "Butter", "Jam", "Tea / Coffee"],
        Lunch: ["Luchi", "Kashmiri Dum Aloo", "Steamed Rice", "Butter Milk"],
        Snacks: ["Pani Poori", "Tea / Coffee"],
        Dinner: ["Ghee Pulao", "Chappathi", "Muttar Paneer", "Ice Cream"],
    },
    Friday: {
        Breakfast: ["Pongal", "Sambar", "Chutney"],
        Lunch: ["Onion Pulao", "Dal Fry", "Poriyal"],
        Snacks: ["Tea / Coffee"],
        Dinner: ["Rice", "Rasam", "Fryums"],
    },
    Saturday: {
        Breakfast: ["Aloo Paratha", "Curd", "Pickle"],
        Lunch: ["Biryani", "Raita"],
        Snacks: ["Tea / Coffee", "Vada"],
        Dinner: ["Chapathi", "Dal", "Sabzi"],
    },
    Sunday: {
        Breakfast: ["Poha", "Tea"],
        Lunch: ["Special Rice", "Curries"],
        Snacks: ["Tea / Coffee"],
        Dinner: ["Light Dinner"],
    },
};

export interface MessTableProps {
    role?: "admin" | "faculty" | "student";
}

export const MessTable: React.FC<MessTableProps> = ({ role = "student" }) => {
    const [data, setData] = React.useState<MealMap | null>(null);
    const days = React.useMemo(() => Object.keys(data || sampleData), [data]);
    const [activeDay, setActiveDay] = React.useState<string>(days[0] || "Monday");

    const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/mess`);
                if (!res.ok) throw new Error("fail");
                const rows: MessRow[] = await res.json();
                if (rows.length === 0) return;
                const map: MealMap = {} as MealMap;
                for (const r of rows) {
                    const d = (r.day || r.Day) as DayName | undefined;
                    const m = (r.meal || r.Meal) as MealName | undefined;
                    const it = (r.item || r.Item) as string | undefined;
                    if (!d || !m || !it) continue;
                    if (!map[d]) {
                        map[d] = { Breakfast: [], Lunch: [], Snacks: [], Dinner: [] };
                    }
                    const list = map[d][m] ?? [];
                    list.push(it);
                    map[d][m] = list;
                }
                setData(map);
                const ds = Object.keys(map);
                if (ds.length) setActiveDay(ds[0]);
            } catch {
                // ignore, will fallback
            }
        };
        load();
    }, []);

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-heading" style={{ color: "hsl(var(--foreground))" }}>
                        What’s in Mess
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {role?.charAt(0).toUpperCase() + role?.slice(1)} view — weekly menu
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-sm" style={{ background: "hsl(var(--sidebar-background))" }}>
                        {role?.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
                {days.map((d) => (
                    <button
                        key={d}
                        onClick={() => setActiveDay(d)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${d === activeDay ? "shadow-card" : ""}`}
                        style={
                            d === activeDay
                                ? { background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
                                : { background: "hsl(var(--sidebar-background))", color: "hsl(var(--muted-foreground))" }
                        }
                    >
                        {d}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {meals.map((meal) => (
                    <div key={meal} className="rounded-lg p-4" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-lg font-semibold" style={{ color: "hsl(var(--foreground))" }}>{meal}</h3>
                            <div className="text-xs font-medium rounded-md px-3 py-1" style={{ background: "hsl(var(--primary-light))", color: "hsl(var(--foreground))" }}>Now</div>
                        </div>

                        <div className="space-y-2">
                            {(data ?? sampleData)[activeDay]?.[meal as MealName]?.map((item) => (
                                <div key={item} className="rounded-md px-3 py-2" style={{ background: "hsl(var(--sidebar-background))", border: "1px solid hsl(var(--sidebar-border))" }}>
                                    <span style={{ color: "hsl(var(--foreground))" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessTable;
