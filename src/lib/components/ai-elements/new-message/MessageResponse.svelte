<script lang="ts">
	import { cn } from '$lib/utils';
	import { Streamdown, type StreamdownProps } from 'svelte-streamdown';
	import Code from 'svelte-streamdown/code'; // Shiki syntax highlighting
	import { mode } from 'mode-watcher';
	import type { HTMLAttributes } from 'svelte/elements';
	// Import Shiki themes
	import vesper from '@shikijs/themes/vesper';
	import githubLightDefault from '@shikijs/themes/github-light-default';

	type Props = {
		content: string;
		class?: string;
	} & Omit<StreamdownProps, 'content' | 'class'> &
		Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

	let { content, class: className, ...restProps }: Props = $props();

	// Reactive theme selection based on mode
	let currentTheme = $derived(mode.current === 'dark' ? 'vesper' : 'github-light-default');
</script>

<div class={cn('size-full', className)}>
	<Streamdown
		{content}
		components={{ code: Code }}
		baseTheme="shadcn"
		shikiTheme={currentTheme}
		shikiThemes={{ vesper, 'github-light-default': githubLightDefault }}
		{...restProps}
	/>
</div>
