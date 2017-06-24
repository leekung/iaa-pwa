import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ CacheService ]
})
export class ScheduleComponent implements OnInit {
  public scheduleTable: any
  public htmlArray: string[]


  constructor(private http: Http, private _cacheService: CacheService) {
    this._cacheService.setGlobalPrefix("1234567890");

    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.scheduleTable = this._cacheService.get('scheduleTables');
    if (! this.scheduleTable) {
      this.http.get(`https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20htmlstring%20WHERE%20url%3D'http%3A%2F%2Fwww.fifa.com%2Fconfederationscup%2Fmatches%2Findex.html'%20AND%20xpath%3D'%2F%2F*%5B%40id%3D%2220170617%22%5D%7C%2F%2F*%5B%40id%3D%2220170618%22%5D%7C%2F%2F*%5B%40id%3D%2220170619%22%5D%7C%2F%2F*%5B%40id%3D%2220170621%22%5D%7C%2F%2F*%5B%40id%3D%2220170622%22%5D%7C%2F%2F*%5B%40id%3D%2220170624%22%5D%7C%2F%2F*%5B%40id%3D%2220170625%22%5D%7C%2F%2F*%5B%40id%3D%2220170628%22%5D%7C%2F%2F*%5B%40id%3D%2220170629%22%5D%7C%2F%2F*%5B%40id%3D%22274643%22%5D%2Fdiv%7C%2F%2F*%5B%40id%3D%22274645%22%5D%2Fdiv'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .toPromise()
      .then((data) => {
        this.scheduleTable = this.processHtml(data.json().query.results.result)
        this._cacheService.set('scheduleTables', [this.scheduleTable], {maxAge: 5 * 60});
        this.htmlArray = this.scheduleTable.split('<div class="match-list-date').splice(1);
        for (let i=0; i<this.htmlArray.length; i++) {
          this.htmlArray[i] = '<div class="match-list-date' + this.htmlArray[i];
        }
        this.htmlArray[this.htmlArray.length - 3] = '<h2 class="title">รอบรองชนะเลิศ</h2>' + this.htmlArray[this.htmlArray.length - 3];
        this.htmlArray[this.htmlArray.length - 2] = '<h2 class="title">รอบชิงอันดับ 3</h2>' + this.htmlArray[this.htmlArray.length - 2];
        this.htmlArray[this.htmlArray.length - 1] = '<h2 class="title">รอบชิงชนะเลิศ</h2>' + this.htmlArray[this.htmlArray.length - 1];

      })
      .catch((err) => {
        
      });
    } else {
      this.scheduleTable[0] = this.processHtml(this.scheduleTable[0])
      console.log(this.scheduleTable);
      this.htmlArray = this.scheduleTable[0].split('<div class="match-list-date').splice(1);
      for (let i=0; i<this.htmlArray.length; i++) {
        this.htmlArray[i] = '<div class="match-list-date' + this.htmlArray[i];
      }
      this.htmlArray[this.htmlArray.length - 3] = '<h2 class="title">รอบรองชนะเลิศ</h2>' + this.htmlArray[this.htmlArray.length - 3];
      this.htmlArray[this.htmlArray.length - 2] = '<h2 class="title">รอบชิงอันดับ 3</h2>' + this.htmlArray[this.htmlArray.length - 2];
      this.htmlArray[this.htmlArray.length - 1] = '<h2 class="title">รอบชิงชนะเลิศ</h2>' + this.htmlArray[this.htmlArray.length - 1];
    }
  }

  processHtml(html) {
    html = html
        .replace(/\/\/img.fifa.com\/imgml\/layout\/backgrounds\/void.gif/g, '/assets/flags/b.png')
        .replace(/ src="\/\//g, ' a-src="//')
        .replace(/title=\"Mexico\"/g, 'src="/assets/flags/mex.png"')
        .replace(/>MEX</g, '>เม็กซิโก<')
        .replace(/title=\"Portugal\"/g, 'src="/assets/flags/por.png"')
        .replace(/>POR</g, '>โปรตุเกส<')
        .replace(/title=\"Russia\"/g, 'src="/assets/flags/rus.png"')
        .replace(/>RUS</g, '>รัสเซีย<')
        .replace(/title=\"New Zealand\"/g, 'src="/assets/flags/nzl.png"')
        .replace(/>NZL</g, '>นิวซีแลนด์<')
        .replace(/title=\"Chile\"/g, 'src="/assets/flags/chi.png"')
        .replace(/>CHI</g, '>ชิลี<')
        .replace(/title=\"Germany\"/g, 'src="/assets/flags/ger.png"')
        .replace(/>GER</g, '>เยอรมนี<')
        .replace(/title=\"Australia\"/g, 'src="/assets/flags/aus.png"')
        .replace(/>AUS</g, '>ออสเตรเลีย<')
        .replace(/title=\"Cameroon\"/g, 'src="/assets/flags/cmr.png"')
        .replace(/>CMR</g, '>แคเมอรูน<')
        .replace(/ href="\/confederationscup\/[^"]+?"/g, '>แคเมอรูน<')
        .replace(/>15:00/g, '>19:00')
        .replace(/>18:00/g, '>22:00')
        .replace(/>21:00/g, '>01:00+1d')

    return html
  }
  
}
