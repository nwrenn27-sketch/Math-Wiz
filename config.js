// Math Wiz Configuration
// Add your API keys here for AI-powered features

const CONFIG = {
    // API Configuration
    api: {
        // Option 1: Anthropic Claude (Recommended for math)
        // Get your key at: https://console.anthropic.com/
        anthropic: {
            apiKey: '', // Add your Claude API key here
            model: 'claude-3-5-sonnet-20241022',
            enabled: false // Set to true when you add your key
        },

        // Option 2: OpenAI GPT
        // Get your key at: https://platform.openai.com/
        openai: {
            apiKey: '', // Add your OpenAI API key here
            model: 'gpt-4',
            enabled: false // Set to true when you add your key
        }
    },

    // Feature Flags
    features: {
        aiClarifyingQuestions: false, // AI asks clarifying questions for unclear problems
        aiSimilarProblems: false,     // AI generates similar practice problems
        aiConceptExplanations: false,  // AI explains concepts on demand
        imageOCR: false,               // OCR for uploaded images
        latexInput: false              // LaTeX input support
    },

    // Problem Types Supported
    problemTypes: {
        relatedRates: true,
        optimization: false,  // Coming soon
        integration: false,   // Coming soon
        derivatives: false,   // Coming soon
        limits: false,        // Coming soon
        series: false         // Coming soon
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
