'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true; 
      rec.interimResults = true; 
      rec.lang = 'pa-IN'; 

      rec.onresult = (event) => {
        let speechText = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            speechText += event.results[i][0].transcript + ' ';
          }
        }

        if (speechText.trim()) {
          setText((prevText) => {
            const oldWords = prevText.trim().split(/\s+/);
            const newWords = speechText.trim().split(/\s+/);
            
            const combinedWords = [...oldWords, ...newWords];
            const uniqueWords = combinedWords.filter((word, index) => {
              return combinedWords.indexOf(word) === index && word !== '';
            });

            return uniqueWords.join(' ') + ' ';
          });
        }
      };

      rec.onerror = (e) => {
        console.error(e);
        if (e.error === 'not-allowed') {
          setError('ਕਿਰਪਾ ਕਰਕੇ ਮਾਈਕ੍ਰੋਫੋਨ (Mic) ਦੀ ਪਰਮਿਸ਼ਨ ਦਿਓ।');
        } else {
          setError('ਕੋਈ ਤਕਨੀਕੀ ਖਰਾਬੀ ਆਈ ਹੈ, ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।');
        }
      };

      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    } else {
      setError('ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਵੌਇਸ ਟਾਈਪਿੰਗ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ। ਕਿਰਪਾ ਕਰਕੇ Chrome use ਕਰੋ।');
    }
  }, []);

  const handleListen = () => {
    if (!recognitionRef.current) return;
    setError('');

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const copyToClipboard = () => {
    if (!text.trim()) return;
    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!text.trim()) return;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text.trim())}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="flex flex-col justify-between min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Navbar - Centered with max-w limit */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200">
              ਬ
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              BolBani
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Beta
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 flex-1 flex flex-col justify-center py-8 lg:py-12">
        
        {/* Headings */}
        {/* Headings */}
<div className="text-center m-8">
  <h1 className="text-3xl sm:text-4xl md:text-5xl py-2 font-black text-slate-900 tracking-tight leading-none">
    ਤੁਹਾਡੀ ਆਵਾਜ਼, {' '}
    <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
      ਤੁਹਾਡੇ ਅੱਖਰ
    </span>
  </h1>
  <p className="text-sm md:text-base font-bold text-slate-500 mt-4 max-w-lg mx-auto px-2">
    ਪੰਜਾਬ ਦੀ ਆਪਣੀ ਵੌਇਸ ਟਾਈਪਿੰਗ ਐਪ — ਬੋਲੋ ਪੰਜਾਬੀ, ਲਿਖੋ ਗੁਰਮੁਖੀ।
  </p>
</div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 mb-4 bg-rose-50 text-rose-700 text-sm font-semibold rounded-2xl border border-rose-100 shadow-sm text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Workspace Card (Responsive Grid for desktop flexibility) */}
        <div className="flex flex-col gap-5">
          
          {/* Textarea Dashboard */}
          <div className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-5 md:p-6 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
            
            {/* Listening Indicator */}
            {isListening && (
              <div className="absolute top-5 right-5 flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 z-10">
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider animate-pulse">ਸੁਣ ਰਿਹਾ ਹੈ</span>
                <div className="flex gap-0.5 items-end h-3 w-4">
                  <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_1s_infinite_100ms] h-full"></span>
                  <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_1s_infinite_300ms] h-2/3"></span>
                  <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_1s_infinite_200ms] h-1/2"></span>
                </div>
              </div>
            )}

            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-60 sm:h-72 md:h-80 bg-transparent text-xl md:text-2xl text-slate-800 font-semibold leading-relaxed placeholder:text-slate-300 focus:outline-none pt-8 md:pt-4"
              placeholder="ਇੱਥੇ ਤੁਹਾਡੀ ਪੰਜਾਬੀ ਟਾਈਪਿੰਗ ਲਿਖੀ ਜਾਵੇਗੀ..."
            />
            
            {/* Utilities Footer Bar inside textarea */}
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                {text.trim() ? `${text.trim().split(/\s+/).length} ਸ਼ਬਦ (Words)` : '0 Words'}
              </span>
              
              {text && (
                <div className="flex gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all ${
                      copied 
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200' 
                        : 'bg-slate-50 text-slate-500 hover:text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {copied ? '✓ ਕਾਪੀ ਹੋ ਗਿਆ' : '📋 ਕਾਪੀ ਕਰੋ'}
                  </button>
                  <button 
                    onClick={() => setText('')}
                    className="text-xs font-bold text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-3 py-2 rounded-xl border border-slate-200 transition-all"
                  >
                    ਸਾਫ਼ ਕਰੋ
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={handleListen}
              className={`flex-1 py-4 md:py-4.5 px-6 rounded-2xl text-lg font-bold text-white shadow-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer ${
                isListening 
                  ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-red-200 hover:from-rose-600 hover:to-red-700' 
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-600/20 hover:from-indigo-700 hover:to-violet-700'
              }`}
            >
              {isListening ? (
                <>🛑 ਰੋਕੋ (Stop)</>
              ) : (
                <>🎙️ ਬੋਲਣਾ ਸ਼ੁਰੂ ਕਰੋ</>
              )}
            </button>

            <button 
              onClick={shareOnWhatsApp}
              disabled={!text.trim()}
              className={`flex-1 py-4 md:py-4.5 px-6 rounded-2xl text-lg font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] cursor-pointer ${
                text.trim()
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              💬 WhatsApp ਤੇ ਭੇਜੋ
            </button>
          </div>

        </div>
      </div>

      
      {/* Professional Footer */}
<footer className="w-full text-center py-6 border-t border-slate-200 bg-white text-xs font-bold text-slate-400 tracking-wide flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
  <span>🌾 Proudly Built for Panjab • 100% Secure</span>
  <span className="hidden sm:inline text-slate-300">|</span>
  <span className="text-slate-500">
    Designed & Built by{' '}
    <a 
      href="https://instagram.com/techxpanjab" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-indigo-600 hover:text-violet-700 underline underline-offset-4 decoration-2 transition-colors cursor-pointer"
    >
      @techxpanjab
    </a>
  </span>
</footer>

    </main>
  );
}