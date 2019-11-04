import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as vis from 'vis';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css']
})
export class VisComponent implements OnInit {

	@Input() initial_nodes? = 2;
	@Input() players? = 2;

	edge_length = 200;
	nodes: any;
	options = {};
	network: any;
  player1 = true;

	@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
	    console.log(event);
	}


  edges = new vis.DataSet([
  ]);


  constructor(private toastr: ToastrService) { }

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
	  // this.network.addEdgeMode();
  }

  vis_options() {
  	const self = this;
  	this.options = {
  		physics: {
  			enabled: false
  		},
  		edges: {
  			smooth: {
  				enabled: false
  			}
  		},
      locale: 'en',
      locales: {
        en: {
          back: 'Cancel',
          addNode: ' ',
          addEdge: 'Add Edge',
          edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
        }
      },
		  manipulation: {
		    enabled: true,
		    initiallyActive: true,
        addNode: false,
        deleteNode: false,
        deleteEdge: false,
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
		    	// self.network.addEdgeMode();
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
      this.toastr.warning('Invalid Move!');
  		return false;
  	}
  }

  add_edge_plus_node(edgeData) {
  	var pos_array_map = this.network.getPositions([edgeData['from'], edgeData['to']]);
    var x = (pos_array_map[edgeData['from']].x + pos_array_map[edgeData['to']].x) / 2;
    var y = (pos_array_map[edgeData['from']].y + pos_array_map[edgeData['to']].y) / 2;
  	var node_id = this.nodes.update({"label": "", "x": x, "y": y});
    
    var color = "green";
    if(this.player1){
      color = "red";
    }

  	this.edges.update({"from": edgeData['from'], "to": node_id[0], "color": {"color": color, "highlight": color}, "width": 3});
  	this.edges.update({"from": node_id[0], "to": edgeData['to'], "color": {"color": color, "highlight": color}, "width": 3});
  	this.edge_length = this.edge_length * 0.7;

    this.player1 = !this.player1;
    this.check_if_game_over();
  }

  check_if_game_over() {
    console.log(this.edges);
    var count = 0;
    var node_list = this.nodes.getIds();
    for(var i=0; i<node_list.length; i++){
      if(this.network.getConnectedEdges(node_list[i]).length < 3) {
        count++;
      }
    }
    if(count > 1) {
      return false;
    } else {
      var player = 1;
      if(this.player1){
        player = 2
      }
      this.toastr.success('Game Over! Player '+player+' Wins');
      return true;
    }
  }

}
