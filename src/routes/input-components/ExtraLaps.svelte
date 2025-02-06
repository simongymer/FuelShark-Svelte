<script lang="ts">
	import type { IData } from "../data.svelte";

    let { appData } : { appData: IData } = $props();
</script>

<div class="toggle-switches-field-container">
    <div class="toggle-switch-field">
        <label for="formation-lap">Formation Lap</label>
        <label class="switch">
            <input type="checkbox" role="switch" id="formation-lap" bind:checked={appData.formationLap} >
            <span class="slider"></span>
        </label>
    </div>
    <div class="toggle-switch-field">
        <label for="cooldown-lap">Cooldown Lap</label>
        <label class="switch">
            <input type="checkbox" role="switch" id="cooldown-lap" bind:checked={appData.cooldownLap} >
            <span class="slider"></span>
        </label>
    </div>
</div>