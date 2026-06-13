'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Browser support check krn layi
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true; 
      rec.interimResults = true; 
      rec.lang = 'pa-IN'; // Panjabi language support

      rec.onresult = (event) => {
  let finalTranscript = '';
  
  // Loop through all results generated so far in this session
  for (let i = 0; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript + ' ';
    }
  }

  // Mobile duplication nu rokਣ layi direct final transcript update kr rhe han
  if (finalTranscript) {
    setText(finalTranscript);
  }
};

      rec.onerror = (e) => {
        console.error(e);
        if (e.error === 'not-allowed') {
          setError('ਕਿਰਪਾ ਕਰਕੇ ਮਾਈਕ੍ਰੋਫੋਨ (Mic) ਦੀ ਪਰਮਿਸ਼ਨ ਦਿਓ।');
        }
      };

      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    } else {
      setError('ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਵੌਇਸ ਟਾਈਪਿੰਗ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ। ਕਿਰਪਾ ਕਰਕੇ Google Chrome use ਕਰੋ।');
    }
  }, []);

  const handleListen = () => {
    if (!recognition) return;
    setError('');

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const shareOnWhatsApp = () => {
    if (!text.trim()) return;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text.trim())}`;
    window.open(whatsappUrl, '_blank');
  };

  const clearText = () => {
    setText('');
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-[#fcf8f2] text-slate-800 font-sans selection:bg-orange-200">
      
      {/* Header section */}
      <div className="w-full max-w-xl px-4 pt-8 text-center">
        <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Quick Punjab Utility Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-950 mt-3 tracking-tight">
          ਪੰਜਾਬੀ ਬੋਲੋ ਤੇ ਲਿਖੋ
        </h1>
        <p className="text-sm md:text-base text-stone-600 mt-2 font-medium">
          ਬਟਨ ਦੱਬੋ, ਪੰਜਾਬੀ ਚ ਬੋਲੋ, ਤੇ ਸਿੱਧਾ WhatsApp ਤੇ ਭੇਜੋ
        </p>
      </div>

      {/* Main card box */}
      <div className="w-full max-w-xl px-4 py-4 my-auto flex flex-col gap-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm font-semibold rounded-xl border border-red-200 text-center">
            {error}
          </div>
        )}

        <div className="relative bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-200/60 p-4 transition-all focus-within:ring-2 focus-within:ring-orange-500">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 md:h-72 resize-none bg-transparent text-xl md:text-2xl text-stone-800 font-medium leading-relaxed placeholder:text-stone-300 focus:outline-none"
            placeholder="ਜਦੋਂ ਤੁਸੀਂ ਬੋਲੋਗੇ, ਤੁਹਾਡੀ ਪੰਜਾਬੀ ਟਾਈਪਿੰਗ ਇੱਥੇ ਦਿਖੇਗੀ..."
          />
          
          {text && (
            <button 
              onClick={clearText}
              className="absolute bottom-4 right-4 text-xs font-bold text-stone-400 hover:text-red-500 transition-colors uppercase bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100"
            >
              ਸਾਫ਼ ਕਰੋ (Clear)
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button 
            onClick={handleListen}
            className={`flex-1 py-4 px-6 rounded-2xl text-lg font-bold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-200 animate-pulse' 
                : 'bg-orange-600 hover:bg-orange-700 shadow-orange-700/20'
            }`}
          >
            {isListening ? (
              <>
                <span className="h-3 w-3 rounded-full bg-white block animate-ping"></span>
                ਸੁਣ ਰਿਹਾ ਹੈ... (Stop)
              </>
            ) : (
              <>🎙️ ਬੋਲਣਾ ਸ਼ੁਰੂ ਕਰੋ</>
            )}
          </button>

          <button 
            onClick={shareOnWhatsApp}
            disabled={!text.trim()}
            className={`flex-1 py-4 px-6 rounded-2xl text-lg font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
              text.trim()
                ? 'bg-green-600 hover:bg-green-700 shadow-green-700/20'
                : 'bg-stone-300 cursor-not-allowed shadow-none text-stone-500'
            }`}
          >
            💬 WhatsApp ਤੇ ਭੇਜੋ
          </button>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="pb-6 text-xs text-stone-400 font-medium">
        Made for Punjab 🌾 • No Login • 100% Free
      </div>

    </main>
  );
}