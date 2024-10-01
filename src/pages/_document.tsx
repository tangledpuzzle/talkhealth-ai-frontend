import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <title>Talkhealth.AI</title>
        <link rel="icon" href="/small_logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta name="keywords" content="Talkhealth, Medical, AI, Assistant, Chatbot" />
        <meta name="author" content="Thomas Dittrich" />
        <meta name="description" content="TalkHealth.ai is a groundbreaking web application poised to redefine patient engagement in healthcare. Our platform leverages advanced AI technology to interpret medical test results, transforming complex data into clear, understandable insights. With a mission to empower patients through education, TalkHealth.ai facilitates informed discussions between patients and their healthcare providers, enhancing the decision-making process. We're committed to bridging the gap in health literacy and making medical information accessible to all. Follow us for updates on how we're revolutionizing patient health understanding with AI-driven innovation." />
        <meta property="og:url" content='https://talkhealth.ai' />
        <meta property="og:title" content='Talkhealth.AI' />
        <meta property="og:description" content="TalkHealth.ai is a groundbreaking web application poised to redefine patient engagement in healthcare. Our platform leverages advanced AI technology to interpret medical test results, transforming complex data into clear, understandable insights. With a mission to empower patients through education, TalkHealth.ai facilitates informed discussions between patients and their healthcare providers, enhancing the decision-making process. We're committed to bridging the gap in health literacy and making medical information accessible to all. Follow us for updates on how we're revolutionizing patient health understanding with AI-driven innovation." />
        <meta property="og:image" content='/small_logo.png' />
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  )
}
