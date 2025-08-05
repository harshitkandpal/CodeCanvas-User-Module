import React, {useState} from "react"
import { RegistrationForm } from "@/components/customUI/registration-form"
import { InputOTP } from "@/components/ui/input-otp"


export const RegistrationPage: (React.FC) = () => {
    const [registeredUser, setRegisteredUser] = useState(null)
    const [otpSent, setOptSent] = useState(false)
    const [otp, setOtp] = useState("")

    return(
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {!otpSent ? (
                    <RegistrationForm setOtpSent={setOptSent} />
                ) : (
                    <InputOTP
                        value={otp}
                        onChange={(newValue: string) => setOtp(newValue)}
                        maxLength={6}
                    >
                        <span>Enter your OTP</span>
                    </InputOTP>
                )}
            </div>
        </div>
    )
}