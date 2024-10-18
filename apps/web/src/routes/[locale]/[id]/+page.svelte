<script lang="ts">
	const { data } = $props();
	const { id, locale, source } = data;
</script>

my id {id}
<a href="/{locale}?source={source}">Back</a>
