import { RegistrationForm } from "@/components/customUI/registration-form"

export const RegistrationPage: (React.FC) = () => {
    return(
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <RegistrationForm/>
            </div>
        </div>
    )
}