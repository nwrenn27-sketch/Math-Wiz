// ========================================================
// AI INTEGRATION MODULE
// ========================================================
// This file handles all AI API calls for enhanced problem solving
// Supports Google Gemini (FREE tier), Anthropic Claude, and OpenAI GPT-4
// Includes vision AI for analyzing uploaded images
// ========================================================

/**
 * Math Wiz AI Integration
 * Handles API calls to Gemini, Claude, or OpenAI for solving math problems
 */
class MathWizAI {
    /**
     * Initialize AI with configuration
     * @param {object} config - Configuration object from config.js
     */
    constructor(config) {
        this.config = config;
        this.provider = this.selectProvider();
    }

    /**
     * Select AI provider based on which API key is enabled
     * Preference order: Gemini (free) > Claude > OpenAI
     * @returns {string|null} - 'gemini', 'anthropic', 'openai', or null
     */
    selectProvider() {
        if (this.config.api.gemini.enabled) {
            return 'gemini';
        } else if (this.config.api.anthropic.enabled) {
            return 'anthropic';
        } else if (this.config.api.openai.enabled) {
            return 'openai';
        }
        return null;
    }

    // ========================================================
    // PUBLIC METHODS
    // ========================================================

    /**
     * Solve any math problem using AI (text input)
     * @param {string} problemText - The math problem to solve
     * @param {string} problemType - Type of problem (default: 'calculus')
     * @returns {object} - Solution object with steps, answer, colors
     */
    async solveProblemWithAI(problemText, problemType = 'calculus') {
        if (!this.provider) {
            throw new Error('No AI provider configured. Add an API key in config.js');
        }

        const prompt = this.buildSolutionPrompt(problemText, problemType);

        if (this.provider === 'gemini') {
            return await this.callGemini(prompt);
        } else if (this.provider === 'anthropic') {
            return await this.callClaude(prompt);
        } else if (this.provider === 'openai') {
            return await this.callOpenAI(prompt);
        }
    }

    /**
     * Solve math problem from uploaded image
     * Uses vision AI to extract problem text and solve
     * @param {string} base64Image - Base64 encoded image data
     * @returns {object} - Solution object with extractedText, steps, answer
     */
    async solveFromImage(base64Image) {
        if (!this.provider) {
            throw new Error('No AI provider configured. Add an API key in config.js');
        }

        if (this.provider === 'gemini') {
            return await this.callGeminiWithImage(base64Image);
        } else if (this.provider === 'anthropic') {
            return await this.callClaudeWithImage(base64Image);
        } else if (this.provider === 'openai') {
            return await this.callOpenAIWithImage(base64Image);
        }
    }

    /**
     * Generate a practice problem for a given topic and difficulty
     * @param {string} topic - Topic name (related-rates, optimization, etc.)
     * @param {string} difficulty - Difficulty level (easy, medium, hard)
     * @returns {object} - Practice problem with hint, solution, answer
     */
    async generatePracticeProblem(topic, difficulty = 'medium') {
        if (!this.provider) {
            throw new Error('No AI provider configured. Add an API key in config.js');
        }

        const prompt = this.buildPracticePrompt(topic, difficulty);

        if (this.provider === 'gemini') {
            return await this.callGemini(prompt);
        } else if (this.provider === 'anthropic') {
            return await this.callClaude(prompt);
        } else if (this.provider === 'openai') {
            return await this.callOpenAI(prompt);
        }
    }

    // ========================================================
    // PROMPT BUILDING
    // ========================================================

