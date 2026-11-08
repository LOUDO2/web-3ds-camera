<script lang="ts">
	import Footer from "../components/footer.svelte";
    import PhotoPanel from "../components/photo-panel.svelte";
    import SettingsDialog from "../components/settings-dialog.svelte";
    import { settings } from "#lib/stores/settings.svelte.ts";
</script>

<svelte:head>
	<title>3DS Camera</title>
</svelte:head>

<main class="screen" style:background-color={settings.themeColor}>
	{#if settings.settingsOpen}
		<SettingsDialog />
	{/if}
	<PhotoPanel />
	<Footer />
</main>

<style lang="scss">
	:global(body) {
		margin: 0;
		background-color: #000;
		overflow: hidden;
	}

	.screen {
		position: fixed;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		width: min(100vw, 100vh * 4 / 3);
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}
</style>

