import Head from 'next/head'

const Seo = ({ titlePage, myApp }) => {
  return (
    <Head>
      <title>
        {titlePage} | {myApp}
      </title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lato&family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <link rel="icon" href="../public/favicon.ico" />
    </Head>
  )
}

export default Seo