    /**
     * Build practice problem generation prompt
     * @param {string} topic - Topic name
     * @param {string} difficulty - Difficulty level
     * @returns {string} - Formatted prompt for AI
     */
    buildPracticePrompt(topic, difficulty) {
        const topicDescriptions = {
            'related-rates': 'related rates (rates of change in connected variables)',
            'optimization': 'optimization (finding maximum or minimum values)',
            'integration': 'integration (finding antiderivatives, area, volume)',
            'derivatives': 'derivatives (rates of change, slopes, tangent lines)',
            'limits': 'limits (behavior as x approaches a value)',
            'series': 'series (infinite sums, convergence tests)'
        };

        const difficultyGuidance = {
            'easy': 'simple, straightforward problem with basic calculations',
            'medium': 'moderate complexity, requires multiple steps',
            'hard': 'challenging problem with complex scenarios or multiple concepts'
        };

        return `Generate a ${difficulty} practice problem about ${topicDescriptions[topic] || topic}.

The problem should be:
- ${difficultyGuidance[difficulty]}
- Clear and well-defined with all necessary information
- Realistic and relatable (real-world context when possible)
- Appropriate for calculus students

Return as JSON:
{
    "problem": "The complete problem statement",
    "hint": "A helpful hint without giving away the answer",
    "steps": [
        {
            "title": "Step title",
            "body": "Brief explanation",
            "equation": "LaTeX equation in $$ $$"
        }
    ],
    "answer": "Final answer with LaTeX",
    "explanation": "Brief explanation of the key concept"
}`;
    }

    /**
     * Build image analysis prompt (shared between Claude and OpenAI)
     * @returns {string} - Formatted prompt for vision AI
     */
    buildImagePrompt() {
        return `Look at this math problem and help me understand it like you're a friend explaining it over coffee.

Be conversational and intuitive:
- Explain like you're teaching a friend, not reading a textbook
- Use real-world examples and analogies
- Focus on WHY things work, not just the mechanics
- Share the "aha moments" and intuition
- Point out what trips people up

IMPORTANT: Provide a diagram description so we can visualize the problem.

Return as JSON:
{
    "extractedText": "The problem from the image",
    "steps": [
        {
            "title": "Friendly step title",
            "body": "Conversational explanation with real context",
            "equation": "LaTeX in $$ $$",
            "concept": "The intuitive 'why' - what's really happening",
            "mistake": "What trips people up here"
        }
    ],
    "answer": "Final answer with LaTeX",
    "diagram": {
        "type": "geometry|graph|3d|none",
        "description": "What to draw",
        "elements": [
            {
                "shape": "line|circle|rectangle|curve|point|arrow|text",
                "label": "variable or label",
                "color": "primary|secondary|accent",
                "position": "position description"
            }
        ],
        "labels": {
            "variable1": "description"
        }
    },
    "colors": {
        "x": "#3b82f6",
        "y": "#ef4444"
    }
}`;
    }

    /**
     * Build conversational prompt for solving a text-based problem
     * Emphasizes intuitive explanations over robotic textbook style
     * @param {string} problemText - The problem to solve
     * @param {string} problemType - Type of problem (e.g., 'calculus')
     * @returns {string} - Formatted prompt for AI
     */
    buildSolutionPrompt(problemText, problemType) {
        return `You're a friendly tutor explaining ${problemType} to a student who wants to actually understand, not just get the answer.

Problem: ${problemText}

Explain this like you're helping a friend study. Be conversational and intuitive:
- Talk naturally, not like a textbook
- Use real-world analogies and examples
- Explain WHY things work, not just HOW
- Point out the "aha moments" and intuition
- Share tricks you'd tell a friend
- Warn about mistakes you've seen people make

IMPORTANT: Also provide a simple diagram description so we can visualize the problem.

Format your response as JSON:
{
    "steps": [
        {
            "title": "Friendly step title",
            "body": "Conversational explanation with real-world context",
            "equation": "LaTeX equation in $$ $$",
            "concept": "The intuitive 'why' behind this - what's really happening here",
            "mistake": "Real talk about what trips people up"
        }
    ],
    "answer": "Final answer with LaTeX",
    "diagram": {
        "type": "geometry|graph|3d|none",
        "description": "Brief description of what to draw (e.g., 'right triangle with sides x, y, hypotenuse z')",
        "elements": [
            {
                "shape": "line|circle|rectangle|curve|point|arrow|text",
                "label": "variable name or description",
                "color": "primary|secondary|accent",
                "position": "relative position description"
            }
        ],
        "labels": {
            "variable1": "what it represents",
            "variable2": "what it represents"
        }
    },
    "colors": {
        "x": "#3b82f6",
        "y": "#ef4444"
    }
}`;
    }

    // ========================================================
    // ANTHROPIC CLAUDE API CALLS
    // ========================================================

