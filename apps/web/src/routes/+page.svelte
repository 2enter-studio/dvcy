<script lang="ts">
	import { Editor, Color4, getLocalizationTable } from 'js-draw';
	import { zh } from '@/localization';
	import 'js-draw/styles';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let dom = $state<HTMLDivElement>();
	let editor = $state<Editor>();
	let svgUrl = $state<string | null>(null);

	function makeIcon(className: string) {
		const icon = document.createElement('i');
		icon.className = className;
		return icon;
	}

	function getSVGURL() {
		if (!editor) return '';
		const serializer = new XMLSerializer();
		let source = serializer.serializeToString(editor.toSVG());

		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}

		//add xml declaration
		source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

		//convert svg source to URI data scheme.
		return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
	}

	onMount(() => {
		if (!dom) return;
		editor = new Editor(dom, { localization: zh });
		editor.getRootElement().style.height = dom.clientHeight + 'px';
		editor.getRootElement().style.width = dom.clientWidth + 'px';
		editor.dispatch(
			editor.setBackgroundStyle({
				color: Color4.white,
				autoresize: true
			})
		);
		editor.getCurrentSettings();
		editor.addToolbar();
	});
</script>

<div bind:this={dom} class="full-screen"></div>
<form
	action="?/submit"
	method="post"
	enctype="multipart/form-data"
	class="full-screen center-content pointer-events-none"
	use:enhance={() => {
		svgUrl = getSVGURL();
		return async ({ update, result }) => {
			await update({ reset: false });
		};
	}}
>
	<!--	<input name="file" type="file" bind:files accept="image/svg+xml" />-->
	<input type="text" name="file" value={svgUrl} hidden />
	<button type="submit" class="btn btn-primary pointer-events-auto">Submit</button>
</form>

<!--<img-->
<!--	src="data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%0D%0A%3Csvg%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%22-90.5%20-38%20888.5%20894.5%22%20width%3D%22888.5%22%20height%3D%22894.5%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22js-draw&#45;&#45;autoresize%22%3E%3Cstyle%20id%3D%22js-draw-style-sheet%22%3Epath%7Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7Dtext%7Bwhite-space%3Apre%3B%7D%3C%2Fstyle%3E%3Cpath%20d%3D%22M798%2C856.5l0-894.5l-888.5%2C0l0%2C894.5l888.5%2C0%22%20fill%3D%22%23ffffff%22%20class%3D%22js-draw-image-background%22%2F%3E%3Cpath%20d%3D%22M286%2C149q-29-11%20-39-7q-40%2C17%20-77%2C124q-41%2C120%2027%2C201q44%2C52%2084%2C40q62-19%20131-147q43-80%20-13-189q-49-47%20-96-80q-38-26%20-127-15q-68%2C9%2016%2C93q124%2C124%20374%2C254q60%2C31%20100%2C17q8-3%2026-35q29-53%20-18-170q-34-83%20-172-83q-67%2C0%20-91%2C57q-9%2C21%2017%2C39q20%2C14%20106%2C23q39%2C4%20196-28q32-30%2053-63q11-17%200-98q-5-39%20-10-70q-3-21%20-100-32q-120-14%20-238%2C39q-22%2C10%20-6%2C18q0%2C0%2016-5q15-5%20-142%2C90q-113%2C68%20-137%2C88%22%20fill%3D%22none%22%20stroke%3D%22%23803380%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M282%2C263q-1-16%20-14-24q-13-7%20-26%2C0q-13%2C8%20-14%2C24q1%2C15%2014%2C23q13%2C7%2026%2C0q13-8%2014-23%22%20fill%3D%22none%22%20stroke%3D%22%23803380%22%20stroke-width%3D%2299%22%2F%3E%3Cpath%20d%3D%22M130%2C308q-4%2C66%203%2C116q16%2C113%2023%2C121q23%2C23%2052%2C9q108-50%20126-131q14-64%20-96-11q-58%2C27%20-181%2C137q-22%2C20%2095%2C88q85%2C49%20194-7q44-23%2023-26q-58-9%20-112%2C31q-83%2C63%20-135%2C172q1-4%204-10%22%20fill%3D%22none%22%20stroke%3D%22%23803380%22%20stroke-width%3D%2299%22%2F%3E%3Cpath%20d%3D%22M189%2C650q33-60%2039-82q44-167%2028-207q-28-67%20-52-121q-2-5%20-26-26q-76-68%20-200-128q13%2C9%2038%2C26q16%2C10%2063%2C46q201%2C156%20366%2C284q-7%2C0%20-19-3%22%20fill%3D%22none%22%20stroke%3D%22%23803380%22%20stroke-width%3D%2299%22%2F%3E%3Cpath%20d%3D%22M161%2C149q-108%2C81%20-150%2C131q-52%2C62%20-1%2C73q46%2C10%20220-140q-15%2C4%20-40%2C16q-64%2C28%20-114%2C135q-7%2C16%20-12%2C29%22%20fill%3D%22none%22%20stroke%3D%22%23c27ac2%22%20stroke-width%3D%2299%22%2F%3E%3Cpath%20d%3D%22M288%2C72q-71-1%20-91%2C7q-40%2C17%2013%2C65q56%2C52%20271%2C186q0-6%20-2-15%22%20fill%3D%22none%22%20stroke%3D%22%23c27ac2%22%20stroke-width%3D%2299%22%2F%3E%3Cpath%20d%3D%22M241%2C705l86-485l-98-18l-86%2C486l-97-17l120%2C172l173-121l-98-17%22%20fill%3D%22%23c27ac2%22%2F%3E%3C%2Fsvg%3E"-->
<!--	alt=""-->
<!--/>-->
