/*
EOC.utility = {
    hello : function (){ alert('hello'); },
    
    manageClick : function (e){
        EOC.eventHandler.react(e.type, e.target);  
    }
};
*/

EOC.makeNS('EOC.utility', {
    hello : function (){ alert('hello'); },
    
    manageClick : function (e){
        EOC.eventHandler.react(e.type, e.target);  
        //e.stopPropagation();
    }
});


// oppure, si puó anche chiamare passando
// come terzo parametro il contesto (EOC)
// 
EOC.makeNS('eventHandler', {
    react : function (eventType, node){
        var act = jQuery(node).attr('data-action');

        if(node.tagName.match(/span/i)) {

            $('#main').off('click');
        }

        if (!act) {return false; }

        if(node.tagName.match(/button/i)) {
            jQuery('a').attr('data-action', '_a');
        }else{

            switch (eventType) {
                case 'click' :
                    (act in this) && this[act](); 
                break
            }
            return false;
        }
    },
    _a : function (){
        console.debug('chiamato _a');
    },
    _b : function (){
        console.debug('chiamato _b');
    },
    _x : function (){
        console.debug('chiamato _x');  
    }
}, EOC);