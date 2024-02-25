

$(function() {

  $( "#draggable" ).draggable();

  $(".track").draggable({
    containment:"document",
    appendTo:document.body,
    connectToSortable:"#playlist tbody",
    revert: true,
    revertDuration: 0,
    cursor: "move", 
    helper: "clone",
    cursorAt: { top: 17, left: 80 },
    start: function(event, ui) {
    },
    drag: function(event, ui) {
  
    }
  });

  $("#playlist tbody").droppable({
    //activeClass: "ui-hover",
    hoverClass: "ui-active",
    accept:".track",
    drop: function( event, ui ) {
      //$(this).append("<li>"+contents+"</li>");
      //$(this).find(".nothing").delete();
  if($("#playlist tbody .nothing")) $("#playlist tbody .nothing").remove();//.style.display="none";
    }
  }).sortable({
    appendTo: document.body,
    cursor: "move", 
    helper: "clone",
    cursorAt: { top: 17, left: 80 },
    //activeClass: "ui-hover",
    //hoverClass: "ui-active"
  });
});