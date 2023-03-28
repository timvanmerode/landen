import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { LandService } from '../land.service'; 
import { Land } from '../model/land'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-land-details', 
  templateUrl: './land-details.component.html', 
  styleUrls: ['./land-details.component.css'] 
 })
 export class LandDetailsComponent implements OnInit { 

  land!: Land
  constructor(private landService: LandService, private route: ActivatedRoute, private location: Location) { } 
 

  ngOnInit(): void { 
    this.getLandId();
  } 

  getLandId() { 
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.landService.getLandId(id).subscribe(land => this.land = land!);
  } 

  goBack(): void { 
    this.location.back();
    } 

  save(){
    this.landService.updateLand(this.land).subscribe(() => this.goBack());
  }
 } 
 
