import { apiFetch } from "@/lib/config/axios";
import { LoginForm } from "@/pages/login/components/login-form";
import { useQuery } from "@tanstack/react-query";

export default function LoginPage() {
    const { data } = useQuery({
        queryFn: () => {
            return apiFetch.get("");
        },
        queryKey: ["test"],


    })
    console.log(data)

    return <div>
        <LoginForm />
    </div>
}