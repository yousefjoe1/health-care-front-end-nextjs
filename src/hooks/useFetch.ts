import { fetchData } from "@/app/(marketing)/_actions/fetchData";
import { useQuery } from "@tanstack/react-query";

export function useFetch(url: string) {
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            fetchData(url)
        },
    });
}