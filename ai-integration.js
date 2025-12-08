// ========================================================
// AI INTEGRATION MODULE
// ========================================================
// This file handles all AI API calls for enhanced problem solving
// Supports both Anthropic Claude and OpenAI GPT-4
// Includes vision AI for analyzing uploaded images
// ========================================================

/**
 * Math Wiz AI Integration
 * Handles API calls to Claude or OpenAI for solving math problems
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
     * Prefers Anthropic Claude if both are configured
     * @returns {string|null} - 'anthropic', 'openai', or null
     */
    selectProvider() {
        if (this.config.api.anthropic.enabled) {
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

        if (this.provider === 'anthropic') {
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

        if (this.provider === 'anthropic') {
            return await this.callClaudeWithImage(base64Image);
        } else if (this.provider === 'openai') {
            return await this.callOpenAIWithImage(base64Image);
        }
    }

    // ========================================================
    // PROMPT BUILDING
    // ========================================================

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
    "answer": "Final answer with LaTeX"
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
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above"
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
                            text: `Look at this math problem and help me understand it like you're a friend explaining it over coffee.

Be conversational and intuitive:
- Explain like you're teaching a friend, not reading a textbook
- Use real-world examples and analogies
- Focus on WHY things work, not just the mechanics
- Share the "aha moments" and intuition
- Point out what trips people up

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
    "type": "problem-type",
    "colors": {}
}`
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
                steps: [{
                    title: "Solution",
                    body: content,
                    equation: null,
                    concept: null,
                    mistake: null
                }],
                answer: "See solution above"
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
                            text: `Look at this math problem and help me understand it like you're a friend explaining it over coffee.

Be conversational and intuitive:
- Explain like you're teaching a friend, not reading a textbook
- Use real-world examples and analogies
- Focus on WHY things work, not just the mechanics
- Share the "aha moments" and intuition
- Point out what trips people up

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
    "type": "problem-type",
    "colors": {}
}`
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
    // ADDITIONAL AI FEATURES (Future expansion)
    // ========================================================

    /**
     * Ask AI to generate clarifying questions for unclear problems
     * @param {string} problemText - The unclear problem
     * @returns {Array<string>} - List of clarifying questions
     */
    async askClarifyingQuestions(problemText) {
        if (!this.provider) return [];

        const prompt = `A student submitted this math problem: "${problemText}"

If this problem is unclear or missing information, generate 2-3 clarifying questions to ask the student.
If the problem is clear, return an empty array.

Return as JSON array: ["Question 1?", "Question 2?"]`;

        const response = this.provider === 'anthropic'
            ? await this.callClaude(prompt)
            : await this.callOpenAI(prompt);

        try {
            return JSON.parse(response);
        } catch {
            return [];
        }
    }

    /**
     * Generate similar practice problems based on original
     * @param {string} originalProblem - The original problem
     * @param {number} count - Number of similar problems to generate
     * @returns {Array<object>} - Array of {problem, hint, answer}
     */
    async generateSimilarProblems(originalProblem, count = 3) {
        if (!this.provider) return [];

        const prompt = `Given this calculus problem:
"${originalProblem}"

Generate ${count} similar practice problems with different numbers/scenarios but the same concept.

Return as JSON array of objects:
[
    {
        "problem": "Problem text",
        "hint": "One sentence hint",
        "answer": "Final answer"
    }
]`;

        const response = this.provider === 'anthropic'
            ? await this.callClaude(prompt)
            : await this.callOpenAI(prompt);

        try {
            return JSON.parse(response);
        } catch {
            return [];
        }
    }

    /**
     * Get AI explanation of a specific calculus concept
     * @param {string} concept - The concept to explain
     * @returns {string} - Plain text explanation with examples
     */
    async explainConcept(concept) {
        if (!this.provider) return null;

        const prompt = `Explain this calculus concept to a student: "${concept}"

Provide:
1. A clear, simple explanation
2. An example
3. When to use it
4. Common misconceptions

Format as plain text, use LaTeX for math in $$ $$.`;

        const response = this.provider === 'anthropic'
            ? await this.callClaude(prompt)
            : await this.callOpenAI(prompt);

        return response;
    }
}

// ========================================================
// EXPORT
// ========================================================

// Export for use in other modules (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathWizAI;
}
