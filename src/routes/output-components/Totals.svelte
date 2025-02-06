<script lang="ts">
	import type { IData } from "../data.svelte";
    import * as constants from "../constants";

    let { appData } : { appData: IData } = $props();

    let totalFuel = $derived(() =>{
            let laps = appData.raceLaps;
            if (appData.formationLap === true)
                laps ++;
            if (appData.cooldownLap === true)
                laps ++;
            return (laps * (appData.fuelPerLap / 100));
        }
    );

    let totalLaps = $derived(() =>{
            let laps: number = 0;

            if (appData.raceType === constants.TIMED_RACE_TYPE) { // Timed race     
                let raceTime = (appData.raceTime * 60);
                let pitStopTime = Math.ceil(appData.pitStopCount * appData.pitStopTime);
                laps = Math.ceil((raceTime - pitStopTime) / appData.averageLapTime);
                if (laps <= 0)
                    laps = 1;
            }
            else { // Laps race
                laps = appData.raceLaps;
            }

            // Add extra laps.
            if (appData.formationLap === true)
                laps ++;
            if (appData.cooldownLap === true)
                laps ++;

            return laps;
        }
    );

    let totalTime = $derived(() => {
        let time = appData.raceTime;
        if (appData.raceType === constants.LAP_COUNT_RACE_TYPE) { // Laps  
            time = Math.ceil((totalLaps() * appData.averageLapTime) / 60);
        }

        if (appData.raceType === constants.LAP_COUNT_RACE_TYPE && appData.pitStopCount > 0) { // Laps with pit stops.
            let pitStopTime = Math.ceil((appData.pitStopCount * appData.pitStopTime) / 60);
            time = time + pitStopTime;
        }

        let hours = Math.floor(time / 60);
        let minutes = time % 60;
            
        return `${hours}h ${minutes}m`;
    });
</script>

<section>
    <div>
        <span>Total Fuel</span>
        <span>{totalFuel().toFixed(2)} litres</span>
    </div>
    <div>
        <span>Total Laps</span>
        <span>{totalLaps()} laps</span>
    </div>
    <div>
        <span>Total Time</span>
        <span>{totalTime()}</span>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 0 1.5rem;
        height: 100%;
    }
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 500;
        border-radius: .375rem;
        width: 100%;
    }
    div > span:first-child {
        text-transform: uppercase;
    }
    div > span:last-child {
        color: rgb(220, 53, 69);
        font-weight: 700;
    }
</style>