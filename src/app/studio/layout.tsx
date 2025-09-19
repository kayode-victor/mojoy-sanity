import "../../styles/globals.css";
export const metadata = {
  title: "Mojoy || Admin",
  description: "Mojoy Admin Studio",
  favicon: "./favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description || ""} />
        <link rel="icon" href={metadata.favicon} />
      </head>
      <body>{children}</body>
    </html>
  );
}
