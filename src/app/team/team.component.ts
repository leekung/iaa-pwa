import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public tournaments = {"tournament":{"id":"460","name":"คอนเฟดเดอร์เรชั่น คัพ 2017"},"groups":[{"name":"A","teams":[{"id":"4781","flag":"mex.png","name":"เม็กซิโก"},{"id":"4694","flag":"rus.png","name":"รัสเซีย"},{"id":"4704","flag":"por.png","name":"โปรตุเกส"},{"id":"4784","flag":"nzl.png","name":"นิวซีแลนด์"}]},{"name":"B","teams":[{"id":"4751","flag":"rus.png","name":"แคเมอรูน"},{"id":"4711","flag":"ger.png","name":"เยอรมนี"},{"id":"4741","flag":"aus.png","name":"ออสเตรเลีย"},{"id":"4754","flag":"chi.png","name":"ชิลี"}]}]}


  constructor() {

   }

  ngOnInit() {
  }

}
