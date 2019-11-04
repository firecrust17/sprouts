import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

	nodes = 2;
	players = 2;

  constructor() { }

  ngOnInit() {
  }

}
