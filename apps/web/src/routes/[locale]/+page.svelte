<script lang="ts">
	import 'js-draw/bundledStyles';

	import eruda from 'eruda';
	import { Editor, Color4, PenTool, EraserTool, Vec2, EraserMode } from 'js-draw';

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import { localizations } from '@/localization';
	import { SIGN_TYPES, type SignType } from '@/config';
	import { TimerState } from '@/states';

	const { data } = $props();
	const { locale } = data;

	const localization = localizations[locale];
	const CANVAS_SIZE = 500;

	let dom = $state<HTMLDivElement>();
	let submitBtn = $state<HTMLButtonElement>();
	let editor = $state<Editor>();
	let timer = $state<TimerState>();

	let signImgTransform = $state({ x: 0, y: 0, size: 0, rotation: 0 });
	let resultUrl = $state<string | null>(null);
	let signType = $state<SignType>(data.signType);

	const signImgPath = $derived.by(() => {
		if (signType > 4) signType = 0;
		if (signType < 0) signType = 4;
		return `/images/signs/0${signType + 1}.png`;
	});

	function makeIconElement(className: string) {
		const i = document.createElement('i');
		i.className = className;
		return i;
	}

	function updateResultUrl() {
		if (!editor) return;
		resultUrl = editor.toDataURL('image/jpeg', Vec2.of(1000, 1000));
		return;
		// const serializer = new XMLSerializer();
		// const svg = editor.toSVG();
		// let source = serializer.serializeToString(svg);
		//
		// if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
		// 	source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		// }
		// if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
		// 	source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		// }
		//
		// //add xml declaration
		// source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
		// // svgUrl = encodeURIComponent(source);
		//
		// // //convert svg source to URI data scheme.
		// svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
	}

	function init() {
		if (!dom) return;
		editor = new Editor(dom, { localization, wheelEventsEnabled: false, minZoom: 0.1 });

		editor.getRootElement().style.height = dom.clientHeight + 'px';
		editor.getRootElement().style.width = dom.clientWidth + 'px';

		updateSignMask();
		updateResultUrl();

		dom.addEventListener('touchmove', updateSignMask);
		dom.addEventListener('touchend', updateResultUrl);
		dom.addEventListener('touchstart', () => {
			updateResultUrl();
			if (!timer) timer = new TimerState();
		});

		editor.dispatch(
			editor.setBackgroundStyle({
				color: Color4.white,
				autoresize: false,
				type: 0
			}),
			false
		);
		editor.getCurrentSettings();
		editor.addToolbar();

		const penTools = editor.toolController.getMatchingTools(PenTool);
		penTools.forEach((pen) => {
			pen.setColor(
				Color4.fromString(
					'#' +
						Math.floor((Math.random() * 0xffffff) << 0)
							.toString(16)
							.padStart(6, '0')
				)
			);
			pen.setThickness(Math.random() * 53 + 2);
		});

		const eraserTools = editor.toolController.getMatchingTools(EraserTool);
		eraserTools.forEach((eraser) => eraser.getModeValue().set(EraserMode.PartialStroke));

		const actions = [
			{ name: 'redo', icon: 'turn-right' },
			{ name: 'undo', icon: 'turn-left' }
		];
		const actionBtns = actions.map(({ name }) => document.querySelector(`.toolwidget-tag--${name} > [role="button"]`) as HTMLDivElement);
		actionBtns.forEach((btn, i) => {
			btn.classList.add('text-primary');
			btn.innerHTML = '';
			const icon = makeIconElement(`fa-solid fa-${actions[i].icon} text-3xl`);
			btn.appendChild(icon);
		});
		const actionRow = document.querySelector('.toolbar-action-row') as HTMLDivElement;
		actionRow.innerHTML = '';
		actionRow.appendChild(actionBtns[1]);
		actionRow.appendChild(submitBtn as HTMLButtonElement);
		actionRow.appendChild(actionBtns[0]);
	}

	function updateSignMask() {
		if (!editor) return;
		const { viewport } = editor;
		const { x, y } = viewport.canvasToScreen(Vec2.of(0, 0));
		const size = CANVAS_SIZE / viewport.getSizeOfPixelOnCanvas();
		const rotation = viewport.getRotationAngle();
		signImgTransform = { x, y, size, rotation };
	}

	onMount(() => {
		eruda.init();
		init();
	});
</script>

{#each SIGN_TYPES as num}
	<link rel="preload" href="/images/signs/0{num + 1}.png" as="image" />
{/each}

<div bind:this={dom} class="full-screen bg-base-100">
	{#if signImgTransform.size !== 0}
		{@const { x, y, size, rotation } = signImgTransform}
		<div
			class="pointer-events-none fixed border-4 border-solid border-base-100 bg-cover bg-center bg-no-repeat"
			style:background-image="url({signImgPath})"
			style:outline="solid 10000px oklch(var(--b1))"
			style:left="{x}px"
			style:top="{y}px"
			style:width="{size}px"
			style:height="{size}px"
			style:transform="rotate({rotation}rad)"
			style:transform-origin="top left"
		></div>
	{/if}
	<div class="full-screen pointer-events-none flex flex-col justify-between px-3 pb-6 text-6xl">
		<div class="flex w-full justify-between">
			<button>{timer?.count ?? 0}</button>
			<button>{''}</button>
		</div>
		<div class="flex w-full justify-between *:pointer-events-auto">
			<button aria-label="button" class="h-fit w-fit text-primary" onclick={() => signType--}>
				<i class="fa-solid fa-caret-left fa-sharp"></i>
			</button>
			<button aria-label="button" class="h-fit w-fit text-primary" onclick={() => signType++}>
				<i class="fa-solid fa-caret-right fa-sharp"></i>
			</button>
		</div>
		<div></div>
	</div>
</div>

<form
	id="form"
	action="?/submit"
	method="post"
	enctype="multipart/form-data"
	hidden
	use:enhance={({ cancel }) => {
		if (!confirm(`${localization.confirm}?`)) cancel();
		return async ({ update }) => {
			timer?.stop();
			await update({ reset: false });
		};
	}}
>
	<input type="text" name="sign-pic" value={resultUrl} />
	<input type="text" name="sign-type" value={signType} />
	<input type="text" name="draw-duration" value={timer?.count ?? 0} />
</form>

<!--<div class="center-content">-->
<!--	<img-->
<!--		src="/images/signs/0{signType + 1}.png"-->
<!--		alt="result"-->
<!--		style:background-image="url('{svgUrl}')"-->
<!--		class="pointer-events-none fixed left-0 top-0 max-h-[30vw] max-w-[30vw] bg-cover bg-center bg-no-repeat"-->
<!--	/>-->
<!--</div>-->

<button bind:this={submitBtn} hidden={!resultUrl} form="form" type="submit" class="btn btn-primary pointer-events-auto text-2xl text-white">
	{localization.upload.toUpperCase()}
</button>
