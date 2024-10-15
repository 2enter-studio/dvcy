<script lang="ts">
	import P5 from 'p5';
	import { watch } from 'runed';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	let canvas = $state<HTMLCanvasElement>();
	let bgColor = $state(255);
	let resultId = $state<string | null>(null);

	let dataUrl = $state('');

	$effect(() => {
		console.log(dataUrl);
	});

	const sketch = (p: P5) => {
		p.setup = () => {
			p.createCanvas(400, 400, 'p2d', canvas);
			p.colorMode(p.HSB);
			p.background(bgColor, 255, 125);
		};
		p.draw = () => {
			p.background(bgColor, 255, 125);
		};
	};

	const ws = new WebSocket('ws://localhost:3000/ws');
	ws.onopen = () => {
		console.log('open');
	};
	ws.onmessage = (e) => {
		console.log('received: ', e.data);

		resultId = JSON.parse(e.data)?.id;
		console.log(resultId);
	};

	watch(
		() => bgColor,
		() => {
			setTimeout(() => {
				if (!canvas) return;
				dataUrl = canvas.toDataURL();
			}, 200);
		}
	);

	onMount(() => {
		const p5 = new P5(sketch);

		return () => {
			p5?.clear();
		};
	});
</script>

<div class="full-screen flex flex-col gap-5 px-10">
	<div class="flex flex-row justify-evenly text-center">
		<div class="flex flex-col">
			<h1>localhost</h1>
			<canvas bind:this={canvas}></canvas>
		</div>
		<div class="flex w-[400px] flex-col">
			<h1>{resultId ?? 'result_id'}</h1>
			{#if resultId}
				<img class="size-[400px] bg-white" src="/api/image/{resultId}" alt="" />
			{/if}
		</div>
	</div>

	<input type="range" class="range range-secondary" min="0" max="255" bind:value={bgColor} />

	<form
		action="?/submit"
		method="post"
		class="center-content"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });
			};
		}}
	>
		<input type="text" name="dataUrl" id="dataUrl" value={dataUrl} hidden />
		<button class="btn btn-primary" type="submit">Submit</button>
	</form>

	<!--<img src={dataUrl} alt="" />-->
</div>
