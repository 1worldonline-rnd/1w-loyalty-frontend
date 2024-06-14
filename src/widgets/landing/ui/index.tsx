import { createGlobalStyle } from 'styled-components';
import { Header } from './header';
import * as sections from './sections';
import { Footer } from './footer';
import { Calendly } from './calendly';

const GlobalStyles = createGlobalStyle`
    *, ::before, ::after {
        font-family: 'Satoshi', sans-serif;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        --colors-text-main: #1a1a1a;
        --colors-text-secondary: #4d4d4d;
        
        background-color: #fcfcfc;
        min-width: 360px;
    }
`;

export const Landing = () => (
    <>
        <GlobalStyles />

        <Calendly />

        <Header />

        <sections.Main />

        <sections.Widgets />

        <sections.Components />

        <sections.CareContent />

        <sections.UseCases />

        <sections.Cointribune />

        <sections.FAQSection />

        <Footer />
    </>
);
