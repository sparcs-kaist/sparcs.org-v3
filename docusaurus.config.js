// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SPARCS",
  tagline: `System Programmers’ Association for Researching Computer Systems`,
  url: "https://sparcs.netlify.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
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
          editUrl: "https://github.com/sparcs-kaist/sparcs.org-v3/tree/main",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/sparcs-kaist/sparcs.org-v3/tree/main",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
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
            label: "소개",
          },
          {
            to: "seminars/intro",
            activeBasePath: "seminars",
            position: "left",
            label: "세미나",
          },
          { to: "/blog", label: "블로그", position: "left" },
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
            title: "소개",
            items: [
              {
                label: "프로젝트",
                to: "/docs/intro",
              },
              {
                label: "세미나",
                to: "/docs/intro",
              },
              {
                label: "회원",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "서비스",
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
            title: "연관 사이트",
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
            title: "회원 전용",
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
                label: "Wiki",
                to: "https://wiki.sparcs.org",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SPARCS. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
