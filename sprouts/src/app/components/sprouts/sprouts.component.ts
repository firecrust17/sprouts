import { Component, OnInit } from '@angular/core';
import { VisComponent } from '../vis/vis.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprouts',
  templateUrl: './sprouts.component.html',
  styleUrls: ['./sprouts.component.css']
})
export class SproutsComponent implements OnInit {
	
	initial_nodes = 2;
	players = 2;

  constructor(private act_route: ActivatedRoute) {
  	this.act_route.params.subscribe(params => {
  		this.initial_nodes = parseInt(params.nodes);
  		this.players = parseInt(params.players);
  	});
  }

  ngOnInit() {
  }

}
