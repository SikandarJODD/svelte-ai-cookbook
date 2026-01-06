<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';
	import {
		PromptInput,
		PromptInputActionAddAttachments,
		PromptInputActionMenu,
		PromptInputActionMenuContent,
		PromptInputActionMenuTrigger,
		PromptInputAttachment,
		PromptInputAttachments,
		PromptInputBody,
		PromptInputButton,
		type PromptInputMessage,
		PromptInputModelSelect,
		PromptInputModelSelectContent,
		PromptInputModelSelectItem,
		PromptInputModelSelectTrigger,
		PromptInputModelSelectValue,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputToolbar,
		PromptInputTools
	} from '$lib/components/ai-elements/prompt-input/index.js';
	import {
		Conversation,
		ConversationContent,
		ConversationScrollButton
	} from '$lib/components/ai-elements/conversation/index.js';
	import { Message, MessageContent } from '$lib/components/ai-elements/new-message/index.js';
	import { Response } from '$lib/components/ai-elements/response/index.js';
	import { MicIcon, GlobeIcon } from '@lucide/svelte';
	import MessageResponse from '$lib/components/ai-elements/new-message/MessageResponse.svelte';

	const models = [
		{ id: 'gpt-4o', name: 'GPT-4o' },
		{ id: 'claude-opus-4-20250514', name: 'Claude 4 Opus' }
	];

	let text = $state<string>('');
	let model = $state<string>(models[0].id);
	let useMicrophone = $state<boolean>(false);
	let useWebSearch = $state<boolean>(false);

	let chat = new Chat({});

	const handleSubmit = (message: PromptInputMessage) => {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);

		if (!(hasText || hasAttachments)) {
			return;
		}

		chat.sendMessage({ text: text });
		text = '';
	};
</script>

<div class="relative mx-auto mt-10 min-h-[93vh] max-w-4xl rounded-lg border">
	<div class="flex flex-col">
		<Conversation class="h-[80vh]">
			<ConversationContent>
				{#each chat.messages as message (message.id)}
					<Message from={message.role}>
						<MessageContent>
							{#each message.parts as part, i (i)}
								{#if part.type === 'text'}
									<MessageResponse content={part.text} parseIncompleteMarkdown={true} />
								{/if}
							{/each}
						</MessageContent>
					</Message>
				{/each}
			</ConversationContent>
			<ConversationScrollButton class="bottom-12" />
		</Conversation>

		<div class="absolute bottom-4 w-full">
			<PromptInput onSubmit={handleSubmit} class="mx-auto max-w-2xl" globalDrop multiple>
				<PromptInputBody class="border-none">
					<!-- <PromptInputAttachments>
						{#snippet children(attachment)}
							<PromptInputAttachment data={attachment} />
						{/snippet}
					</PromptInputAttachments> -->
					<PromptInputTextarea
						class="min-h-10"
						bind:value={text}
						onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
					/>
				</PromptInputBody>
				<PromptInputToolbar class="justify-end ">
					<PromptInputSubmit status={chat.status === 'streaming' ? 'streaming' : 'idle'} />
				</PromptInputToolbar>
			</PromptInput>
		</div>
	</div>
</div>
