jQuery(function () {

    var body = document.getElementById('body'),
        todos = document.getElementById("todoItems"),
        todo = document.getElementById('todo'),
        butt = document.getElementById('addtodo');


    window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;


window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;



    EOC.makeNS('EOC.indexedDB', {
        db : null,
        onerror : function(e) {
            console.log(e);
        },
        open : function() {
            var version = 1,
                request = indexedDB.open("todos", version);

            // We can only create Object stores in a versionchange transaction.
            request.onupgradeneeded = function(e) {
                var db = e.target.result;

                // A versionchange transaction is started automatically.
                e.target.transaction.onerror = EOC.indexedDB.onerror;

                if (db.objectStoreNames.contains("todo")) {
                    db.deleteObjectStore("todo");
                }

                var store = db.createObjectStore("todo",
                {keyPath: "timeStamp"});
            };

            request.onsuccess = function(e) {
                EOC.indexedDB.db = e.target.result;
                EOC.indexedDB.getAllTodoItems();
            };

            request.onerror = EOC.indexedDB.onerror;
        },
        addTodo : function(todoText) {
            var db = EOC.indexedDB.db,
                trans = db.transaction(["todo"], "readwrite"),
                store = trans.objectStore("todo");

            var data = {
                "text": todoText,
                "timeStamp": new Date().getTime()
            };

            var request = store.put(data);

            request.onsuccess = function(e) {
                EOC.indexedDB.getAllTodoItems();
            };

            request.onerror = function(e) {
                console.log("Error Adding: ", e);
            };
        },
        deleteTodo : function(id) {
            var db = EOC.indexedDB.db,
                trans = db.transaction(["todo"], "readwrite"),
                store = trans.objectStore("todo");

            var request = store.delete(id);

            request.onsuccess = function(e) {
                EOC.indexedDB.getAllTodoItems();
            };

            request.onerror = function(e) {
                console.log("Error Adding: ", e);
            };
        },
        getAllTodoItems : function() {
            var todos = document.getElementById("todoItems");

            todos.innerHTML = "";

            var db = EOC.indexedDB.db,
                trans = db.transaction(["todo"], "readwrite"),
                store = trans.objectStore("todo"),
                keyRange = IDBKeyRange.lowerBound(0),
                cursorRequest = store.openCursor(keyRange);

            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) return;
                renderTodo(result.value);
                result.continue();
            };


            cursorRequest.onerror = EOC.indexedDB.onerror;
        }
    });



    function renderTodo(row) {
        var todos = document.getElementById("todoItems"),
            li = document.createElement("li"),
            a = document.createElement("a"),
            t = document.createTextNode(row.text);

        a.addEventListener("click", function() {
            EOC.indexedDB.deleteTodo(row.timeStamp);
        }, false);

        a.href = "#";
        a.textContent = " [Delete]";
        li.appendChild(t);
        li.appendChild(a);
        todos.appendChild(li);
    }

    function addTodo() {
        console.log('adding')
        var todo = document.getElementById("todo");
        EOC.indexedDB.addTodo(todo.value);
        todo.value = "";
    }


    EOC.indexedDB.open();

    document.getElementById("addtodo").addEventListener('click', addTodo, false);


    // show crosscompatibility
    cross(body, {i:'10.0+', f: '10+', s: false, c:'31.0+', o:'15+', an : '4.4+', ip : false});
});