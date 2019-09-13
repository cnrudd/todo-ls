var todoList = {};  // the object that will hold todos in the script
var lsKey = 'todoList';  // the name of the localStorage key

//  On Click event associated with the add-to-do function
$("#add-to-do").on("click", function (event) {
    // prevent form from submitting
    event.preventDefault();

    // Get the to-do "value" from the textbox and store it a variable
    var todo = $("#to-do").val().trim();

    // if todo is empty/blank, do nothing and exit the function
    if (todo === '') return;

    // generate a random, unique id for this todo
    var existingIds = Object.keys(todoList);
    var id = makeRandomUniqueId(existingIds);

    addToDom(todo, id);
    addToLocalStorage(todo, id);

    // Clear the textbox when done
    $("#to-do").val('')

});

//  When a user clicks a check box then delete the specific content
//  (NOTE: Pay attention to the unusual syntax here for the click event.
//  Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
$(document.body).on("click", ".checkbox", function () {

    // Get the id of the button/todo from its data attribute and hold in a variable called todoId.
    var todoId = $(this).attr("data-todo");
    removeFromDom(todoId);
    removeFromLocalStorage(todoId);
});

function addToDom(todo, id) {

    // Create a new variable that will hold a "<p>" tag.
    var $p = $('<p>');
    $p.attr('id', 'item-' + id);
    // Then give it an ID in the following form:
    // "item-434544234"  // some random number suffix
    // Then set the to-do "value" as text to this <p> element.
    $p.text(todo);

    // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
    // Give your button a data attribute called data-to-do and a class called "checkbox".
    // Lastly add the letter X inside.
    var $newBut = $("<button>");
    $newBut.text('x');
    $newBut.attr("id", "btn-" + id);
    // Give your button a data attribute called data-to-do and a class called "checkbox".
    $newBut.attr("data-todo", id);
    $newBut.attr("class", "checkbox");

    // Append the button to the to do item
    $p.prepend($newBut);

    // Add the button and toDoItem to the to-dos div
    $('#to-dos').prepend($p);
}

function removeFromDom(id) {
    // Select and Empty the specific <p> element that previously held the to do item.
    $('#item-' + id).remove();
}

function addToLocalStorage(todo, id) {
    todoList[id] = todo;
    localStorage.setItem(lsKey, JSON.stringify(todoList));
}

function removeFromLocalStorage(id) {
    delete todoList[id];
    localStorage.setItem(lsKey, JSON.stringify(todoList));
}

// this function loadTodosFromStorage is called once (below) when the page loads
function loadTodosFromStorage() {
    var todos = localStorage.getItem(lsKey);
    var listObj = JSON.parse(todos);
    // if the key has no value in localStorage, just exit the function
    if (!listObj) return;

    todoList = listObj;

    Object.keys(todoList)       // get all the keys/ids as an array
        .forEach(function (id) {     // iterate through the ids to add their corresponding todos to the DOM
            var todo = todoList[id];
            addToDom(todo, id);
        });
}

function makeRandomUniqueId(ids) {
    const makeId = function () { return Math.random().toString().replace('0.', '') };
    let ret = makeId();
    // while ret (the new id) is found to already exist
    // call makeId to make a new id and check if it already exits
    while (ids && ids.includes(ret)) { ret = makeId() }

    // once new id is confirmed to be unique, return it
    return ret;
}

loadTodosFromStorage();