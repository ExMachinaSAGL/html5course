jQuery(function () {

    
    var body = jQuery('#body');

    EOC.supports.webDB(body[0]);

    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024),
        dbgTarget = document.createElement('div'),
        msg;
    dbgTarget.style.backgroundColor = '#ddd';
    dbgTarget.style.padding = '10px';
    dbgTarget.style.margin = '10px 0px';

    body[0].appendChild(dbgTarget);
/*
    db.transaction(function (tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');

        msg = '<p>Log message created and row inserted.</p>';
        dbgTarget.innerHTML += msg;

    });
*/
    db.transaction(function (tx) {
        tx.executeSql(
            'SELECT * FROM LOGS',
            [],
            function (tx, results) {
                var len = results.rows.length,
                i;
                msg = "<p>Found rows: " + len + "</p>";
                dbgTarget.innerHTML +=  msg;

                for (i = 0; i < len; i++){
                    msg = "<p><strong>" + results.rows.item(i).log + "</strong></p>";
                    dbgTarget.innerHTML +=  msg;
                }
            },
        null);
    });


    // show crosscompatibility
    cross(body[0], {i:false, f: false, s: '3.1+', c:'4.0+', o:'10.5+', an : '2.1+', ip : '3.2+'});
});