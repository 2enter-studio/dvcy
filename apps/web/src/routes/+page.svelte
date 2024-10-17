<script lang="ts">
	import 'js-draw/styles';

	import eruda from 'eruda';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { Editor, Color4, PenTool, EraserTool, Vec2, EraserMode } from 'js-draw';
	import { zh } from '@/localization';
	import type { SignType } from '@/config';

	const CANVAS_SIZE = 500;

	let dom = $state<HTMLDivElement>();
	let editor = $state<Editor>();

	let signImgTransform = $state({ x: 0, y: 0, size: 0, rotation: 0 });
	let svgUrl = $state<string | null>(null);

	let signType = $state<SignType>(0);

	function updateSvgUrl() {
		if (!editor) return '';
		const serializer = new XMLSerializer();
		let source = serializer.serializeToString(editor.toSVG());

		if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}

		//add xml declaration
		source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

		//convert svg source to URI data scheme.
		svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
	}

	function init() {
		if (!dom) return;
		editor = new Editor(dom, { localization: zh, wheelEventsEnabled: false, minZoom: 0.1 });

		editor.getRootElement().style.height = dom.clientHeight + 'px';
		editor.getRootElement().style.width = dom.clientWidth + 'px';
		editor.getRootElement().style.backgroundColor = 'yellow';

		updateSignMask();
		updateSvgUrl();

		dom.addEventListener('touchmove', updateSignMask);
		dom.addEventListener('touchend', updateSvgUrl);
		dom.addEventListener('touchstart', updateSvgUrl);

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
		penTools.forEach((pen) => pen.setColor(Color4.fromString('#' + Math.floor(Math.random() * 16777215).toString(16))));

		const eraserTools = editor.toolController.getMatchingTools(EraserTool);
		eraserTools.forEach((eraser) => eraser.getModeValue().set(EraserMode.PartialStroke));
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

<div bind:this={dom} class="full-screen">
	{#if signImgTransform.size !== 0}
		{@const { x, y, size, rotation } = signImgTransform}
		<div
			class="pointer-events-none fixed bg-cover bg-center bg-no-repeat"
			style:background-image="url('/images/signs/0{signType + 1}.png')"
			style:outline="solid yellow {10000}px"
			style:left="{x}px"
			style:top="{y}px"
			style:width="{size}px"
			style:height="{size}px"
			style:transform="rotate({rotation}rad)"
			style:transform-origin="top left"
		></div>
	{/if}
</div>

<form
	action="?/submit"
	method="post"
	enctype="multipart/form-data"
	class="center-content pointer-events-none fixed bottom-0 w-screen flex-col"
	use:enhance={() => {
		return async ({ update, result }) => {
			await update({ reset: false });
		};
	}}
>
	<input type="text" name="file" value={svgUrl} hidden />
	<button type="submit" class="btn btn-primary pointer-events-auto">Submit</button>
</form>

<div class="center-content">
	<img
		src="/images/signs/0{signType + 1}.png"
		alt="result"
		style:background-image="url('{svgUrl}')"
		class="border-yellow fixed left-0 top-0 max-h-[30vw] max-w-[30vw] border-2 border-solid bg-cover bg-center bg-no-repeat"
	/>
</div>
