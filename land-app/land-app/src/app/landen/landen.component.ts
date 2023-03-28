import { Component, OnInit } from '@angular/core'; 
import { LandService } from '../land.service'; 
import { Land } from '../model/land'; 

@Component({
 selector: 'app-landen', 
 templateUrl: 'landen.component.html', 
 styleUrls:['landen.component.css'] 
})
export class LandenComponent { 

 landen!: Land[];
 totalVotes!: number;
 selectedLand!: Land;
 nieuwLand!: Land;

 constructor(private landService: LandService) {}

 ngOnInit(): void { 
 this.landService.getLanden().subscribe(landen => this.landen = landen);
 } 

 onSelect(land: Land): void { 
  this.selectedLand = land;
 } 

 onValueChange(event: number) { 
  this.totalVotes = event;
 } 

 add(): void{
    if(!this.nieuwLand.name.trim() || isNaN(this.nieuwLand.inwoners)){
        return;
    }
    this.landService.addLand({name: this.nieuwLand.name, inwoners: this.nieuwLand.inwoners}as Land)
        .subscribe(land =>{
            this.landen.push(land);
            this.nieuwLand = {} as Land;
        });
 }
 
} 

