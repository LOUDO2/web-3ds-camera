import { browser } from "$app/env";

export const settings = $state({
    zoomMode: 1,
    settingsOpen: false,
    themeColor: (browser && localStorage.getItem("themeColor")) || "#faa000"
});
