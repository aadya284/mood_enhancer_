import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Gamepad2, Heart, TimerReset } from "lucide-react";
import { Link } from "react-router-dom";

function BreathingGame() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    let step = 0; // 0-3 inhale, 4-7 hold, 8-15 exhale (box-ish breathing)
    const tick = () => {
      step = (step + 1) % 16;
      if (step < 4) setPhase("inhale");
      else if (step < 8) setPhase("hold");
      else setPhase("exhale");
      timerRef.current = window.setTimeout(tick, 1000);
    };
    timerRef.current = window.setTimeout(tick, 1000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [running]);

  return (
    <Card className="bg-white border border-black/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-black flex items-center gap-2">
          <Heart className="w-5 h-5" /> Guided Breathing
        </CardTitle>
        <CardDescription className="text-black/70">
          Follow the circle. Inhale, hold, and exhale to calm your mind.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-56 w-56">
            <div
              className={
                "absolute inset-0 rounded-full bg-black/10 border border-black/20" +
                (running ? " animate-pulse" : "")
              }
              style={{ animationDuration: "3s" }}
            />
            <div
              className={`absolute inset-6 rounded-full border-4 transition-all duration-1000 ${
                phase === "inhale"
                  ? "border-emerald-500"
                  : phase === "hold"
                  ? "border-blue-500"
                  : "border-rose-500"
              }`}
              style={{
                transform:
                  phase === "inhale"
                    ? "scale(1.1)"
                    : phase === "hold"
                    ? "scale(1.0)"
                    : "scale(0.9)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-xl font-semibold text-black capitalize">{phase}</div>
            </div>
          </div>
          <Button
            className="bg-black text-white hover:bg-black/90"
            onClick={() => setRunning((s) => !s)}
          >
            {running ? "Pause" : "Start"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ReactionGame() {
  const [state, setState] = useState<"idle" | "waiting" | "go" | "result">("idle");
  const [message, setMessage] = useState("Click Start and wait for green");
  const [color, setColor] = useState("bg-black/10");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const best = useMemo(() => {
    const v = localStorage.getItem("reaction.best");
    return v ? Number(v) : null;
  }, []);

  useEffect(() => {
    let to: number | null = null;
    if (state === "waiting") {
      setMessage("Wait for green...");
      setColor("bg-rose-500");
      const delay = 1000 + Math.random() * 3000;
      to = window.setTimeout(() => {
        setColor("bg-emerald-500");
        setMessage("Tap!");
        setState("go");
        setStartTime(performance.now());
      }, delay);
    }
    return () => {
      if (to) window.clearTimeout(to);
    };
  }, [state]);

  const handleClick = () => {
    if (state === "idle") {
      setState("waiting");
      return;
    }
    if (state === "waiting") {
      setMessage("Too soon! Restart.");
      setState("result");
      setColor("bg-black/10");
      setTime(null);
      return;
    }
    if (state === "go") {
      const t = performance.now() - (startTime || performance.now());
      setTime(t);
      setState("result");
      setColor("bg-black/10");
      const prev = localStorage.getItem("reaction.best");
      if (!prev || t < Number(prev)) localStorage.setItem("reaction.best", String(Math.round(t)));
      return;
    }
    if (state === "result") {
      setState("idle");
      setMessage("Click Start and wait for green");
      setTime(null);
    }
  };

  return (
    <Card className="bg-white border border-black/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-black flex items-center gap-2">
          <TimerReset className="w-5 h-5" /> Reaction Time
        </CardTitle>
        <CardDescription className="text-black/70">
          Tap when the box turns green. Improves focus and attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <div
            role="button"
            aria-label="reaction-box"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            className={`h-40 w-full max-w-sm rounded-md border border-black/10 ${color} grid place-items-center cursor-pointer select-none`}
          >
            <span className="text-lg font-medium text-white drop-shadow">{message}</span>
          </div>
          <div className="text-center text-black/80">
            <div className="text-sm">Current</div>
            <div className="text-2xl font-bold">
              {time ? `${Math.round(time)} ms` : "—"}
            </div>
            <div className="mt-2 text-sm">Best</div>
            <div className="text-xl font-semibold">{best ? `${best} ms` : "—"}</div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-black text-white hover:bg-black/90" onClick={handleClick}>
              {state === "idle" || state === "result" ? "Start" : state === "waiting" ? "Too soon?" : "Stop"}
            </Button>
            <Button
              variant="outline"
              className="border-black/30 text-black hover:bg-black/5"
              onClick={() => {
                localStorage.removeItem("reaction.best");
                window.location.reload();
              }}
            >
              Reset Best
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Games() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" className="text-black hover:bg-black/5">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-black">
            <Gamepad2 className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Mini Games</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <BreathingGame />
        <ReactionGame />
      </main>
    </div>
  );
}