    /**
     * Call Anthropic Claude API with a text prompt
     * @param {string} prompt - The prompt to send
     * @returns {object} - Parsed JSON response with solution
     */
    async callClaude(prompt) {
        const apiKey = this.config.api.anthropic.apiKey;
        const model = this.config.api.anthropic.model;

        // Call Claude Messages API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model,
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content[0].text;

        // Parse JSON response from AI
        try {
            return JSON.parse(content);
        } catch (e) {
            // If AI didn't return JSON, wrap response in generic format
            return {
                type: 'generic',
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above",
                colors: {}
            };
        }
    }

    /**
     * Call Claude with vision AI to analyze uploaded image
     * @param {string} base64Image - Base64 encoded image
     * @returns {object} - Solution with extractedText, steps, answer
     */
    async callClaudeWithImage(base64Image) {
        const apiKey = this.config.api.anthropic.apiKey;
        const model = this.config.api.anthropic.model;

        // Extract base64 data and MIME type from data URL
        const imageData = base64Image.split(',')[1];
        const mimeType = base64Image.match(/data:(.*);base64/)[1];

        // Call Claude with image content block
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model,
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: mimeType,
                                data: imageData
                            }
                        },
                        {
                            type: 'text',
                            text: this.buildImagePrompt()
                        }
                    ]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content[0].text;

        try {
            return JSON.parse(content);
        } catch (e) {
            return {
                extractedText: content,
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above",
                type: 'generic',
                colors: {}
            };
        }
    }

    // ========================================================
    // OPENAI GPT-4 API CALLS
    // ========================================================

    /**
     * Call OpenAI GPT-4 API with a text prompt
     * @param {string} prompt - The prompt to send
     * @returns {object} - Parsed JSON response with solution
     */
    async callOpenAI(prompt) {
        const apiKey = this.config.api.openai.apiKey;
        const model = this.config.api.openai.model;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Parse JSON response
        try {
            return JSON.parse(content);
        } catch (e) {
            return {
                type: 'generic',
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above",
                colors: {}
            };
        }
    }

    /**
     * Call OpenAI GPT-4 Vision with uploaded image
     * @param {string} base64Image - Base64 encoded image
     * @returns {object} - Solution with extractedText, steps, answer
     */
    async callOpenAIWithImage(base64Image) {
        const apiKey = this.config.api.openai.apiKey;
        const model = 'gpt-4-vision-preview';

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{
                    role: 'user',
                    content: [
                        {
                            type: 'image_url',
                            image_url: {
                                url: base64Image
                            }
                        },
                        {
                            type: 'text',
                            text: this.buildImagePrompt()
                        }
                    ]
                }],
                max_tokens: 4096
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        try {
            return JSON.parse(content);
        } catch (e) {
            return {
                extractedText: content,
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above",
                type: 'generic',
                colors: {}
            };
        }
    }

    // ========================================================
    // GOOGLE GEMINI API METHODS
    // ========================================================

    /**
     * Call Google Gemini API with a text prompt
     * @param {string} prompt - The prompt to send
     * @returns {object} - Parsed JSON response with solution
     */
    async callGemini(prompt) {
        const apiKey = this.config.api.gemini.apiKey;
        const model = this.config.api.gemini.model;

        // Call Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 4096
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;

        // Parse JSON response from AI
        try {
            return JSON.parse(content);
        } catch (e) {
            // If AI didn't return JSON, wrap response in generic format
            return {
                type: 'generic',
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above",
                colors: {}
            };
        }
    }

    /**
     * Call Gemini with vision to analyze uploaded image
     * @param {string} base64Image - Base64 encoded image
     * @returns {object} - Solution with extractedText, steps, answer
     */
    async callGeminiWithImage(base64Image) {
        const apiKey = this.config.api.gemini.apiKey;
        const model = this.config.api.gemini.model;

        // Extract base64 data and MIME type from data URL
        const imageData = base64Image.split(',')[1];
        const mimeType = base64Image.match(/data:(.*);base64/)[1];

        // Call Gemini with image inline data
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: imageData
                            }
                        },
                        {
                            text: this.buildImagePrompt()
                        }
                    ]
                }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 4096
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;

        try {
            return JSON.parse(content);
        } catch (e) {
            return {
                extractedText: content,
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above",
                type: 'generic',
                colors: {}
            };
        }
    }

}
