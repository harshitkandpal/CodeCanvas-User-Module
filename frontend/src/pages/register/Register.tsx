import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import { Link } from "react-router-dom"

export const Register: (React.FC) = () => {

    return(
        <div className="w-full min-h-[94.8vh] bg-background flex justify-center items-center">
            <Card className="w-full max-w-sm bg-secondary text-secondary-foreground shadow">
                <CardHeader>
                    <CardTitle>Login Into CodeCanvas</CardTitle>
                    <CardDescription>
                        Enter your details below to createz your account.
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" className="text-secondary-foreground"><Link to="/login">Log In</Link></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                id="email"
                                type="email"
                                placeholder="email@email.com"
                                required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="name">Username</label>
                                <Input
                                id="username"
                                type="name"
                                placeholder="username"
                                required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Confirm Password</Label>
                                <Input id="password2" type="password" required/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-3 bg-background-secondary">
                                <Label htmlFor="picture">Profile Pic</Label>
                                <Input id="picture" type="file"/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="bg-secondary flex-col gap-2">
                   <Button
                   type="submit"
                    className="w-full bg-secondary text-secondary-foreground hover:border-1"
                    >
                    Register
                    </Button>

                    <Button
                    className="w-full bg-primary text-primanry-foreground border-0 hover:border-1"
                    >
                    Continue with Google
                    </Button>

                </CardFooter>
            </Card>
        </div>
    )
}