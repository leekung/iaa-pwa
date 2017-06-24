import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css'],
  providers: [ CacheService ]
})
export class RankComponent implements OnInit {
  public groupATable: string = ""
  public groupBTable: string = ""

  constructor(private http: Http, private _cacheService: CacheService) {
    this._cacheService.setGlobalPrefix("1234567890");

    this.getData()
  }

  ngOnInit() {
  }

  getData() {
    this.groupATable = this._cacheService.get('groupATable');
    if (! this.groupATable) {
      this.http.get(`https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20htmlstring%20WHERE%20url%3D'http%3A%2F%2Fwww.fifa.com%2Fconfederationscup%2Fgroups%2Findex.html'%20AND%20xpath%3D'//*[@id="standings"]/div/div[1]'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .toPromise()
      .then((data) => {
        this.groupATable = this.processHtml(data.json().query.results.result)
        this._cacheService.set('groupATable', [this.groupATable], {maxAge: 5 * 60});

      })
      .catch((err) => {
        
      });
    }
    
    this.groupBTable = this._cacheService.get('groupBTable');
    if (! this.groupBTable) {
      this.http.get(`https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20htmlstring%20WHERE%20url%3D'http%3A%2F%2Fwww.fifa.com%2Fconfederationscup%2Fgroups%2Findex.html'%20AND%20xpath%3D'//*[@id="standings"]/div/div[2]'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
        .toPromise()
        .then((data) => {
          this.groupBTable = this.processHtml(data.json().query.results.result)
          this._cacheService.set('groupBTable', [this.groupBTable], {maxAge: 5 * 60});

        })
        .catch((err) => {
          
        });

    }
  }

  processHtml(html): string {
    html = html.replace(/src=\"data:image\/gif;.+?"/g, '')
        .replace(/title=\"Mexico\"/g, 'src="/assets/flags/mex.png"')
        .replace(/>MEX</, '>เม็กซิโก<')
        .replace(/title=\"Portugal\"/g, 'src="/assets/flags/por.png"')
        .replace(/>POR</, '>โปรตุเกส<')
        .replace(/title=\"Russia\"/g, 'src="/assets/flags/rus.png"')
        .replace(/>RUS</, '>รัสเซีย<')
        .replace(/title=\"New Zealand\"/g, 'src="/assets/flags/nzl.png"')
        .replace(/>NZL</, '>นิวซีแลนด์<')
        .replace(/title=\"Chile\"/g, 'src="/assets/flags/chi.png"')
        .replace(/>CHI</, '>ชิลี<')
        .replace(/title=\"Germany\"/g, 'src="/assets/flags/ger.png"')
        .replace(/>GER</, '>เยอรมนี<')
        .replace(/title=\"Australia\"/g, 'src="/assets/flags/aus.png"')
        .replace(/>AUS</, '>ออสเตรเลีย<')
        .replace(/title=\"Cameroon\"/g, 'src="/assets/flags/cmr.png"')
        .replace(/>CMR</, '>แคเมอรูน<')

    return html
  }
}
