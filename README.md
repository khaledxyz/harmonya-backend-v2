# Project Name

This project is built using **express**, **TypeScript**, **postgresql**, and **pnpm**. It follows specific guidelines to ensure clean, maintainable, and efficient code. Please read through this document to understand the rules and best practices for contributing to the project.

## Table of Contents

- [Project Overview](#project-overview)
- [Development Rules](#development-rules)

## Project Overview

This project is a modern web application built with express and TypeScript. The aim of this project is to provide a clean and scalable solution that follows best practices for maintainable and optimized code.

## Development Rules

### Coding Standards
- **ESLint**: All developers must follow the ESLint rules set in the project. This ensures consistent code style and helps to avoid potential issues. Please **run ESLint** before committing your changes.
  
### Folder Structure
- Please **respect the folder structure** of the project. This includes placing components, hooks, and other resources in their appropriate directories.

### Branch and Commit Naming
- **Branch Names**: Use descriptive names for your branches. For example, `feature/new-component`, `bugfix/fix-button-style`.
- **Commit Messages**: Write clear, concise commit messages using the [Conventional Commits](https://www.conventionalcommits.org) style. For example:
  - `feat: Add new feature for user login`
  - `fix: Correct button alignment issue`
  - `docs: Update README with setup instructions`

### Pull Requests
- **Pull Request Naming**: Pull request titles should also be descriptive, reflecting the changes made, such as `feat: Add user authentication`.
- **PR Validation**: Every pull request must be **validated** before merging. Make sure all tests pass and code is reviewed by at least one other developer.

### Code Comments
- Add **comments** to your code where necessary, explaining the logic or complex parts of the code. This helps others understand your work and promotes better collaboration.

### Code Formatting
- **Format the code** before committing. Use Prettier or another code formatting tool to ensure consistency in the formatting style.
- **Remove unused imports** and **logs** before pushing your changes.

### Avoid Code Duplication
- **Avoid replicating code**. If you find similar code snippets, extract them into reusable components or functions.
- Do not replicate libraries. If a library is already used in the project, prefer using it over introducing a new one with similar functionality.

### Functionalities and Testing
- Ensure that the functionalities you implement are **fully developed and tested** before pushing your changes. Write unit tests to validate your code and ensure it works as expected.

### Code Optimization
- Split and **factor** the code into **reusable parts**. Always aim to make your code **optimized and scalable**. Reusability and performance are key factors for a successful project.


