
import { RegistrationForm } from "@/components/features/register/RegistrationForm";

export default function RegisterPage() {
    return (
        <div className="container py-12 max-w-screen-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">IP Registry</h1>
                <p className="text-muted-foreground">
                    Turn your creative work into a programmable financial asset.
                </p>
            </div>
            <RegistrationForm />
        </div>
    );
}
