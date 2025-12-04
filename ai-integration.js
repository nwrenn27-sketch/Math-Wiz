// AI Integration Module
// This file handles all AI API calls for enhanced problem solving

class MathWizAI {
    constructor(config) {
        this.config = config;
        this.provider = this.selectProvider();
    }

    selectProvider() {
        if (this.config.api.anthropic.enabled) {
            return 'anthropic';
        } else if (this.config.api.openai.enabled) {
            return 'openai';
        }
        return null;
    }

    // Solve any math problem using AI
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

    // Solve from uploaded image
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

    // Call Anthropic Claude API
    async callClaude(prompt) {
        const apiKey = this.config.api.anthropic.apiKey;
        const model = this.config.api.anthropic.model;

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

        // Parse JSON response
        try {
            return JSON.parse(content);
        } catch (e) {
            // If not JSON, wrap in generic format
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

    // Call Claude with image
    async callClaudeWithImage(base64Image) {
        const apiKey = this.config.api.anthropic.apiKey;
        const model = this.config.api.anthropic.model;

        const imageData = base64Image.split(',')[1];
        const mimeType = base64Image.match(/data:(.*);base64/)[1];

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

    // Call OpenAI GPT API
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

    // Call OpenAI with image
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

    // Ask clarifying questions about an unclear problem
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

    // Generate similar practice problems
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

    // Explain a specific concept
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

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathWizAI;
}
