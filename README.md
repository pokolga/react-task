# React project 

This is the project for the **React 2025 Q3** course at **Rolling Scopes School**, developed by  [**Olga Paklonskaya**](https://github.com/pokolga) under the mentorship of [**Marharyta Malets**](https://github.com/margaryta-maletz).


## Technology Stack

### React + TypeScript + Vite + Tailwind CSS

**React** – Used for building dynamic and interactive user interfaces through a component-based architecture and declarative programming.

**HTML5** – Used for structuring the content following modern web standards.

**TypeScript** – Used for enhancing JavaScript with static typing to improve code quality.
  
**Tailwind CSS** – Used for building modern and responsive UI with a utility-first approach.
 
**Vite** – Used for bundling optimized production builds.
 
**ESLint** – Used for enforcing coding standards and catching errors early during development.
  
**Prettier** – Used for ensuring consistent code style across the entire project.
 
**Husky** – Used for automating code checks before commits.


## Project setup

Follow these steps to set up and run the project locally.

### Basic requirements

Make sure to have the following installed:

- [Node.js](https://nodejs.org/) version: **23.x** or higher
- [npm](https://www.npmjs.com/)

Verify installation by running in the console:

```bash
node -v
npm -v
```

### Setup Instructions

1. **Open the console and clone the repository**

```bash
git clone https://github.com/pokolga/react-task.git
```

This will create the new folder with all the files from the repository.

2. **Navigate to the project directory**

```bash
cd react-task
```

3. **Install project dependencies**

```bash
npm install
```

This will install all packages listed in `package.json`.

4. **Initialize Husky for Git hooks**

```bash
npm run prepare
```

This will set up Husky to run the Git hooks for pre-commit and other automation.

5. **Start the development server**

```bash
npm run dev
```

This will launch the Vite development server to test that the project has been setup correctly.

6. **Tailwind CSS Development Setup**

VS Code Extensions

To enhance your development experience with Tailwind CSS, install the following extension:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Tailwind CSS IntelliSense"
4. Click Install

This extension provides autocomplete suggestions, linting, hover previews

7. **Vitest**

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
```

## Testing Rules

Follow these guidelines for writing tests:

- Use **BDD (Behavior-Driven Development)** style with `describe` and `test`
- Group related tests under `describe` blocks
- Write test descriptions that read like technical specifications:
  ```typescript
  describe('App component', () => {
    test('renders headline', () => {
      // test code
    });
  });
  ```

## 📜 Scripts

Use the following scripts to assist with development, formatting, linting, building, and deploying.

 `npm run lint`           Execute ESLint on all `.tsx` files to check for code quality issues.                                                                              
 `npm run format:fix`     Execute Prettier on all `.tsx` files in the `src/` folder to check if the files are properly formatted and automatically fix all fixable issues. 
 `npm run dev`            Start a local development server with Vite. 
 `npm run build`          Build the project for production.           
 `npm run preview`        Preview the production build locally.       
 `npm run deploy`         Build the project and deploy                
 `npm run prepare`        Set up Husky hooks. 
                                       