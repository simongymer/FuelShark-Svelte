<script lang="ts">
	import type { IData } from "../data.svelte";
	import * as utils from "../utils";

    const LOWER_MAX: number = 180; // Seconds
    const HIGHER_MAX: number = 600; // Seconds
    const MIN: number = 5;

    let { appData } : { appData: IData } = $props();

    let averageLapTimeStyle = $derived(() =>{ return utils.getRangeStyle(MIN, averageLapTimeMax, appData.averageLapTime, false); });
    let averageLapTimeMax = $derived(appData.maxAverageLapTimeBoost ? HIGHER_MAX : LOWER_MAX);

    let averageLapTime = $derived(() => {
        let minutes = Math.floor(appData.averageLapTime / 60);
        let seconds = appData.averageLapTime % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });

    function onMaxAverageLapTimeToggled(event: Event) {
        if (appData.maxAverageLapTimeBoost === true && appData.averageLapTime > LOWER_MAX)
            appData.averageLapTime = LOWER_MAX;
    }

    function decrease() {
        if (appData.averageLapTime > MIN)
            appData.averageLapTime --;
    }
    function increase() {
        if (appData.averageLapTime < averageLapTimeMax)
            appData.averageLapTime ++;
    }
</script>

<div class="field-with-spinners-container">
    <div class="slider-field-container">
        <div class="slider-info-bar">
            <label for="average-lap-time-input">Average Lap Time</label>
            <div class="toggle-switch-and-output">
                <div class="toggle-switch-field">
                    <label for="max-average-lap-time"></label>
                    <label class="switch">
                        <input type="checkbox" role="switch" id="max-average-lap-time" bind:checked={appData.maxAverageLapTimeBoost} onclick={onMaxAverageLapTimeToggled}>
                        <span class="slider"></span>
                    </label>
                </div>
                <span class="field-output">{averageLapTime()}</span>
            </div>
        </div>
        <div class="range-field">
            <input type="range" id="average-lap-time-input" min="{MIN}" max="{averageLapTimeMax}" bind:value={appData.averageLapTime} style="{averageLapTimeStyle()}"/> 
        </div>
    </div>
    <div class="value-spinner">
        <button type="button" onclick={decrease} aria-label="Decrease average lap time"></button>
        <button type="button" onclick={increase} aria-label="Increase average lap time"></button>
    </div>
</div>

<style>
    #max-average-lap-time + .slider:before {
        content: "3m"; /* LOWER_MAX */
    }
    #max-average-lap-time:checked + .slider:before {
        content: "10m"; /* HIGHER_MAX */
    }
</style>