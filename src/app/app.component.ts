import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { Http,Response } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WeatherService]
})
export class AppComponent {

  
  chart=[ ];
  title = 'dashboardWeather';
     cities=[];
     units=[];
     unitsstatus:string="";
     max:any[ ];
     response:any[ ];
  constructor(private http:HttpClient,private _weather:WeatherService ){

this.cities=this.getCity()
this.units=this.getUnit()
this._weather.Charge();

this._weather.Forecast()
.subscribe(res=>{
let max_temp=res['data'] 

console.log(this.max)
})

}
  
  Filter(cityname : string, units3 : string): void {
this.cityname=cityname;
this.units3 = units3;


this.unitsstatus='https://api.weatherbit.io/v2.0/forecast/daily?country=MX&days=15&key=cfd64f34fbc041e3b49be8ba89df7b53&city=' + this.cityname + '&units=' + this.units3;
this.http.get(this.unitsstatus)
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


getCity() {
  
  return [  {"city" : "Ciudad Obregón"},{"city" : "Navojoa"},{"city" : "Hermosillo"},{"city" : "Nogales"} ]

   
}

getUnit() {

  return [ {"unit" : "M"},{"unit" : "I"} ]

}


public selectlabel:any;
  
  public highlightRow(dat) {
    this.selectlabel = dat.labels;
  }

 

}

