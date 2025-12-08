// ========================================================
// MATH WIZ CONFIGURATION
// ========================================================
// Add your API keys here to enable AI-powered features
// Without an API key, the app will only work with 4 built-in problems
// ========================================================

const CONFIG = {
    // ========================================================
    // API CONFIGURATION
    // ========================================================
    api: {
        // Option 1: Anthropic Claude (Recommended for math)
        // Claude is excellent at mathematical reasoning and explanations
        // Get your key at: https://console.anthropic.com/
        // Cost: ~$0.01-0.05 per problem
        anthropic: {
            apiKey: '',                             // Paste your Claude API key here (starts with sk-ant-...)
            model: 'claude-3-5-sonnet-20241022',   // Recommended: Claude 3.5 Sonnet for best math performance
            enabled: false                          // Set to true after adding your API key
        },

        // Option 2: OpenAI GPT-4
        // GPT-4 is also capable but more expensive than Claude
        // Get your key at: https://platform.openai.com/
        // Cost: ~$0.05-0.15 per problem
        openai: {
            apiKey: '',                             // Paste your OpenAI API key here (starts with sk-...)
            model: 'gpt-4',                         // GPT-4 for best results (gpt-3.5-turbo is cheaper but less accurate)
            enabled: false                          // Set to true after adding your API key
        }
    }
};

// ========================================================
// EXPORT
// ========================================================

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
