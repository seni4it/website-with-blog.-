# Important Notes for Claude

## Critical Styling Rules

### LIMITED TIME Badge Styling
**ALWAYS** ensure the "🔥 LIMITED TIME" badge has the red background styling:
```jsx
<Badge className="bg-destructive text-destructive-foreground animate-pulse font-medium">🔥 LIMITED TIME</Badge>
```

**Never use**: `text-white font-medium` for the LIMITED TIME text - it should always be a Badge component with red background.

## MANDATORY COMMANDS AFTER EVERY EDIT

**ALWAYS RUN THESE COMMANDS IN ORDER AFTER ANY EDIT:**

1. **Check badge styling**: `npm run check-badge`
2. **Start/restart dev server**: `npm run dev` 
3. **Verify server is running**: Confirm it shows "Local: http://localhost:8080/"

## Development Server
- **CRITICAL**: Always restart `npm run dev` after edits to prevent connection refused errors
- Runs on: http://localhost:8080/
- Default port is 8080, not 3000
- If connection refused error occurs, IMMEDIATELY run `npm run dev`

## Icon Rules
- Each benefit item should have only ONE icon
- Remove duplicate emoji icons if there's already a component icon