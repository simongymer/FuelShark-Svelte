<script lang="ts">
	import type { IData } from "../data.svelte";
	import * as utils from "../utils";

    const MIN_PITSTOP_COUNT :number = 0;
    const MAX_PITSTOP_COUNT :number = 10;
    const MIN_PITSTOP_TIME :number = 5; // Seconds
    const MAX_PITSTOP_TIME :number = 180; // Seconds

    let { appData } : { appData: IData } = $props();

    let pitStopTimeDisabled = $derived(appData.pitStopCount === 0);
    let pitStopCountStyle = $derived(() =>{ return utils.getRangeStyle(MIN_PITSTOP_COUNT, MAX_PITSTOP_COUNT, appData.pitStopCount, false); });
    let pitStopTimeStyle = $derived(() =>{ return utils.getRangeStyle(MIN_PITSTOP_TIME, MAX_PITSTOP_TIME, appData.pitStopTime, pitStopTimeDisabled); });

    let pitStopCount = $derived(() => {
        return `${appData.pitStopCount} stops`;
    });

    let pitStopTime = $derived(() => {
        let minutes = Math.floor(appData.pitStopTime / 60);
        let seconds = appData.pitStopTime % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
</script>

<div class="accordion" id="pit-stop-accordian" >
    <div class="accordion-item">
        <input type="checkbox" id="pit-stops-accordion-item">
        <label for="pit-stops-accordion-item">
            <span>Pit Stops</span>
            <span class="field-output white-space-nowrap {appData.pitStopCount === 0 ? 'muted' : ''}">{pitStopCount()}</span>
        </label>
        <div class="accordion-item-body">
            <div class="slider-field-container">
                <div class="slider-info-bar">
                    <label for="average-lap-time-input">Time Lost Per Stop</label>
                    <span class="field-output {appData.pitStopCount === 0 ? 'muted' : ''}">{pitStopTime()}</span>
                </div>
                <div class="range-field">
                    <input type="range" id="pit-stop-time-input" min="{MIN_PITSTOP_TIME}" max="{MAX_PITSTOP_TIME}" bind:value={appData.pitStopTime} disabled={pitStopTimeDisabled} style="{pitStopTimeStyle()}"/> 
                </div>
            </div>
            <div class="slider-field-container">
                <div class="slider-info-bar">
                    <label for="pit-stop-count-input">Stop Count</label>
                    <span class="field-output {appData.pitStopCount === 0 ? 'muted' : ''}">{pitStopCount()}</span>
                </div>
                <div class="range-field">
                    <input type="range" min="{MIN_PITSTOP_COUNT}" max="{MAX_PITSTOP_COUNT}" bind:value={appData.pitStopCount} style="{pitStopCountStyle()}"/> 
                </div>
            </div>
        </div>
    </div>
</div>