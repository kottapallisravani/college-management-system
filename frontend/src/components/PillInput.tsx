import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PillInputProps extends React.ComponentProps<typeof Input> {
    leftIcon?: React.ReactNode;
    showForgot?: boolean;
}

export default function PillInput({ leftIcon, showForgot, type = "text", ...props }: PillInputProps) {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="relative">
            <div className="relative">
                {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{leftIcon}</div>}
                <Input
                    {...props}
                    type={isPassword ? (visible ? "text" : "password") : type}
                    className={`pl-12 pr-12 rounded-full ${props.className ?? ""}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        aria-label={visible ? "Hide password" : "Show password"}
                    >
                        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                )}
            </div>
            {showForgot && (
                <div className="text-right mt-2">
                    <a className="text-sm text-muted-foreground underline">Forgot Password?</a>
                </div>
            )}
        </div>
    );
}
