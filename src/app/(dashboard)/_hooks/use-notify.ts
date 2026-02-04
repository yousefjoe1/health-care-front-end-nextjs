// src/hooks/use-notify.ts
import { toast } from "sonner"

export const useNotify = () => {
    const success = (msg: string) => toast.success(msg);
    const error = (msg: string) => toast.error(msg || "حدث خطأ ما");

    return { success, error };
}