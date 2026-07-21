import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anjana | Developer Portfolio",
  description: "Personal website and portfolio of Anjana. Explore projects, engineering skills, professional experience, and connections to GitHub, LinkedIn, Reddit, Instagram, and WhatsApp.",
  keywords: ["Anjana", "Portfolio", "Software Engineer", "Web Developer", "Next.js", "React", "TypeScript", "Vercel", "WhatsApp"],
  authors: [{ name: "Anjana" }],
  openGraph: {
    title: "Anjana | Portfolio",
    description: "Personal website and portfolio of Anjana.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjana | Portfolio",
    description: "Personal website and portfolio of Anjana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
