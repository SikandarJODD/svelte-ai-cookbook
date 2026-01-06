<script lang="ts">
	import { Streamdown, type StreamdownProps } from 'svelte-streamdown';
	import { cn } from '$lib/utils';
	import { mode } from 'mode-watcher';
	// Import only the components you need
	import Code from 'svelte-streamdown/code'; // Shiki syntax highlighting
	// import Mermaid from 'svelte-streamdown/mermaid'; // Mermaid diagrams
	// import Math from 'svelte-streamdown/math';       // KaTeX math rendering

	type Props = StreamdownProps & {
		class?: string;
	};

	let { class: className, ...restProps }: Props = $props();
</script>

<Streamdown
	class={cn('size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)}
	baseTheme="shadcn"
	components={{ code: Code }}
	{...restProps}
/>
<!-- shikiTheme={mode.current === 'dark' ? 'vesper' : 'github-light-default'} -->
<!-- shikiPreloadThemes={["github-dark-default", "github-light-default"]} -->
