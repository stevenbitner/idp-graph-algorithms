/**
 * @author Adrian Haarbach
 * This file contains just our basic graph represantation, together with methods to parse and sequentialize the graph.
 * @requires d3.map
 */

/**
 * Represents a graph
 * @constructor
 */
var Graph = function(){
  this.nodeIds=0;
  this.edgeIds=0;
  this.nodes=d3.map();
  this.edges=d3.map();
}

/**
 * Represents a graph node
 * @constructor
 */
Graph.Node = function(x,y,id){
  this.x=x;
  this.y=y;
  this.id=id;

  this.outEdges = d3.map();
  this.inEdges = d3.map();

  this.resources = [];
}

/**
 * Represents a graph edge
 * @constructor
 */
Graph.Edge = function(s,t,id){
  this.start=s;
  this.end=t;
  this.id=id;

  this.resources=[];
}

/////////////////
//MEMBERS

/**
 * add a node to the graph
 * @param {Number|String} x coordinate
 * @param {Number|String} y coordinate
 */
Graph.prototype.addNode = function(x,y,resources){
  var node = new Graph.Node(+x,+y,this.nodeIds++);
  node.resources=resources || [];
  for(var i = 0, toAdd = this.getNodeResourcesSize() - node.resources.length; i<toAdd; i++){
    node.resources.push(0);
  }
  this.nodes.set(node.id,node);
  return node;
}

Graph.prototype.addNodeDirectly = function(node){
  node.id = this.nodeIds++;
  for(var i = 0, toAdd = this.getNodeResourcesSize() - node.resources.length; i<toAdd; i++){
    node.resources.push(0);
  }
  this.nodes.set(node.id,node);
  return node;
}

/**
 * add an edge to the graph
 * @param {Number|String} id of start node
 * @param {Number|String} id of end node
 */
Graph.prototype.addEdge = function(startId,endId,resources){
  var s = this.nodes.get(startId);
  var t = this.nodes.get(endId);
  var edge = new Graph.Edge(s,t,this.edgeIds++);
  edge.resources=resources;
  edge.start.outEdges.set(edge.id,edge);
  edge.end.inEdges.set(edge.id,edge);
  this.edges.set(edge.id,edge);
  return edge;
}

Graph.prototype.addEdgeDirectly = function(edge){
  edge.id = this.edgeIds++;
  edge.start.outEdges.set(edge.id,edge);
  edge.end.inEdges.set(edge.id,edge);
  this.edges.set(edge.id,edge);
  var max = this.getEdgeResourcesSize();
  while(edge.resources.length<max) edge.resources.push(0);
  return edge;
}

Graph.prototype.removeNode = function(id){
  var that=this;
  var node = this.nodes.get(id);
  node.outEdges.forEach(function(key,value){
      that.removeEdge(key);
  });
  node.inEdges.forEach(function(key,value){
      that.removeEdge(key);
  });
  this.nodes.remove(id);
  return node;
}

Graph.prototype.removeEdge = function(id){
    return this.edges.remove(id);
}

Graph.prototype.getNodes = function(){
//   return this.__nodesArr || (this.__nodesArr = this.nodes.values());  //TODO just for testing update pattern
  return this.nodes.values();
}

Graph.prototype.getEdges = function(){
//   return this.__edgesArr || (this.__edgesArr = this.edges.values());
  return this.edges.values();
}

Graph.prototype.toString = function(){
  var lines = []; //text.split("\n");

  lines.push("% Graph saved at "+new Date());

  this.nodes.forEach(function(key,node){
//       lines.push("% node id "+node.id);
      lines.push("n " + node.x + " " + node.y + " " + node.resources.join(" "));
  });
  this.edges.forEach(function(key,edge){
//       lines.push("% edge id "+edge.id);
      lines.push("e " + edge.start.id + " " + edge.end.id + " " + edge.resources.join(" "));
  });

  return lines.join("\n");
}

Graph.prototype.getNodeResourcesSize = function(){
  var max=0;
  this.nodes.forEach(function(key,node){
     max = Math.max(max,node.resources.length);
  });
  return max;
}

Graph.prototype.getEdgeResourcesSize = function(){
  var max=0;
  this.edges.forEach(function(key,edge){
     max = Math.max(max,edge.resources.length);
  });
  return max;
}


/////////////////
//STATICS

/**
 * Graph Parser factory method
 * @static
 * @method
 * @param {String} text - sequentialized Graph
 * @return {Graph} - parsed Graph object
 */
Graph.parse = function(text){
  var lines = text.split("\n");

  var graph = new Graph();

  function parseResources(s){
      var resources = [];
      for(var i=3; i<s.length; i++){
          resources.push(+s[i]);
      }
      return resources;
  }

  // Nach Zeilen aufteilen
  for (var line in lines) {
      var s = lines[line].split(" ");
      // Nach Parametern aufteilen
      if (s[0] == "%") { //comment
          continue;
      }
      //x y r1 r2 ...
      if (s[0] == "n") {
        graph.addNode(s[1],s[2],parseResources(s));
      }
      //s t r1 r2 ... 
      if (s[0] == "e") {
        graph.addEdge(s[1],s[2],parseResources(s));
      };
  }

  return graph;
}