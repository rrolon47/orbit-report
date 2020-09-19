import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  satellitesUrl: string;
  constructor() {
      this.sourceList = [];
      let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
      this.displayList = []
      window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
            //console.log(data);//data is an object containing a property named satellites. satellites has a property value of an array of objects
            let fetchedSatellites = data.satellites;
            let i = 0
            while(fetchedSatellites.length >= this.sourceList.length){
               let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
               this.sourceList.push(satellite);
               i += 1; 
            }
            //First attempt: Not sure how .forEach works 
            // function makeObjectInSourcelist(item) {
            //    let satellite = new Satellite(item.name, item.type, item.launchDate, item.orbitType, item.operational);
            //    this.sourceList.push(satellite);
            // };
            // fetchedSatellites.forEach(makeObjectInSourcelist);
            
            this.displayList = this.sourceList.slice(0);
         }.bind(this));
      }.bind(this));
   };

   search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLowerCase();
      for(let i=0; i < this.sourceList.length; i++) {
         let name = this.sourceList[i].name.toLowerCase();
         if (name.indexOf(searchTerm) >= 0) {
            matchingSatellites.push(this.sourceList[i]);
         }
      }
      // assign this.displayList to be the array of matching satellites
      // this will cause Angular to re-make the table, but now only containing matches
      this.displayList = matchingSatellites;
   }


};
