import { FC } from "react";
import Head from "next/head";

interface Props {
  image?: string;
  title?: string;
  myApp?: string;
  route?: string;
  baseUrl: string;
  description?: string;
}

const Seo: FC<Props> = ({
  title,
  myApp,
  description,
  baseUrl,
  route,
  image,
}) => {
  return (
    <Head>
      <title>
        {title} | {myApp}
      </title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato&family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="../public/favicon.ico" />

      <meta name="title" content={`${title} | ${myApp}`} />
      <meta name="description" content={description} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}/${route}`} />
      <meta property="og:title" content={`${title} | ${myApp}`} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          image
            ? image
            : "https://images.unsplash.com/photo-1587018343663-cb04bcb21de1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80"
        }
      />

      {/* Twitter */}
      <meta
        property="twitter:card"
        content={
          image
            ? image
            : "https://images.unsplash.com/photo-1587018343663-cb04bcb21de1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80"
        }
      />
      <meta property="twitter:url" content={`${baseUrl}/${route}`} />
      <meta property="twitter:title" content={`${title} | ${myApp}`} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={
          image
            ? image
            : "https://images.unsplash.com/photo-1587018343663-cb04bcb21de1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80"
        }
      />
    </Head>
  );
};

export default Seo;
