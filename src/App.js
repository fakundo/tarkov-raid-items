import React, { useMemo } from 'react'
import { LocalizedProvider, AppStateProvider, ModalProvider, ThemeProvider, JssProvider, SearchProvider } from 'providers'
import theme from 'constants/theme'
import * as locales from 'locales'
import Visible from 'components/Visible'
import Font from 'components/Font'
import StyleReset from 'components/StyleReset'
import Container from 'components/Container'
import Spacer from 'components/Spacer'
import Header from 'components/Header'
import Body from 'components/Body'
import Footer from 'components/Footer'
import Items from 'components/Items'
import DocumentTitle from 'components/DocumentTitle'

export default () => (
  <JssProvider id={{ minify: true }}>
    <ThemeProvider theme={theme}>
      <Font />
      <StyleReset />
      <AppStateProvider>
        {({ locale }) => (
          <LocalizedProvider locales={locales} selected={locale}>
            { () => (
              <ModalProvider>
                <SearchProvider>
                  <Container>
                    {useMemo(() => (
                      <>
                        <DocumentTitle />
                        <Header />
                        <Visible breakpoint="lg">
                          <Spacer large />
                        </Visible>
                        <Visible breakpoint="mdDown">
                          <Spacer />
                        </Visible>
                        <Body>
                          <Items />
                        </Body>
                        <Visible breakpoint="mdUp">
                          <Spacer large />
                        </Visible>
                        <Visible breakpoint="smDown">
                          <Spacer />
                        </Visible>
                        <Footer />
                      </>
                    ), [])}
                  </Container>
                </SearchProvider>
              </ModalProvider>
            )}
          </LocalizedProvider>
        )}
      </AppStateProvider>
    </ThemeProvider>
  </JssProvider>
)
