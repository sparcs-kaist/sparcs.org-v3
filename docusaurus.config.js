// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SPARCS",
  tagline: `System Programmersâ€™ Association for Researching Computer Systems`,
  url: "https://sparcs.sboh.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "seminars",
        path: "seminars",
        routeBasePath: "seminars",
        numberPrefixParser: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "SPARCS",
        logo: {
          alt: "SPARCS Logo",
          src: "img/symbol.svg",
          width: "50px",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "ě†Śę°ś",
          },
          {
            to: "seminars/intro",
            activeBasePath: "seminars",
            position: "left",
            label: "ě„¸ëŻ¸ë‚?",
          },
          { to: "/blog", label: "ë¸”ëˇśę·¸", position: "left" },
          {
            href: "https://github.com/sparcs-kaist",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "ě†Śę°ś",
            items: [
              {
                label: "í”„ëˇśě ťíŠ¸",
                to: "/docs/intro",
              },
              {
                label: "ě„¸ëŻ¸ë‚?",
                to: "/docs/intro",
              },
              {
                label: "íšŚě›?",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "ě„śëą„ěŠ¤",
            items: [
              {
                label: "Geoul",
                href: "http://ftp.kaist.ac.kr/",
              },
              {
                label: "NewAra",
                href: "https://newara.sparcs.org",
              },
              {
                label: "OTL Plus",
                href: "https://otl.kaist.ac.kr",
              },
              {
                label: "SSO",
                href: "https://sparcssso.kaist.ac.kr",
              },
              {
                label: "Zabo",
                href: "https://zabo.sparcs.org",
              },
            ],
          },
          {
            title: "ě—°ę´€ ě‚¬ěť´íŠ¸",
            items: [
              {
                label: "Github",
                href: "https://github.com/sparcs-kaist",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/kaistsparcs",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/sparcs.kaist",
              },
            ],
          },
          {
            title: "íšŚě›? ě „ěš©",
            items: [
              {
                label: "Biseo",
                to: "https://biseo.sparcs.org",
              },
              {
                label: "Memvers",
                to: "https://memvers.sparcs.org",
              },
              {
                label: "Vault",
                to: "https://secret.sparcs.org",
              },
              {
                label: "Wiki",
                to: "https://wiki.sparcs.org",
              },
            ],
          },
        ],
        copyright: `Copyright Â© ${new Date().getFullYear()} SPARCS. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
