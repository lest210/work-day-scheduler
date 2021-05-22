//set variables

var currentDay = $("#currenDay");
var times = $(".time");
var schedule = $(".container")

var toDo = [];

var currentDate = moment().format("dddd, MMMM Do");
var currentHr= moment().format("H");

function startSchedule(){
//console.log(toDo);

    times.each(function(){
        var block = $(this);
        var blockHr = parseInt(block.attr("data-hour"));

        var toDoEl = {
            hour: blockHr,
            text:"",
        }

        toDo.push(toDoEl);
    });

    localStorage.setItem("todos", JSON.stringify(toDo));
};

//set colors for timeblocks

function setUpTimeBlocks(){

    times.each(function(){
        var block = $(this);
        var blockHr = parseInt(block.attr("data-hour"));

        if(blockHr == currentHr) {
            block.addClass("present").removeClass("past-future");
        }

        if (blockHr < currentHr){
            block.addClass("past").removeClass("present-feature");
        }
        if (blockHr > currentHr) {
            block.addClass("future").removeClass("past-present");
        }
    });
}

function renderSchedule() {
    toDo = localStorage.getItem("todos");
    toDo = JSON.parse(toDo);

    for ( var i = 0; i < toDo.length; i++){
        var itemHr = toDo[i].hour;
        var itemTxt = toDo[i].text;

        $("[data-hour=" + itemHr + "]").children("textarea").val(itemTxt);
    }
    console.log(toDo);
}

function saveHandler(){
    var block = $(this).parent();

    var updateHr = $(this).parent().attr("data-hour");
    var addItem = (($(this).parent()).children("textarea")).val();

    for (var p= 0; p < toDo.length; p++){
        if (toDo[p].hour == updateHr){
            toDo[p].text = addItem;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDo));
    renderSchedule();
}

$(document).ready(function(){
    setUpTimeBlocks();

    if(!localStorage.getItem("todos")){
        startSchedule();
    }

    currentDay.text(currentDate);

    renderSchedule();

    schedule.on("click", "button", saveHandler);
})




