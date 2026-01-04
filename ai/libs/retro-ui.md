# RetroUI Component Library

RetroUI is a retro-styled Tailwind CSS component library designed for modern web applications. Built on top of Next.js and React, it provides a comprehensive collection of UI components with a distinctive retro aesthetic featuring bold borders, vibrant colors, and playful shadow effects. The library leverages Radix UI primitives for accessibility and robust functionality while maintaining a unique visual identity.

The project is structured as a documentation site with live component previews, making it easy for developers to explore and integrate components into their projects. It includes a complete set of form elements, data visualization charts, navigation components, and layout utilities, all styled with a consistent retro theme that can be customized through multiple color schemes including default, purple, lime, red, lavender, orange, and green variants.

## Components

### Button Component

Interactive button component with multiple variants (default, secondary, outline, link) and sizes (sm, md, lg, icon). Features retro-style shadows and translate animations on hover and active states.

```tsx
import { Button } from "@/components/retroui/Button";

// Default button
<Button>Click Me!</Button>

// Button variants
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Icon button
<Button size="icon" variant="outline">
  <SearchIcon />
</Button>

// As child component (renders as link)
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

### Card Component

Composable card component with header, title, description, and content sections. Features borders, shadows, and hover effects.

```tsx
import { Card } from "@/components/retroui/Card";

<Card>
  <Card.Header>
    <Card.Title>Product Feature</Card.Title>
    <Card.Description>
      Discover the amazing capabilities of our new product.
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Detailed content goes here with images, text, or any React components.</p>
  </Card.Content>
</Card>

// Custom styling
<Card className="max-w-md hover:translate-y-1 transition-transform">
  <Card.Header>
    <Card.Title>Custom Card</Card.Title>
  </Card.Header>
</Card>
```

### Input Component

Text input field with border, shadow, and focus states. Supports error states via aria-invalid attribute.

```tsx
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

// Basic input
<Input type="text" placeholder="Enter your name" />

// Input with label
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email Address</Label>
  <Input type="email" id="email" placeholder="user@example.com" />
</div>

// Error state
<Input
  type="email"
  placeholder="Email"
  aria-invalid={true}
  className="mb-2"
/>

// Different input types
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Age" />
<Input type="date" />
```

### Dialog Component

Modal dialog component with header, content, footer, and backdrop. Built on Radix UI Dialog primitive with size variants.

```tsx
import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";

<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>

  <Dialog.Content size="md">
    <Dialog.Header>Edit Profile</Dialog.Header>

    <div className="p-4 space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john@example.com" />
      </div>
    </div>

    <Dialog.Footer>
      <Button variant="outline">Cancel</Button>
      <Button>Save Changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>

// Size variants
<Dialog.Content size="sm">Small Dialog</Dialog.Content>
<Dialog.Content size="lg">Large Dialog</Dialog.Content>
<Dialog.Content size="xl">Extra Large Dialog</Dialog.Content>

// Custom overlay
<Dialog.Content overlay={{ variant: "none" }}>
  No backdrop
</Dialog.Content>
```

### Checkbox Component

Checkbox input with variants (default, outline, solid) and sizes. Built on Radix UI Checkbox with check icon indicator.

```tsx
import { Checkbox } from "@/components/retroui/Checkbox";
import { Label } from "@/components/retroui/Label";

// Basic checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Variants
<Checkbox variant="default" />
<Checkbox variant="outline" />
<Checkbox variant="solid" />

// Sizes
<Checkbox size="sm" />
<Checkbox size="md" />
<Checkbox size="lg" />

// Controlled checkbox
function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
```

### Select Component

Dropdown select component with trigger, content, items, and groups. Features animated open/close transitions.

```tsx
import { Select } from "@/components/retroui/Select";

<Select>
  <Select.Trigger>
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>

  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
    <Select.Item value="orange">Orange</Select.Item>
  </Select.Content>
</Select>

// Grouped options
<Select>
  <Select.Trigger>
    <Select.Value placeholder="Select a framework" />
  </Select.Trigger>

  <Select.Content>
    <Select.Group>
      <Select.Label>Frontend</Select.Label>
      <Select.Item value="react">React</Select.Item>
      <Select.Item value="vue">Vue</Select.Item>
      <Select.Item value="svelte">Svelte</Select.Item>
    </Select.Group>

    <Select.Separator />

    <Select.Group>
      <Select.Label>Backend</Select.Label>
      <Select.Item value="node">Node.js</Select.Item>
      <Select.Item value="python">Python</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>
```

### Alert Component

Alert notification component with variants (default, solid) and status types (error, success, warning, info).

```tsx
import { Alert } from "@/components/retroui/Alert";
import { InfoIcon, AlertTriangle, CheckCircle } from "lucide-react";

// Basic alert
<Alert>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    You can add components to your app using the CLI.
  </Alert.Description>
</Alert>

// Status variants
<Alert status="success">
  <Alert.Title>Success</Alert.Title>
  <Alert.Description>Your changes have been saved.</Alert.Description>
