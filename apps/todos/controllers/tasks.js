// ==========================================================================
// Project:   Todos.tasksController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Todos.tasksController = SC.ArrayController.create(
	SC.CollectionViewDelegate, 
/** @scope Todos.tasksController.prototype */ {
	

  // TODO: Add your own code here.]
 collectionViewDeleteContent: function(view, content, indexes) {

    // destroy the records
    var records = indexes.map(function(idx) {
	  console.log("this " + this);
      return this.objectAt(idx);
    }, this);
	
	//console.log("records " + records);
	//console.log("Todo Store " + Todos.store);
    records.invoke('destroy');

    var selIndex = indexes.get('min')-1;
    if (selIndex<0) selIndex = 0;
    this.selectObject(this.objectAt(selIndex));
  },

  summary: function() {
    var len = this.get('length'), ret ;
	
    if (len && len > 0) {
      ret = len === 1 ? "1 task" : "%@ tasks".fmt(len);
    } else ret = "No tasks";

    return ret;
  }.property('length').cacheable(),

  addTask:function(){
	// create a new task
	console.log("Todo task " + Todos.Task);
	task = Todos.store.createRecord(Todos.Task, {
		"description " : "new Task", 
		"isDone" : false
	});
	
	// select new task in UI
	this.selectObject(task);
	
	this.invokeLater(function(){
	  var contentIndex = this.indexOf(task);
	  var list = Todos.mainPage.getPath("mainPane.middleView.contentView");
	  var listItem = list.itemViewForContentIndex(contentIndex);
	});
	
	return YES;
  },

  toggleDone: function(){
	var sel = this.get('selection');
	console.log(sel);
	sel.setEach('isDone', !sel.everyProperty('isDone'));
	return YES;
}



}) ;
