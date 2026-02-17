import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta content="notranslate" name="google" />
        
        {/* Favicons y Manifest según tu carpeta public */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://mardigitals.github.io/" />
        {/* Etiquetas de compatibilidad y SEO */}
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
