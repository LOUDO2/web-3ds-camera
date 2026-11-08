<script lang="ts">
	import optionsBg from "#lib/assets/images/ui/options.png"
	import cameraBg from "#lib/assets/images/ui/camera.png"
    import Slider from "./slider.svelte";
    import { settings } from "#lib/stores/settings.svelte.ts";
</script>

<div class="footer">
	<Slider />
	<div class="buttons">
		<button class="button camera" style:background-color={settings.themeColor}>
			<img src={cameraBg} alt="Camera background" class="bg" />
		</button>
		<button class="button options" style:background-color={settings.themeColor} onclick={() => settings.settingsOpen = true}>
			<img src={optionsBg} alt="Options background" class="bg" />
		</button>
	</div>
</div>

<style lang="scss">
	.footer {
		position: absolute;
		bottom: -9px;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column;

		.buttons {
			display: flex;
			margin-inline: calc(-100% / 320);
			position: relative;
			z-index: 1;
		}

		.button {
			display: block;
			min-width: 0;
			padding: 0;
			border: 0;
		}

		.bg {
			display: block;
			width: 100%;
			height: auto;
		}

		.camera {
			flex: 228 1 0;
			opacity: 0.5;
			pointer-events: none;
		}

		.options {
			flex: 92 1 0;
		}
	}
</style>
