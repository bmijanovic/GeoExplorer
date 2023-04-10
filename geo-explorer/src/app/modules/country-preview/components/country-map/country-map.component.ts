import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {latLng, LeafletEvent, MapOptions, Map, tileLayer, geoJSON, Icon} from "leaflet";
import osmtogeojson from "osmtogeojson";
import {Country} from "../../../shared/models/country";

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit, OnDestroy{
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions = {
    layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    maxBounds : [
      [-90, -180],
      [90, 180]],
    zoom:1,
    center:latLng(0,0)
  };
  public map!: Map;
  public zoom!: number;
  @Input() country!: Country;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);

    this.showRelation(this.country.map_relation_id);
  }

  showRelation(relationId: number) {
    const query = `[out:json];
    relation(${relationId});
    out body;
    >;
    out skel qt;`;

    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error: ${response.status}`);
        }
      })
      .then(data => {
          const geojson = osmtogeojson(data);
          geoJSON(geojson).addTo(this.map);
          const bounds = geoJSON(geojson).getBounds();
          this.map.fitBounds(bounds);
      })
      .catch(error => console.error('Error fetching data from Overpass API:', error));

  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
