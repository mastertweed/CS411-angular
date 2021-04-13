import { Component, OnInit } from '@angular/core';
import { City } from "../../../Shared/Models/city.model";


@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  cities: City[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
