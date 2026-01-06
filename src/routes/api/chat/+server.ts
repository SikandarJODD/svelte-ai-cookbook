import { defaultModel, openrouter } from '$lib/config/openrouter';
import { streamText, type UIMessage, convertToModelMessages, createGateway } from 'ai';

export async function POST({ request }) {
	const { messages }: { messages: UIMessage[] } = await request.json();

	const result = streamText({
		model: openrouter(defaultModel),
		messages: await convertToModelMessages(messages)
	});

	return result.toUIMessageStreamResponse();
}
