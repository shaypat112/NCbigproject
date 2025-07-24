import '../styles/globals.css';
import Layout from '../components/Layout';
import LoadingBar from '../components/LoadingBar';  // import loading bar

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <LoadingBar />    {/* add this here */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
