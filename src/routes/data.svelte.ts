import * as storage from "./storage";

export interface IData {
    raceType: number;
    maxRaceTimeBoost: boolean;
    raceLaps: number;
    raceTime: number; // Minutes
    formationLap: boolean;
    cooldownLap: boolean;
    averageLapTime: number; // Seconds
    maxAverageLapTimeBoost: boolean;
    fuelPerLap: number;
    maxFuelPerLapBoost: boolean;
    pitStopCount: number;
    pitStopTime: number; // Seconds
}

// Get the starting values from the local storage or set them to the values listed.
const defaultAppData: IData = storage.getItemFromLocalStorage<IData>("appData", {
    raceType: 2,
    maxRaceTimeBoost: false,
    raceLaps: 15,
    raceTime: 15, // Minutes
    formationLap: false,
    cooldownLap: true,
    averageLapTime: 90, // Seconds
    maxAverageLapTimeBoost: false,
    fuelPerLap: 250,
    maxFuelPerLapBoost: false,
    pitStopCount: 0,
    pitStopTime: 40 // Seconds
});

export const appData: IData = $state({
    // Use get/set to access properties so that we can saved to local storage when the values mutate.
    get raceType(): number { return this._raceType; }, set raceType(value: number) { this._raceType = value; appDataMutated(); },
    get raceLaps(): number { return this._raceLaps; }, set raceLaps(value: number) { this.raceLaps = value; appDataMutated(); },
    get maxRaceTimeBoost(): boolean { return this._maxRaceTimeBoost; }, set maxRaceTimeBoost(value: boolean) { this._maxRaceTimeBoost = value; appDataMutated(); },
    get raceTime(): number { return this._raceTime; }, set raceTime(value: number) { this._raceTime = value; appDataMutated(); },
    get formationLap(): boolean { return this._formationLap; }, set formationLap(value: boolean) { this._formationLap = value; appDataMutated(); },
    get cooldownLap(): boolean { return this._cooldownLap; }, set cooldownLap(value: boolean) { this._cooldownLap = value; appDataMutated(); },
    get averageLapTime(): number { return this._averageLapTime; }, set averageLapTime(value: number) { this._averageLapTime = value; appDataMutated(); },
    get maxAverageLapTimeBoost(): boolean { return this._maxAverageLapTimeBoost; }, set maxAverageLapTimeBoost(value: boolean) { this._maxAverageLapTimeBoost = value; appDataMutated(); },
    get fuelPerLap(): number { return this._fuelPerLap; }, set fuelPerLap(value: number) { this._fuelPerLap = value; appDataMutated(); },
    get maxFuelPerLapBoost(): boolean { return this._maxFuelPerLapBoost; }, set maxFuelPerLapBoost(value: boolean) { this._maxFuelPerLapBoost = value; appDataMutated(); },
    get pitStopCount(): number { return this._pitStopCount; }, set pitStopCount(value: number) { this._pitStopCount = value; appDataMutated(); },
    get pitStopTime(): number { return this._pitStopTime; }, set pitStopTime(value: number) { this._pitStopTime = value; appDataMutated(); },
    
    // Set the starting values from the default app data (which is either defaulted or whatever the last values were from local storage).
    _raceType: defaultAppData.raceType,
    _maxRaceTimeBoost: defaultAppData.maxRaceTimeBoost,
    _raceLaps: defaultAppData.raceLaps,
    _raceTime: defaultAppData.raceTime,
    _formationLap: defaultAppData.formationLap,
    _cooldownLap: defaultAppData.cooldownLap,
    _averageLapTime: defaultAppData.averageLapTime,
    _maxAverageLapTimeBoost: defaultAppData.maxAverageLapTimeBoost,
    _fuelPerLap: defaultAppData.fuelPerLap,
    _maxFuelPerLapBoost: defaultAppData.maxFuelPerLapBoost,
    _pitStopCount: defaultAppData.pitStopCount,
    _pitStopTime: defaultAppData.pitStopTime
});

function appDataMutated(){
    storage.setItemInLocalStorage("appData", appData);
}