</Alert>

<Alert status="error">
  <Alert.Title>Error</Alert.Title>
  <Alert.Description>There was a problem with your request.</Alert.Description>
</Alert>

<Alert status="warning">
  <Alert.Title>Warning</Alert.Title>
  <Alert.Description>Please review your input.</Alert.Description>
</Alert>

// With icon
<Alert status="info" className="flex gap-3">
  <InfoIcon className="h-5 w-5 mt-0.5" />
  <div>
    <Alert.Title>Information</Alert.Title>
    <Alert.Description>New features are available.</Alert.Description>
  </div>
</Alert>

// Solid variant
<Alert variant="solid">
  <Alert.Title>Dark Alert</Alert.Title>
  <Alert.Description>High contrast alert message.</Alert.Description>
</Alert>
```

### Table Component

Data table component with header, body, footer, rows, and cells. Features hover effects and responsive overflow.

```tsx
import { Table } from "@/components/retroui/Table";

<Table>
  <Table.Caption>A list of recent invoices</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>Invoice</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Amount</Table.Head>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.Cell>INV001</Table.Cell>
      <Table.Cell>Paid</Table.Cell>
      <Table.Cell>$250.00</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>INV002</Table.Cell>
      <Table.Cell>Pending</Table.Cell>
      <Table.Cell>$150.00</Table.Cell>
    </Table.Row>
  </Table.Body>

  <Table.Footer>
    <Table.Row>
      <Table.Cell colSpan={2}>Total</Table.Cell>
      <Table.Cell>$400.00</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table>

// With checkboxes
<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head className="w-12">
        <Checkbox />
      </Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Email</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {users.map((user) => (
      <Table.Row key={user.id}>
        <Table.Cell>
          <Checkbox />
        </Table.Cell>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

### BarChart Component

Data visualization bar chart built on Recharts with customizable colors, tooltips, and alignment (vertical/horizontal).

```tsx
import { BarChart } from "@/components/retroui/charts/BarChart";

// Basic vertical bar chart
const data = [
  { name: 'Jan', orders: 12 },
  { name: 'Feb', orders: 32 },
  { name: 'Mar', orders: 19 },
  { name: 'Apr', orders: 35 },
  { name: 'May', orders: 40 },
  { name: 'Jun', orders: 25 }
];

<BarChart
  data={data}
  index="name"
  categories={["orders"]}
/>

// Multiple categories
const salesData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
];

<BarChart
  data={salesData}
  index="month"
  categories={["revenue", "expenses"]}
  fillColors={["var(--primary)", "var(--secondary)"]}
  strokeColors={["var(--foreground)", "var(--foreground)"]}
  valueFormatter={(value) => `$${value.toLocaleString()}`}
/>

// Horizontal bar chart
<BarChart
  data={data}
  index="name"
  categories={["orders"]}
  alignment="horizontal"
  className="h-64"
/>

// Customized appearance
<BarChart
  data={data}
  index="name"
  categories={["sales"]}
  fillColors={["#ffdb33"]}
  strokeColors={["#000000"]}
  tooltipBgColor="var(--card)"
  tooltipBorderColor="var(--border)"
  gridColor="var(--muted)"
  showGrid={true}
  showTooltip={true}
/>
```

### Utility Functions

Helper function for merging Tailwind CSS classes with proper precedence handling.

```tsx
import { cn } from "@/shared/utils";

// Merge multiple class names
<div className={cn("px-4 py-2", "bg-primary", className)} />

// Conditional classes
<button
  className={cn(
    "px-4 py-2 rounded",
    isActive && "bg-primary text-white",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
/>

// Override conflicting classes (later takes precedence)
<div className={cn("p-4", "p-8")} /> // Results in p-8

// Array of classes
<div className={cn(["flex", "items-center", "gap-2"])} />

// With variant props
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "rounded border-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "bg-transparent border-primary"
      }
    }
  }
);

<button className={cn(buttonVariants({ variant: "default" }), "mt-4")} />
```

## Integration and Usage

RetroUI is designed for seamless integration into Next.js projects with Tailwind CSS. The library uses a component-driven architecture where each component is self-contained and can be imported individually to minimize bundle size. All components are built with TypeScript for type safety and leverage Radix UI primitives for accessibility compliance, ensuring keyboard navigation, screen reader support, and ARIA attributes work out of the box.

The theming system is based on CSS custom properties, allowing dynamic theme switching without page reloads. Developers can choose from seven pre-built themes or create custom themes by defining CSS variables for colors like `--primary`, `--secondary`, `--background`, `--foreground`, and others. Components automatically adapt to both light and dark modes through the `.dark` class selector. The library integrates with class-variance-authority (CVA) for variant-based styling, making it easy to extend components with custom variants while maintaining the retro aesthetic. Installation is streamlined through a CLI tool that copies component source code directly into your project, giving you full control to customize components as needed.
