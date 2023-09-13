import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from 'components/Navigation';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../styles/calendar.scss';
import '../styles/globals.scss';

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: { session: any };
}) {
  return (
    <SessionProvider session={pageProps?.session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastContainer
            draggable
            rtl={false}
            closeOnClick
            pauseOnHover
            autoClose={5000}
            pauseOnFocusLoss
            newestOnTop={false}
            position="top-right"
            hideProgressBar={false}
          />
          <Navigation>
            <Component {...pageProps} />
          </Navigation>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
