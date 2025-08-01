import { Link } from "react-router-dom"

export const HomePage : React.FC = () => {



    return (
        <div>
            <div className="min-h-[94.8vh] bg-background text-foreground flex flex-col items-center justify-center px-4">
        
     
        <h1 className="text-4xl font-bold mb-4 font-display">Welcome to CodeCanvas</h1>
        <p className="text-lg mb-8 text-center max-w-xl">
          Your one-stop solution for all coding needs.
        </p>
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Link to="/register"className="bg-primary text-primary-foreground p-6 rounded-[var(--border-radius)] shadow">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p>Sign up now to unlock all features.</p>
          </Link>
          <Link to="/community" className="bg-secondary text-secondary-foreground p-6 rounded-[var(--border-radius)] shadow">
            <h2 className="text-xl font-semibold mb-2">Join Our Community</h2>
            <p>Connect with other developers and share your knowledge.</p>
          </Link>
        </div>
      </div>
        </div>
    )
}