# How to Add New Problems to Math Wiz

This guide will help you add new practice problems to the Math Wiz library.

## Current Status

**Total problems needed:** 180 (6 topics × 30 problems each)
**Currently have:** 4 related-rates easy problems
**Remaining:** 176 problems to add

### Problem Count by Topic

| Topic | Easy | Medium | Hard | Total |
|-------|------|--------|------|-------|
| Related Rates | 4/10 | 0/10 | 0/10 | 4/30 |
| Optimization | 0/10 | 0/10 | 0/10 | 0/30 |
| Integration | 0/10 | 0/10 | 0/10 | 0/30 |
| Derivatives | 0/10 | 0/10 | 0/10 | 0/30 |
| Limits | 0/10 | 0/10 | 0/10 | 0/30 |
| Series | 0/10 | 0/10 | 0/10 | 0/30 |

## Problem Structure

Each problem in `problems.js` follows this structure:

```javascript
{
    id: 'rr-easy-5',                    // Unique ID: topicAbbrev-difficulty-number
    title: 'Problem Title',             // Short, descriptive title
    problem: 'Full problem text...',    // The question students will solve
    visual: {
        type: 'diagram-type',           // Type of diagram to draw
        description: 'Alt text...'      // Accessibility description
    },
    steps: [                            // Array of solution steps
        {
            title: "Step Title",        // What this step does
            body: "Explanation...",     // Detailed explanation
            equation: "$$LaTeX$$",      // Math equation (optional)
            concept: "Key idea...",     // Conceptual insight (optional)
            mistake: "Common error...", // What students often get wrong (optional)
            highlightElements: []       // Which diagram elements to highlight
        }
    ],
    answer: "$LaTeX answer$",           // Final answer
    colors: {                           // Color coding for diagram variables
        x: '#3b82f6',                   // Blue
        y: '#8b5cf6',                   // Purple
        z: '#ef4444'                    // Red
    }
}
```

## Step-by-Step Guide to Adding a Problem

### 1. Choose Your Topic and Difficulty

Open `problems.js` and find the section for your topic:
- `'related-rates'`
- `'optimization'`
- `'integration'`
- `'derivatives'`
- `'limits'`
- `'series'`

Then find the difficulty array: `easy`, `medium`, or `hard`.

### 2. Create Your Problem Object

Copy this template:

```javascript
{
    id: 'xx-difficulty-N',              // e.g., 'rr-easy-5'
    title: 'Your Problem Title',
    problem: 'Write your problem statement here. Be clear and specific.',
    visual: {
        type: 'diagram-type',
        description: 'Describe what the diagram shows for screen readers'
    },
    steps: [
        {
            title: "First Step",
            body: "Write a clear, conversational explanation.",
            equation: "$$x^2 + y^2 = z^2$$",
            concept: "💡 This is the key insight students should understand.",
            mistake: "⚠️ Students often forget to do X or confuse Y with Z.",
            highlightElements: ['x', 'y']
        },
        // Add more steps...
    ],
    answer: "$\\text{Answer} = 42$",
    colors: { x: '#3b82f6', y: '#8b5cf6' }
}
```

### 3. Write Solution Steps

**Guidelines for good steps:**

1. **Be conversational** - Talk to the student like a friendly tutor, not a textbook
2. **Explain the "why"** - Don't just show calculations, explain the reasoning
3. **Use LaTeX for math** - Wrap equations in `$$...$$` for display math or `$...$` for inline
4. **Include concepts** - Add the `concept` field to highlight key ideas
5. **Warn about mistakes** - Use `mistake` field for common errors
6. **Keep steps focused** - Each step should do one main thing

**Example of a good step:**

```javascript
{
    title: "Find the rate relationship",
    body: "Since both the radius and volume are changing over time, we can use the chain rule to relate their rates. Remember, the derivative of volume with respect to time is what we're looking for.",
    equation: "$$\\frac{dV}{dt} = \\frac{dV}{dr} \\cdot \\frac{dr}{dt}$$",
    concept: "The chain rule lets us connect rates of related quantities - it's the bridge between what we know and what we want to find.",
    mistake: "Don't forget the chain rule term $\\frac{dr}{dt}$! Just differentiating $V = \\frac{4}{3}\\pi r^3$ gives you $\\frac{dV}{dr}$, not $\\frac{dV}{dt}$.",
    highlightElements: ['r']
}
```

### 4. Add Diagram Support (if needed)

If your problem needs a new diagram type, you'll need to add a drawing function in `practice-app.js`:

