import React, { useState, useEffect } from "react";
import { Moon, Star, Volume2, VolumeX, Send } from "lucide-react";

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Eid al-Fitr 2025 date (March 31, 2025)
    const eidDate = new Date("2025-03-31T08:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eidDate - now;

      // Check if countdown has ended
      if (distance < 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        clearInterval(timer);
        return;
      }

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById("eidMusic") as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const sendGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (greeting.trim()) {
      alert("Terima kasih telah mengirim ucapan Hari Raya!");
      setGreeting("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Audio Element */}
      <audio id="eidMusic" loop>
        <source
          src="https://res.cloudinary.com/dce6p47pg/video/upload/v1743338466/Download-MP3-Takbiran-1_desed1.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Moon className="inline-block mb-4 text-yellow-400" size={64} />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-yellow-400">
            Eid Mubarak
          </h1>
          <p className="text-2xl md:text-3xl mb-2">
            1446 Hijriah / 2025 Masehi
          </p>
          <p className="text-xl opacity-80">Taqabbalallahu Minna Wa Minkum</p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {[
            { label: "Hari", value: days },
            { label: "Jam", value: hours },
            { label: "Menit", value: minutes },
            { label: "Detik", value: seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {item.value}
              </div>
              <div className="text-sm uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Greeting Card Form */}
        <div className="max-w-md mx-auto bg-white/10 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-xl mb-4 text-center">Kirim Ucapan Hari Raya</h3>
          <form onSubmit={sendGreeting} className="space-y-4">
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full p-3 rounded bg-white/5 border border-white/20 focus:outline-none focus:border-yellow-400"
              placeholder="Tulis ucapan Hari Raya..."
              rows={4}
            />
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-emerald-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors"
            >
              <Send size={20} />
              Kirim Ucapan
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-white/60 text-sm">
        <p>
          © 2025 Eid al-Fitr Celebration. Made with ❤️ Muhammad Irfan Suherman
        </p>
      </footer>
    </div>
  );
}

export default App;
