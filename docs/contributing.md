# Contributing to TG Engine

Thank you for your interest in contributing to TG Engine! This guide will help you get started with contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/tg-engine.git
cd tg-engine
```

3. Install dependencies:
```bash
npm install
```

4. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

## Development

### Project Structure

```
tg-engine/
├── src/              # Source code
│   ├── components/   # Web components
│   └── utils/        # Utility functions
├── docs/             # Documentation
├── examples/         # Example implementations
└── tests/            # Test files
```

### Building the Project

```bash
# Development build with watch mode
npm start

# Production build
npm run build
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test.watch
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Follow the existing type definitions
- Document public APIs with JSDoc comments

### Component Structure

```typescript
@Component({
  tag: 'tg-component',
  styleUrl: 'component.css',
  shadow: true
})
export class Component {
  // Properties
  @Prop() property: string;

  // State
  @State() state: string;

  // Methods
  private method() {
    // Implementation
  }

  // Lifecycle methods
  componentWillLoad() {
    // Setup
  }

  render() {
    return (
      <div>
        {/* JSX */}
      </div>
    );
  }
}
```

### CSS

- Use CSS custom properties for theming
- Follow BEM naming convention
- Keep styles scoped to components

## Testing

### Unit Tests

```typescript
describe('Component', () => {
  it('should render', () => {
    const page = newSpecPage({
      components: [Component],
      html: '<tg-component></tg-component>'
    });
    expect(page.root).toEqualHtml(`
      <tg-component>
        <div>
          <!-- Expected HTML -->
        </div>
      </tg-component>
    `);
  });
});
```

### E2E Tests

```typescript
describe('Component', () => {
  it('should handle user interaction', async () => {
    const page = await newE2EPage();
    await page.setContent('<tg-component></tg-component>');
    
    const component = await page.find('tg-component');
    await component.click();
    
    // Assert expected behavior
  });
});
```

## Documentation

### Component Documentation

Each component should have:
- Description of purpose
- Property documentation
- Event documentation
- Usage examples
- Best practices

### API Documentation

- Document all public APIs
- Include type definitions
- Provide usage examples
- Explain error cases

## Pull Requests

1. Update documentation
2. Add tests for new features
3. Follow the code style guide
4. Write clear commit messages
5. Create a detailed PR description

### Commit Messages

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Code refactoring
- test: Test updates
- chore: Maintenance

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Publish to npm

## Community Guidelines

1. Be respectful and inclusive
2. Help others learn
3. Share knowledge
4. Follow the code of conduct

## Getting Help

- Check the documentation
- Open an issue
- Join the community discussions
- Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 