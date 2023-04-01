import { Component, OnInit } from '@angular/core';
import { GroenteDetailsComponent } from 'src/app/groente-details/groente-details/groente-details.component';
import { Groente } from 'src/app/model/groente';
import { Winkel } from 'src/app/model/winkel';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GroenteService } from 'src/app/groente.service';
import { CurrencyService } from 'src/app/currency.service';
import { WinkelService } from 'src/app/winkel.service';
import { aantalPositief } from 'src/app/custom-validators/aantal-positief';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-winkelmandje',
  templateUrl: './winkelmandje.component.html',
  styleUrls: ['./winkelmandje.component.css']
})

export class WinkelmandjeComponent implements OnInit{
  winkellijst!: Winkel[];
  groentenlijst!: Groente[];
  totaalBestellijn!: number;
  totaal: number = 0;
  nieuweGroente!: Groente | undefined;
  nieuweWinkel!: Winkel | undefined;
  huidigeCurrency!: string;
  errorMessage: string ="";
  winkelmandje: GroenteDetailsComponent[] = [];

  myForm!: FormGroup;

  // nieuwAantal: number = 0;
  // nieuweGroenteId!: number;
  // nieuweWinkelId!: number;

  constructor(private groenteService: GroenteService, private winkelsService: WinkelService, 
    private currencyService: CurrencyService, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.groenteService.getGroenten().subscribe(groenten => this.groentenlijst=groenten);
    this.winkelsService.getWinkels().subscribe(winkels => this.winkellijst=winkels);
    this.currencyService.getCurrency().subscribe(currency => {
      this.huidigeCurrency = currency;
      this.berekenTotaal();
    });

    this.myForm = this._fb.group({
      aantal: ['', [Validators.required, aantalPositief]],
      groente: ['', [Validators.required]],
      winkel:  ['', [Validators.required]],
    });
  }

  onSubmit(){


    let winkelId!: string;
    let groenteId!: string;
    let aantal!: string;
    this.errorMessage="";
    
    winkelId= this.myForm.value.winkel;

    groenteId= this.myForm.value.groente;
    aantal= this.myForm.value.aantal;

    this.groenteService.getGroenteById(groenteId).subscribe(groente => this.nieuweGroente = groente);

    this.winkelsService.getWinkelById(winkelId).subscribe(winkel => this.nieuweWinkel = winkel)
    if(this.nieuweGroente != undefined && this.nieuweWinkel != undefined) {
      if(this.nieuweGroente.eenheid != "kg") {
          const parsed=parseInt(aantal, 10);
          if(parsed.toString() != aantal){
            this.errorMessage="Decimaal enkel bij kg aub";
          }
      }
      if(this.errorMessage === ""){
        this.bestellijnToevoegen(this.nieuweWinkel, this.nieuweGroente, parseFloat(aantal));
      }
    }
  }
  

  berekenTotaal() {
    this.totaal = 0;
    this.winkelmandje.forEach(item => {
      this.totaal += this.currencyService.berekenTotaal(item.bestelaantal, item.groente.prijs);
    })
  }

  wisselCurrency(){
    this.currencyService.wisselCurrency();
  }
  
  bestellijnToevoegen(winkel: Winkel, groente: Groente, aantal: number){
    let gevonden = false;
    this.winkelmandje.forEach(lijn => {
      if(lijn.winkel.id === winkel.id && lijn.groente.id === groente.id) {
        lijn.bestelaantal += aantal;
        gevonden = true;
      } 
    });
    if (!gevonden) {
      const nieuw = new GroenteDetailsComponent(this.currencyService);
      nieuw.winkel = winkel;
      nieuw.groente = groente;
      nieuw.bestelaantal = aantal;
      this.winkelmandje.push(nieuw);
    }

    this.berekenTotaal();
  };
}
