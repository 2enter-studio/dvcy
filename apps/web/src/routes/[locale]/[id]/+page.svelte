<script lang="ts">
	import { onMount } from 'svelte';
	import { localizations } from '@/localization';
	import { browser } from '$app/environment';
	import eruda from 'eruda';

	const { data } = $props();
	const { id, imgUrl, locale, source } = data;

	const localization = localizations[locale];

	onMount(() => {
		if (!browser) return;
		eruda.init();
		if (window.DeviceOrientationEvent) {
			console.log('start listening to device orientation');
			window.addEventListener('deviceorientation', (e) => {
				console.log(e.beta, e.alpha, e.gamma);
			});
		} else {
			console.warn('can not detect device orientation');
		}
		if (!document.querySelector('a')) {
			window.location.reload();
		}
	});
</script>

<div
	class="full-screen bg-cover bg-center bg-no-repeat p-0.5"
	style="background-image: url(https://watermark.lovepik.com/photo/20211120/large/lovepik-taiwan-street-picture_500505334.jpg)"
>
	<div class="flex h-full flex-col items-center justify-between border-[1.5rem] border-solid border-secondary/50 bg-primary/40 py-12">
		<h1 class="text-center text-3xl font-bold tracking-wide">{localization.downloadYourSign}</h1>
		<img src={imgUrl} alt="your sign" class="max-h-[60%] max-w-[93%] rounded-lg border-4 border-black shadow-xl shadow-black/40" />
		<a href="/{locale}?source={source}" class="btn btn-secondary">{localization.back}</a>
	</div>
</div>
