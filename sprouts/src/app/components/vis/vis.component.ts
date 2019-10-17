import { Component, OnInit, Input } from '@angular/core';
import * as vis from 'vis';

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css']
})
export class VisComponent implements OnInit {

	@Input() initial_nodes? = 2;
	@Input() players? = 2;

	nodes: any;
	options = {};
	network: any;


  edges = new vis.DataSet([
  ]);


  constructor() { }

  ngOnInit() {

  	var note_data = [];
  	for(var i=0; i<this.initial_nodes; i++){
  		note_data.push({"label": ""});
  	}
  	this.nodes = new vis.DataSet(note_data);

	  var container = document.getElementById('mynetwork');
	  var data = {
	    nodes: this.nodes,
	    edges: this.edges
	  };
	  this.vis_options();

	  this.network = new vis.Network(container, data, this.options);
	  this.network.addEdgeMode();
  }

  vis_options() {
  	const self = this;
  	this.options = {
  		physics: {
  			enabled: false
  		},
		  manipulation: {
		    enabled: true,
		    initiallyActive: true,
		    addEdge: function(edgeData, callback) {
		    	if (self.check_valid_move(edgeData)){
		    		self.add_edge_plus_node(edgeData);
		    	}
					// const data = self.restrict_edges(edgeData);
					// if (data != '') {
					// 	self.add_new_edge(data);
					// } else {
					// 	// self.snotifyService.error('Cannot add', self.utilityService.getConfig());
					// }
		    	self.network.addEdgeMode();
		    },
		  }
	  };
    // this.options['manipulation'] = {
    //   enabled: true,
    //   initiallyActive: true,
    //   addNode: function (nodeData, callback) {
    //     self.add_new_node(nodeData);
    //   },
    //   addEdge: function (edgeData, callback) {
    //     const data = self.restrict_edges(edgeData);
    //     if (data != '') {
    //       self.add_new_edge(data);
    //     } else {
    //       // self.snotifyService.error('Cannot add', self.utilityService.getConfig());
    //     }
    //   },

    //   editEdge: true,
    //   deleteNode: function (nodeData, callback) {
    //     self.delete_node(nodeData);
    //     callback(null);
    //   },
    //   deleteEdge: function (edgeData, callback) {
    //     // self.delete_edge(edgeData);
    //     self.selected_edge_for_deletion = edgeData;
    //     $('.edge-delete-confirmation').show();
    //     callback(null);
    //   }
    // };
  }

  check_valid_move(edgeData) {
  	// console.log(edgeData);
  	if(this.network.getConnectedEdges(edgeData['from']).length < 3 && 
  		this.network.getConnectedEdges(edgeData['to']).length < 3 && 
  		edgeData['from'] != edgeData['to']){
  		return true;
  	} else {
  		return false;
  	}
  }

  add_edge_plus_node(edgeData) {
  	// console.log(edgeData);debugger
  	var node_id = this.nodes.update({"label": ""});
  	this.edges.update({"from": edgeData['from'], "to": node_id[0]});
  	this.edges.update({"from": node_id[0], "to": edgeData['to']});
  }

}
