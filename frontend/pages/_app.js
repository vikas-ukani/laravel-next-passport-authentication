import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/Layout/Layout'
import store from '@/store'
import '@/styles/globals.scss'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store} >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}


