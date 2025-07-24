import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // import default styles

NProgress.configure({ showSpinner: false }); // optional config

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function LoadingBar() {
  return null; // this component just activates the progress bar on route events
}
