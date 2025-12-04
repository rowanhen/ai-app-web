# General Development Rules

## Component Library Guidelines

### Do Not Modify Component-Lib

- **Never deliberately alter code in the `component-lib` folder**
- The component-lib contains shared, reusable components that should remain stable
- Any modifications to component-lib components could break other parts of the application or future updates

### Use Components from Component-Lib

- **Always use components from the `component-lib` folder** when available
- Import and use existing component-lib components rather than creating duplicates
- Check the component-lib first before building new functionality

### Creating New Components

- **In rare cases** where you need to create special or new components that don't exist in component-lib:
  - Place these components in the `components` folder (not component-lib)
  - **Always build new components from existing components in the component-lib folder**
  - Compose new functionality using component-lib components as building blocks
  - Only create truly unique components when component-lib components cannot be composed to meet the requirement

### Best Practices

- Prefer composition over modification
- Extend component-lib components through props and composition rather than altering their source code
- Document why a new component was created in the components folder if it's not built from component-lib components
