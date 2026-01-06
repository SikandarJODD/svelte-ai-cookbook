<script lang="ts">
	import { cn } from '$lib/utils';
	import { Streamdown, type StreamdownProps } from 'svelte-streamdown';
	import Code from 'svelte-streamdown/code'; // Shiki syntax highlighting
	import { mode } from 'mode-watcher';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		content: string;
		class?: string;
	} & Omit<StreamdownProps, 'content' | 'class'> &
		Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

	let { content, class: className, ...restProps }: Props = $props();
</script>

<div class={cn('size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)}>
	<Streamdown
		{content}
		shikiTheme={mode.current === 'dark' ? 'vesper' : 'github-light-default'}
		baseTheme="shadcn"
		components={{ code: Code }}
		{...restProps}
	/>
</div>
