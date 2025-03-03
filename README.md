# Guest Portal

## Overview

Single-page application built with React, TypeScript, and Vite.

## Stack

- **Frontend**: React, TypeScript, SCSS
- **Build Tool**: Vite
- **Linting**: ESLint, Stylelint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts

| Command               | Description                            |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Starts the Vite development server.    |
| `npm run build`       | Builds the project for production.     |
| `npm run lint`        | Lints TypeScript and JavaScript files. |
| `npm run lint:styles` | Lints SCSS files.                      |
| `npm run format`      | Formats code with Prettier.            |
| `npm run preview`     | Previews the production build.         |
| `npm run prepare`     | Installs Husky hooks.                  |

To indicate the use of the **Feature-Sliced Design (FSD)** approach, you could replace the structure section like this:

---

## Project Structure

The project follows the **Feature-Sliced Design (FSD)** architecture to organize the code by features and layers.

## Development Style Guide

**General Rules**

- **Branch names** start with `feature/` | `bugfix/` | `hotfix/`, followed by a brief description of the branch's changes in kebab-case.<br/>
  _Example:_ `feature/my-branch-description`.
- **Commit messages** are written in accordance with [Conventional Commits guidelines](https://www.conventionalcommits.org),<br/>
  _Example:_ `feat: changes description`.
- After finishing work on a branch, a pull request is created in GitLab to merge it into the `dev` branch. The pull request title should match the corresponding branch name. A brief description of the changes may also be added to the merge request if helpful for code review.
- If there are conflicts in the pull request, the branch should be rebased onto the `dev` branch. Conflicts should not be resolved by merging the `dev` branch into the feature branch.

## CI/CD

- **GitHub Actions**: Automated tests and lints run on push and merge events.
