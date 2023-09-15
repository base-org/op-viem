# Contributing

Thanks for your interest in contributing to op-viem! Please take a moment to review this document **before submitting a pull request.**

> **Note**
>
> **Please ask first before starting work on any significant new features.**

<br>

## Basic guide

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

1. [Cloning the repository](#cloning-the-repository)
2. [Installing Node.js and Bun](#installing-nodejs-and-bun)
3. [Installing Foundry](#installing-foundry)
4. [Installing dependencies](#installing-dependencies)
5. [Running the test suite](#running-the-test-suite)
6. [Writing documentation](#writing-documentation)
7. [Submitting a pull request](#submitting-a-pull-request)
8. [Versioning](#versioning)

---

### Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```bash
git clone https://github.com/wagmi-dev/viem.git --recurse-submodules
```

Or the [GitHub CLI](https://cli.github.com):

```bash
gh repo clone wagmi-dev/viem -- --recurse-submodules
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Installing Node.js and pnpm

You need to install **Node.js v18 or higher** and **pnpm**.

You can run the following commands in your terminal to check your local Node.js and Bun versions:

```bash
node -v
pnpm -v
```

If the versions are not correct or you don't have Node.js or pnpm installed, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org)
- Install [pnpm](https://pnpm.io/installation)

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Installing Foundry

op-viem uses [Foundry](https://book.getfoundry.sh/) for testing. We run a local [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) instance against a forked Ethereum node, where we can also use tools like [Forge](https://book.getfoundry.sh/forge/) to deploy test contracts to it.

Install Foundry using the following command:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
pnpm install
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Running the test suite

```
pnpm run test
```

Sometimes there may be some tests which fail unexpectedly – you can press `f` to rerun them and they should pass.

When adding new features or fixing bugs, it's important to add test cases to cover the new/updated behavior.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Writing documentation

Documentation is crucial to helping developers of all experience levels use op-viem. op-viem uses [VitePress](https://github.com/vuejs/vitepress) and Markdown for the documentation site (located at [`site`](../site)). To start the site in dev mode, run:

```bash
pnpm run dev:docs
```

Try to keep documentation brief and use plain language so folks of all experience levels can understand. If you think something is unclear or could be explained better, you are welcome to open a pull request.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

### Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

- Pull request titles use the [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood) (e.g., `Add something`, `Fix something`).
- [Changesets](#versioning) use past tense verbs (e.g., `Added something`, `Fixed something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

---

<div align="right">
  <a href="#advanced-guide">&uarr; back to top</a></b>
</div>