import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast({ title: "Signed in (demo)", description: "Authentication not yet connected." });
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-white grid place-items-center px-4">
      <Card className="w-full max-w-md bg-zinc-900 border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Sign in</CardTitle>
          <CardDescription className="text-white/70">Welcome back. Enter your details to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required className="bg-black text-white placeholder:text-white/40" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required className="bg-black text-white placeholder:text-white/40" />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">Sign in</Button>
          </form>
          <div className="mt-4 text-sm text-center text-white/70">
            Don't have an account? <Link to="/signup" className="underline">Create one</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
