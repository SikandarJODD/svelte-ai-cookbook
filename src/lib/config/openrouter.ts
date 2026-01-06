import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openrouter = createOpenRouter({
	apiKey: OPENROUTER_API_KEY
});

export const defaultModel = 'kwaipilot/kat-coder-pro:free';

// Available free models on OpenRouter : https://openrouter.ai/models
// Choose your preferred free model
// z-ai/glm-4.5-air:free
// mistralai/devstral-2512:free
// mistralai/mistral-7b-instruct:free
// openai/gpt-oss-120b:free
// kwaipilot/kat-coder-pro:free - 12 jan 2026 - expiry date
