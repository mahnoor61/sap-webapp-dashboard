// ** Next Imports
import Head from 'next/head'
import {Router} from 'next/router'

import {Toaster} from 'react-hot-toast';


// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import {CacheProvider} from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import {SettingsConsumer, SettingsProvider} from 'src/@core/context/settingsContext'

// ** Utils Imports
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import {Provider as ReduxProvider} from 'react-redux';
import {RolesProvider} from '../@core/context/getAllRoles';
import {MachineProvider} from '../@core/context/getAllMachines';
import {RouteProvider} from '../@core/context/getAllRoutes';
import {UserProvider} from '../@core/context/user';
import {ProductionOrderNoProvider} from '../@core/context/getProductionOrderNo';
import {store} from './../stores/index'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{themeConfig.templateName}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName}`}
        />
        <meta name='keywords' content='Tecshield'/>
        <meta name='viewport' content='initial-scale=1, width=device-width'/>
      </Head>

      <ReduxProvider store={store}>
        <SettingsProvider>
          <ProductionOrderNoProvider>
          <UserProvider>
          <RolesProvider>
            <MachineProvider>
              <RouteProvider>
                {/*<CountriesProvider>*/}
                <SettingsConsumer>
                  {({settings}) => (
                    <>
                      <Toaster position="top-center"/>
                      <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                    </>
                  )}
                </SettingsConsumer>
                {/*</CountriesProvider>*/}
              </RouteProvider>
            </MachineProvider>
          </RolesProvider>
          </UserProvider>
          </ProductionOrderNoProvider>
        </SettingsProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}

export default App
