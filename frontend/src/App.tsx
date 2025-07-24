import React, { useState } from "react";
import {Button} from "@/components/ui/button";


function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default theme is dark, type declaration added <"light" | "dark">

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  
  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
        <Button
          onClick={toggleTheme}
          className="mb-6 px-4 py-2 rounded bg-accent text-accent-foreground font-medium shadow"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </Button>
        <h1 className="text-4xl font-bold mb-4 font-display">Welcome to CodeCanvas</h1>
        <p className="text-lg mb-8 text-center max-w-xl">
          Your one-stop solution for all coding needs.
        </p>
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="bg-primary text-primary-foreground p-6 rounded-[var(--border-radius)] shadow">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <p>Sign up now to unlock all features.</p>
          </div>
          <div className="bg-secondary text-secondary-foreground p-6 rounded-[var(--border-radius)] shadow">
            <h2 className="text-xl font-semibold mb-2">Join Our Community</h2>
            <p>Connect with other developers and share your knowledge.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
