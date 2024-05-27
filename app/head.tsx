const title = "Next Three Fiber Minimal Starter";
const url = " ";
const description =
  "smart web - digital solutions is an engineering and design studio based in Germany. We help you build best-in-class digital products and services to grow your business and delight your customers. We are experts in web3, blockchain, and decentralized finance (DeFi) technologies. We are also available for consulting and training services. Contact us today to learn more about how we can help you succeed in the digital age"
const author = "smart web";
const twitter = "";

export default function Head() {
  return (
    <>
      <meta charSet="utf-8"/>
      <meta name="language" content="english"/>
      <meta httpEquiv="content-type" content="text/html"/>
      <meta name="author" content={author}/>
      <meta name="designer" content={author}/>
      <meta name="publisher" content={author}/>

      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta
        name="keywords"
        content="Software Professional, Designer, Web3 Consultant"
      />
      <meta name="robots" content="index,follow"/>
      <meta name="distribution" content="web"/>

      <meta property="og:title" content={title}/>
      <meta property="og:type" content="site"/>
      <meta property="og:url" content={url}/>
      {/*<meta property="og:image" content={"/icons/share.png"}/>*/}
      <meta property="og:site_name" content={title}/>
      <meta property="og:description" content={description}/>

      {/*<link rel="manifest" href="https://vercel.app/manifest.json" />*/}

      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1, initial-scale=1.0"
      />
      <meta name="theme-color" content="#000"/>
      <link rel="shortcut icon" href="/favicon.png"/>

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content={twitter}/>
    </>
  );
}
