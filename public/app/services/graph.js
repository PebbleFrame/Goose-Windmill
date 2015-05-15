angular.module('hack.graphService', [])

.factory('Graph', function($http) {
  var storyData;
  var g = {};
  g.nodes = [];
  g.edges = [];
  var x = 0;
  var levels = {};
  var s;
  var maxNodeSize = 1;

  var makeGraph = function (storyId) {
    var data = {
      storyId: storyId
    };

    $http({
      method: 'GET',
      url: '/api/graph/fetch',
      params: data
    }).success(function (data) {
      if (s) {
        clearGraph();
      }
      storyData = data;
      buildTree(storyData, 0, 0);
      drawGraph(storyId);
      s.graph.nodes(storyData.id).size = maxNodeSize+1;
      s.refresh();
    });
  };

  var clearGraph = function () {
    g.nodes = [];
    g.edges = [];
    x = 0;
    levels = {};
    s.kill();
  };

  var rgb2Html = function (red, green, blue)
  {
      var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
      return '#'+decColor.toString(16).substr(1);
  }

  var buildTree = function (treeNode, level, y, parentAngle) {
    var curNode = {};
    var curEdge = {};
    // don't bother with deleted nodes
    if (!treeNode.text && treeNode.type !== 'story') {
      return;
    }
    curNode.id = treeNode.id;
    if (level === 0) {
      curNode.size = 5;
    } else {
      curNode.size = treeNode.text.length/100 + 2;
      if (curNode.size > maxNodeSize) {
        maxNodeSize = curNode.size;
      }
    }
    curNode.label = treeNode.author + ": " + countChildren(treeNode) + ' replies';
    curNode.color = rgb2Html(255-level*50, 50+level*25, level*50);
    var radius = level; // + (6*Math.random() - 3);
    var angle;
    if (level === 0) {
      curNode.x = 0;
      curNode.y = 0;
    } else if (level === 1) {
      angle = 360*Math.random();
      curNode.x = radius * Math.cos(Math.PI/180 * angle);
      curNode.y = radius * Math.sin(Math.PI/180 * angle);
    } else {
      // angle stays within a certain range of parentangle
      angle = parentAngle + (y+1)*10; // + (60 * Math.random() - 30);
      curNode.x = radius * Math.cos(Math.PI/180 * angle);
      curNode.y = radius * Math.sin(Math.PI/180 * angle);
    }

    g.nodes.push(curNode);
    if (treeNode.parent_id) {
      curEdge.id = treeNode.parent_id + "-" + treeNode.id;
      curEdge.source = treeNode.parent_id;
      curEdge.target = treeNode.id;
      curEdge.type = 'curve';
      g.edges.push(curEdge);
    }
    for (var i = 0; i < treeNode.children.length; i++) {
      buildTree(treeNode.children[i], level+1, i, angle);
    }
  };

  var countChildren = function (treeNode) {
    var count = 0;
    count += treeNode.children.length;
    for (var i = 0; i < treeNode.children.length; i++) {
      count += countChildren(treeNode.children[i]);
    }
    return count;
  };

  var drawGraph = function (storyId) {
    s = new sigma({
      graph: g,
      container: 'sigma-container-' + storyId
    });

    s.refresh();
  };

  return ({
    makeGraph: makeGraph
  });
});