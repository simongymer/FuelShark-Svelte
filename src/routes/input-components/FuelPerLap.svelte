<script lang="ts">
	import type { IData } from "../data.svelte";
	import * as utils from "../utils";

    const LOWER_MAX: number = 400;
    const HIGHER_MAX: number = 2500;
    const MIN: number = 5;

    let { appData } : { appData: IData } = $props();

    let fuelPerLapStyle = $derived(() =>{ return utils.getRangeStyle(MIN, fuelPerLapMax, appData.fuelPerLap, false); });
    let fuelPerLapMax = $derived(appData.maxFuelPerLapBoost ? HIGHER_MAX : LOWER_MAX);

    let fuelPerLap = $derived(() => {
        return `${(appData.fuelPerLap / 100).toFixed(2)} litres`;
    });

    function onMaxFuelPerLapToggled(event: Event) {
        if (appData.maxFuelPerLapBoost === true && appData.fuelPerLap > LOWER_MAX)
            appData.fuelPerLap = LOWER_MAX;
    }

    function decrease() {
        if (appData.fuelPerLap > MIN)
            appData.fuelPerLap --;
    }
    function increase() {
        if (appData.fuelPerLap < fuelPerLapMax)
            appData.fuelPerLap ++;
    }
</script>

<div class="field-with-spinners-container">
    <div class="slider-field-container">
        <div class="slider-info-bar">
            <label for="fuel-per-lap-input">Fuel Per Lap</label>
            <div class="toggle-switch-and-output">
                <div class="toggle-switch-field">
                    <label for="max-fuel-per-lap"></label>
                    <label class="switch">
                        <input type="checkbox" role="switch" id="max-fuel-per-lap" bind:checked={appData.maxFuelPerLapBoost} onclick={onMaxFuelPerLapToggled}>
                        <span class="slider"></span>
                    </label>
                </div>
                <span class="field-output">{fuelPerLap()}</span>
            </div>
        </div>
        <div class="range-field">
            <input type="range" id="fuel-per-lap-input" min="{MIN}" max="{fuelPerLapMax}" bind:value={appData.fuelPerLap} style="{fuelPerLapStyle()}" />
        </div> 
    </div>
    <div class="value-spinner">
        <button type="button" onclick={decrease} aria-label="Decrease fuel per lap"></button>
        <button type="button" onclick={increase} aria-label="Increase fuel per lap"></button>
    </div>
</div>

<style>
    #max-fuel-per-lap + .slider:before {
        content: "4l"; /* LOWER_MAX */
    }
    #max-fuel-per-lap:checked + .slider:before {
        content: "25l"; /* HIGHER_MAX */
    }
</style>