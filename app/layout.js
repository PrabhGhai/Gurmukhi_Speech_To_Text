import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BolBani - ਪੰਜਾਬੀ ਵੌਇਸ ਟਾਈਪਿੰਗ | ਬੋਲੋ ਪੰਜਾਬੀ, ਲਿਖੋ ਗੁਰਮੁਖੀ",
  description: "BolBani (ਬੋਲ-ਬਾਣੀ) ਪੰਜਾਬ ਦੀ ਆਪਣੀ ਵੌਇਸ ਟਾਈਪਿੰਗ ਐਪ ਹੈ। ਕੀਬੋਰਡ ਨਾਲ ਮੱਥਾ ਮਾਰਨਾ ਛੱਡੋ, ਬੱਸ ਬਟਨ ਦੱਬੋ, ਪੰਜਾਬੀ ਚ ਬੋਲੋ ਤੇ ਸਿੱਧਾ WhatsApp ਤੇ ਭੇਜੋ। 100% Free Punjabi Speech to Text tool.",
  keywords: [
    "Punjabi voice typing", 
    "BolBani", 
    "Bolo te likho", 
    "Punjabi speech to text", 
    "ਪੰਜਾਬੀ ਵੌਇਸ ਟਾਈਪਿੰਗ", 
    "Gurmukhi typing online", 
    "Punjabi voice to text whatsapp",
    "Bolo Punjab"
  ],
  authors: [{ name: "techxpanjab" }],
  openGraph: {
    title: "BolBani - ਪੰਜਾਬੀ ਵੌਇਸ ਟਾਈਪਿੰਗ",
    description: "ਤੁਹਾਡੀ ਆਵਾਜ਼, ਤੁਹਾਡੇ ਅੱਖਰ। ਬੋਲੋ ਪੰਜਾਬੀ, ਲਿਖੋ ਗੁਰਮੁਖੀ ਤੇ ਸਿੱਧਾ WhatsApp ਤੇ ਭੇਜੋ।",
    type: "website",
    locale: "pa_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
