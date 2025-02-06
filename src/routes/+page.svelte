<script lang="ts">
    import { appData } from './data.svelte'
    
    import RaceLength from './input-components/RaceLength.svelte';
    import ExtraLaps from './input-components/ExtraLaps.svelte';
    import AverageLapTime from './input-components/AverageLapTime.svelte';
    import FuelPerLap from './input-components/FuelPerLap.svelte';
    import PitStops from './input-components/PitStops.svelte';

    import Totals from './output-components/Totals.svelte';
</script>

<svelte:head>
	<title>Fuel Shark</title>
</svelte:head>

<div id="data-input">
    <RaceLength appData={appData} />
    <ExtraLaps appData={appData} />
    <AverageLapTime appData={appData} />
    <FuelPerLap appData={appData} />
    <PitStops appData={appData} />
</div>

<div id="data-output">
	<Totals appData={appData} />
</div>

<style>
    #data-input,
    #data-output {
        border-radius: 0.375rem;
        border: 1px solid rgb(73 80 87 / 65%);
    }

    #data-output {
        margin-top: .5em;
        background-color: #1d2023;
        overflow: hidden;
        height: 100%;
    }
</style>