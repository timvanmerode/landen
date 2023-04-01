import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency = new BehaviorSubject<string>("EUR");

  getCurrency(): Observable<string> {
    return this.currency.asObservable();
  }
  
  omzettenNaarDollar(prijs: number){
    return prijs*1.09;
  }

  berekenTotaal(aantal: number, prijs: number) {
    console.log(this.currency);
    let totaal = aantal * prijs;
    if(this.currency.getValue() === "USD") {
      totaal= this.omzettenNaarDollar(totaal);

    }   
    console.log('rounding total');
    return Math.round(totaal* 100) / 100;
  }

  wisselCurrency(){
    if(this.currency.getValue() === "EUR"){
      this.currency.next("USD");
    }
    else
    {
      this.currency.next("EUR");
    }
  }
  
}
