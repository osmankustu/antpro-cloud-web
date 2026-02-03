export interface OpenServiceModel {
  name: string;
  totalServiceCount: number;
  states: StateServiceModel[];
  lat: number;
  lon: number;
}
interface StateServiceModel {
  name: string;
  serviceCount: number;
  lat: number;
  lon: number;
}
