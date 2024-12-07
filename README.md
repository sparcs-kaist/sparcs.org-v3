# SPARCS Homepage v3

[![Netlify Status](https://api.netlify.com/api/v1/badges/0c077ed0-cf3d-4cc9-89d5-33f0285fc903/deploy-status)](https://app.netlify.com/sites/sparcs/deploys)
[![CI](https://github.com/sparcs-kaist/sparcs.org-v3/actions/workflows/ci.yml/badge.svg)](https://github.com/sparcs-kaist/sparcs.org-v3/actions/workflows/ci.yml)

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

## Contributor

Initially started by President of SPARCS in 2022 [Seungbin Oh](https://github.com/sboh1214) with ❤️

## How to develop

### Installation

```sh
npm i
```

### Local Development

```sh
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```sh
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

We are currently using Netlify. The website is automatically deployed when a commit is pushed to the `main` branch.

If you want to deploy the website manually, run the following command:

```sh
npm run build
npm run deploy
```

## TODO

- contact(<staff@sparcs.org>) 빠짐
- 멤버 소개 빠짐
- 여러 활동 사진 빠짐
- 대내외 해커톤 소개 빠짐
- Vault 지우기
- OTL PLUS 등 소개 수정하기
- 영어 번역 추가하기
- 세칙에 일자 추가하기
