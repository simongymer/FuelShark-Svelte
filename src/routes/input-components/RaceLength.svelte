<script lang="ts">
	import type { IData } from "../data.svelte";
	import * as utils from "../utils";
    import * as constants from "../constants";

    const MIN_LAPS: number = 5;
    const MAX_LAPS: number = 100;
    const MIN_TIME: number = 5; // Minutes
    const LOWER_MAX_TIME: number = 60; // Minutes
    const HIGHER_MAX_TIME: number = 180; // Minutes

    let { appData } : { appData: IData } = $props();

    let raceLapsDisabled = $derived(appData.raceType === constants.TIMED_RACE_TYPE);
    let raceTimeDisabled = $derived(appData.raceType === constants.LAP_COUNT_RACE_TYPE);

    let raceLapsStyle = $derived(() =>{ return utils.getRangeStyle(MIN_LAPS, MAX_LAPS, appData.raceLaps, raceLapsDisabled); });
    let raceTimeStyle = $derived(() =>{ return utils.getRangeStyle(MIN_TIME, raceTimeMax, appData.raceTime, raceTimeDisabled); });
    let raceTimeMax = $derived(appData.maxRaceTimeBoost ? HIGHER_MAX_TIME : LOWER_MAX_TIME);
    
    let raceTime = $derived(() => {
        let hours = Math.floor(appData.raceTime / 60);
        let minutes = appData.raceTime % 60;
        
        return `${hours}h ${minutes}m`;
    });

    function onRaceMaxTimeToggled(event: Event) {
		if (appData.maxRaceTimeBoost === true && appData.raceTime > LOWER_MAX_TIME)
            appData.raceTime = LOWER_MAX_TIME;
	}
</script>

<!-- Race Laps -->
<div class="slider-field-container">
    <div class="slider-info-bar extra-padding">
        <div class="radio-field">
            <input type="radio" id="raceLaps" name="raceTypes" value={1} bind:group={appData.raceType} />
            <label for="raceLaps" class="{raceLapsDisabled ? 'muted' : ''}">Race Laps</label>
        </div>
        <span class="field-output {raceLapsDisabled ? 'disabled' : ''}"  >{appData.raceLaps} laps</span>
    </div>
    <div class="range-field">
        <input type="range" min="{MIN_LAPS}" max="{MAX_LAPS}" bind:value={appData.raceLaps} disabled={raceLapsDisabled} style="{raceLapsStyle()}"/> 
    </div>
</div>
<!-- Race Time -->
<div class="slider-field-container">
    <div class="slider-info-bar extra-padding">
        <div class="radio-field">
            <input type="radio" id="raceTime" name="raceTypes" value={2} bind:group={appData.raceType} />
            <label for="raceTime" class="{raceTimeDisabled ? 'muted' : ''}">Race Time</label>
        </div>
        <div class="toggle-switch-and-output">
            <div class="toggle-switch-field {raceTimeDisabled ? 'disabled' : ''}">
                <label for="max-race-time"></label>
                <label class="switch">
                    <input type="checkbox" role="switch" id="max-race-time" disabled={raceTimeDisabled} bind:checked={appData.maxRaceTimeBoost} onclick={onRaceMaxTimeToggled} >
                    <span class="slider"></span>
                </label>
            </div>
            <span class="field-output {raceTimeDisabled ? 'disabled' : ''}">{raceTime()}</span>
        </div>
    </div>
    <div class="range-field">
        <input type="range" min="{MIN_TIME}" max="{raceTimeMax}" step="5" bind:value={appData.raceTime} disabled={raceTimeDisabled} style="{raceTimeStyle()}" /> 
    </div>
</div>

<style>
    #max-race-time + .slider:before {
        content: "1H"; /* LOWER_MAX_TIME */
    }
    #max-race-time:checked + .slider:before {
        content: "3H"; /* HIGHER_MAX_TIME */
    }
</style>