1. Find the `drawDiagram()` function
2. Add a new case for your diagram type
3. Create a `drawYourDiagramType(ctx, colors)` function

**Existing diagram types:**
- `two-cars` - Right triangle with perpendicular motion
- `plane-radar` - Right triangle with altitude
- `balloon` - Sphere with diameter
- `cube` - 3D cube with edges
- `generic` - Placeholder text

### 5. Add the Problem to problems.js

1. Open `problems.js`
2. Find the correct topic and difficulty array
3. Add your problem object to the array (inside the `[]`)
4. Make sure to add a comma after the previous problem
5. Save the file

**Example:**

```javascript
'related-rates': {
    easy: [
        {
            // Existing problem 1
        },
        {
            // Existing problem 2
        },
        {
            // YOUR NEW PROBLEM HERE
            id: 'rr-easy-5',
            title: 'Water Tank Draining',
            problem: '...',
            // ... rest of your problem
        }
    ],
    medium: [
        // ...
    ]
}
```

### 6. Test Your Problem

1. Open `index.html` in your browser
2. Select your topic and difficulty
3. Click on your problem
4. Test the step-by-step reveal:
   - Click "Show Next Step" to go forward
   - Click "Previous Step" to go back
   - Try "Show Full Solution" to see all steps
   - Try "Reset" to hide everything
   - Check that math renders correctly
   - Verify the diagram displays properly

### 7. Check Accessibility

Make sure your problem is accessible:
- [ ] `visual.description` clearly describes the diagram
- [ ] Math equations use proper LaTeX formatting
- [ ] Step explanations are clear without seeing the diagram
- [ ] Color coding is supplemented with labels (don't rely only on color)

## Topic-Specific Guidelines

### Related Rates
- Focus on how quantities change over time
- Always identify what's given (rates) vs what's unknown
- Show the relationship equation before differentiating
- Include units in the final answer

### Optimization
- Clearly state the objective function and constraints
- Show how to find critical points
- Verify that critical point is a max/min (first or second derivative test)
- Include context for the answer (e.g., dimensions, cost)

### Integration
- Start with identifying the type of integral
- Show any necessary substitutions or techniques
- Include bounds for definite integrals
- Verify answer by differentiation when possible

### Derivatives
- Show which rule(s) to apply (product, quotient, chain)
- Break down complex expressions step-by-step
- Simplify the final derivative
- Consider showing the graph behavior if relevant

### Limits
- Identify the indeterminate form (if any)
- Show algebraic manipulation or L'Hôpital's rule application
- Explain the behavior as x approaches the limit point
- Use numerical table if it helps build intuition

### Series
- Identify the series type (geometric, p-series, etc.)
- Show convergence/divergence tests clearly
- For Taylor series, show the pattern in terms
- Include interval of convergence when relevant

## Tips for Writing Great Problems

1. **Start easy, build complexity** - Easy problems should have 3-4 steps, hard problems can have 6-8
2. **Vary your scenarios** - Don't just repeat the same problem with different numbers
3. **Use real-world context** - Students engage more with practical applications
4. **Be encouraging** - Your tone should boost confidence, not intimidate
5. **Test thoroughly** - Work through your own problem to catch errors

## Common Mistakes to Avoid

❌ Don't use advanced notation without explaining it
❌ Don't skip steps - show all work
❌ Don't forget units in physics/application problems
❌ Don't use unclear variable names
❌ Don't make steps too long - break them up

✅ Do explain your reasoning
✅ Do use consistent notation
✅ Do include helpful diagrams
✅ Do warn about common errors
✅ Do make each step focused and clear

## Need Help?

If you're stuck or have questions:

1. **Look at existing problems** - The 4 related-rates problems are good examples
2. **Copy a similar problem** - Start with an existing problem and modify it
3. **Test incrementally** - Add one problem at a time and test it works

## Quick Reference: Topic Abbreviations

- `rr` = Related Rates
- `op` = Optimization
- `in` = Integration
- `dr` = Derivatives
- `lm` = Limits
- `sr` = Series

## Quick Reference: Color Codes

```javascript
colors: {
    variable1: '#3b82f6',  // Blue
    variable2: '#8b5cf6',  // Purple
    variable3: '#ef4444',  // Red
    variable4: '#10b981',  // Green
    variable5: '#f59e0b',  // Orange
    variable6: '#ec4899'   // Pink
}
```

---

Happy problem writing! Your students will appreciate the clear, step-by-step solutions. 🎓
