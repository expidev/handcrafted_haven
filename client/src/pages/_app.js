import '../styles/globals.css';
import '../styles/auth.css';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <html lang="en" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
