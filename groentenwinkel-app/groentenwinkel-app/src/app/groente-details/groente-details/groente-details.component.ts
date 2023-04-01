import { Component, Input } from '@angular/core';
import { Groente } from 'src/app/model/groente';
import { Winkel } from 'src/app/model/winkel';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-groente-details',
  templateUrl: './groente-details.component.html',
  styleUrls: ['./groente-details.component.css']
})

export class GroenteDetailsComponent {
  @Input() winkel!: Winkel;
  @Input() groente!: Groente;
  @Input() bestelaantal!: number;
  totaallijn: number = 0;
  huidigeCurrency!: string;

  constructor( private currencyService: CurrencyService ) {}

  ngOnInit(){
    this.currencyService.getCurrency().subscribe(currency => {
      this.huidigeCurrency = currency;
      this.totaallijn = this.currencyService.berekenTotaal(this.bestelaantal, this.groente.prijs);
    });
    //this.huidigeCurrency= this.currencyService.getCurrency();
  }
}
