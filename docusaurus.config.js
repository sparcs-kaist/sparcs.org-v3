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
      docs: {
          sidebar: {
            autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "SPARCS",
        logo: {
          alt: "SPARCS Logo",
          src: "img/symbol.svg",
          width: "80px",
        },
        items: [
          {
            label: "소개",
            to: "docs",
            // position: "right",
          },
          {
            label: "프로젝트",
            to: "docs/projects",
            // position: "right",
          },
          {
            label: "세미나",
            to: "docs/seminars",
            // position: "right",
          },
          {
            label: "블로그", 
            to: "/blog", 
            // position: "right"
          },
          {
            label: "GitHub",
            href: "https://github.com/sparcs-kaist",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "연관 사이트",
            items: [
              {
                label: "Github",
                href: "https://github.com/sparcs-kaist",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/sparcs.kaist",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/kaistsparcs",
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
                label: "Ara",
                href: "https://ara.kaist.ac.kr",
              },
              {
                label: "OTL",
                href: "https://otl.kaist.ac.kr",
              },
              {
                label: "Zabo",
                href: "https://zabo.kaist.ac.kr",
              },
              {
                label: "Taxi",
                href: "https://taxi.sparcs.org",
              },
              {
                label: "SSO",
                href: "https://sparcssso.kaist.ac.kr",
              },
            ],
          },
          {
            title: "내부 서비스",
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
