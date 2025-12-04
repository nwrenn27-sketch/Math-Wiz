# Math Wiz

Professional calculus problem solver with AI-powered solutions and image analysis.

## Quick Start

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000

## Setup (Required for AI Features)

Math Wiz has 4 built-in problems but needs an API key to solve ANY problem.

### Get an API Key

**Anthropic Claude** (Recommended - best for math):
- Visit: https://console.anthropic.com/
- Create account → Get API key
- Free tier available

**OR OpenAI GPT-4**:
- Visit: https://platform.openai.com/
- Create account → Get API key
- Requires payment method

### Add Your API Key

Edit `config.js`:

```javascript
const CONFIG = {
    api: {
        anthropic: {
            apiKey: 'sk-ant-your-actual-key-here',  // Paste your key
            model: 'claude-3-5-sonnet-20241022',
            enabled: true  // Set to true
        }
    }
};
```

Save the file and refresh your browser. That's it!

## Features

### Text Input
- Type or paste ANY calculus problem
- Related rates, optimization, derivatives, integrals, limits, series
- Get step-by-step solutions with LaTeX math
- Concepts explained + common mistakes highlighted

### Image Upload
- Drag & drop or click to upload
- Upload photos of worksheets, textbooks, handwritten problems
- AI extracts text and solves automatically
- Supports PNG, JPG, PDF up to 10MB

### Solutions Include
- Beautiful LaTeX fraction rendering
- Color-coded diagrams
- Step-by-step explanations
- Conceptual understanding
- Common mistake warnings
- Final answer highlighted

## How It Works

### Without AI (4 Built-In Problems Only)
- Two cars moving apart
- Plane and radar station
- Balloon inflation
- Cube volume expansion

### With AI (Unlimited Problems)
- Solves ANY calculus problem you throw at it
- Analyzes images with vision AI
- Generates detailed step-by-step solutions
- Creates appropriate visualizations

## File Structure

```
Math Wiz/
├── index.html          # UI
├── styles.css          # Clean styling
├── script.js           # Core logic + fallback solutions
├── config.js           # ← ADD YOUR API KEY HERE
├── ai-integration.js   # AI features
└── README.md
```

## Tech Stack

- HTML5 + CSS3 (no frameworks)
- Vanilla JavaScript
- MathJax 3 for LaTeX
- Canvas API for diagrams
- Anthropic Claude or OpenAI GPT-4

## Costs

- **Built-in problems**: Free
- **AI (Claude)**: ~$0.01-0.05 per problem
- **AI (OpenAI)**: ~$0.05-0.15 per problem

Most students spend < $5/month.

## Troubleshooting

**"AI Required" message?**
- Add your API key to `config.js`
- Set `enabled: true`
- Refresh browser (hard refresh: Cmd+Shift+R)

**Image upload not working?**
- AI is required for image analysis
- Check API key is configured
- Image must be < 10MB

**Math not rendering?**
- Check browser console for errors
- Ensure MathJax loaded (check network tab)
- Try hard refresh

## Privacy

- All processing happens via your API key
- No data stored on our servers
- Images sent directly to AI provider (Anthropic/OpenAI)

## Browser Support

- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile responsive ✅
