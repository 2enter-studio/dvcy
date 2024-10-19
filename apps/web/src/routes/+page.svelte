<script lang="ts">
	import type { Locale } from '@/config';

	const routes: { name: string; locale: Locale }[] = [
		{ name: '中文', locale: 'zh-tw' },
		{ name: 'English', locale: 'en' }
	];
</script>

<div class="full-screen flex flex-col items-center justify-between text-center">
	<div class=""></div>
	<div>
		<h3>請選擇語言</h3>
		<h3 class="mb-3">Pick a language</h3>
		<div class="flex justify-center gap-3">
			{#each routes as { name, locale }}
				<a href="/{locale}">{name}</a>
			{/each}
		</div>
	</div>

	<div class="mb-20 text-6xl font-extrabold tracking-wider">
		<h1 class="text-6xl">CHIAYI</h1>
		<h2 class="text-4xl">DATA-VERSE</h2>
	</div>
</div>
