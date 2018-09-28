import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import{Http} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
 
import { ChartsModule } from 'ng2-charts';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  max:any[ ];
  response:any[ ];
  
  chart=[ ];
 
  Forecast(): any {
    return this._http.get("https://api.weatherbit.io/v2.0/forecast/daily?city=Ciudad%20Obreg%C3%B3n&country=MX&days=15&units=M&key=cfd64f34fbc041e3b49be8ba89df7b53")
    .pipe(.map(result=>result))
  }


  Charge() {
  
    this.Forecast()
        .subscribe((res)=> {
          let response=res['data'] ;
          this.max=response  
          this.response=response
         //console.log(this.response);
         let max_temp=res['data'].map(res=>res.max_temp)
         let min_temp=res['data'].map(res=>res.min_temp)
         let alldates=res['data'].map(res=>res.valid_date)
         // console.log(alldates)
         
     this.chart=new Chart('canvas',{
     type:'line',
     data:{
       labels:alldates,
         datasets:[{
           data:max_temp,
           borderColor:'#00ff00',
           fill:false
         },
             {
               data:min_temp,
               borderColor:'#000fff',
               fill:false
             },
              ]
        },
               options:{
                 elements: {
                   line: {
                       tension: 0
                       }
                 },
                 legend:{
                   display:false
                },
                 scales:{
                   xAxes:[{
                     display:true
                   }],
                   yAxes:[{
                     display:true
                   }] }
                 } 
       })
        }) 
  
     
  }



  constructor(private _http: HttpClient) { }
 

}