(function (ns){
    "use strict";

    // il valore del parametro attuale ns é "EOC"
    // visto che la funzione autoeseguente viene invocata 
    // con questo parametro


    /**
     * crea un namespace globale o locale
     * @param  {String} str una stringa opzionalmente separata da / o .
     * @param  {Object} obj il contenuto del ns (default {})
     * @param  {ns} ctx     contesto di creazione del ns (default window)
     * @example
     *     // returns {} in EOC.core.util
     *     globalNS.method(5, 15);
     * @return {Object}     il ns voluto
     *
     */
    function makens(str, obj, ctx) {
        var els = str.split(/\.|\//),
            l = els.length,
            _u_ = 'undefined',
            ret;
        (typeof ctx === _u_) && (ctx = window);
        (typeof obj === _u_) && (obj = {});
        //
        if (!ctx[els[0]]) {
            ctx[els[0]] = (l === 1) ? obj : {};
        }
        ret = ctx[els[0]];
        return (l > 1) ? makens(els.slice(1).join('.'), obj, ctx[els[0]]) : ret;
    }


    // utilizzo la funzione appena definita (che non sarebbe visibile
    // all'esterno) per creare un NS globale (EOC) in cui metto anche makens
    // con accesso makeNS, in questo modo makens é disponibile a tutti
    // tramite EOC.makeNS
    // 
    makens(ns, {
        // esporto makens sotto altro nome
        makeNS : makens,

        // visto che ci siamo aggiungo anche un'altra funzione utile che
        // controlla se un determinato NS esiste o meno
        /**
         * Ritorna un NS se esiste altrimenti torna false
         * @param  {String} str una stringa opzionalmente separata da / o .
         * @param  {ns} ctx     contesto di creazione del ns (default window)
         * @return {mixed}      il NS trovato oppure false
         */
        checkNS : function (ns, ctx) {

            // splitto stringa con / o .
            // 
            var els = ns.split(/\.|\//),
                i = 0,
                l = els.length;

            // se é stato passato un ctx allora diventa la radice
            // 
            ctx = (ctx !== undefined) ? ctx : window;

            // gira tutti gli elementi in cui é stato splittato il ns
            // 
            for (null; i < l; i += 1) {
                // se esiste ...ridefinisci ctx e lascia scavare
                if (ctx[els[i]]) {
                    ctx = ctx[els[i]];
                } else {
                    // elemento non trovato nel ctx corrente
                    // muore tutto torna false, il ns originale da controllare non esiste
                    // potrebbe tuttavia esisterne una parte
                    return false;
                }
            }

            // a questo punto ctx é l'ultimo elemento
            // dello split ed esiste
            // 
            return ctx;
        },

        /**
         * Restituisce un id univoco con prefisso il NS (in questo caso "EOC")
         * utile in tutti i casi in cui si vuole creare per esempio diversi id
         * senza doversi preoccupare che collidano
         * @return {String} id univoco
         *
         * @hint non viene invocata come una funzione bensí come proprietá
         * EOC.uniqueID -> EOC1
         */
        uniqueId : new function () {
            var count = 0,
                self = this;
            this.prefix = ns;
            this.toString = function () {
                return  self.prefix + ++count;
            }
        }
    });

/**
 * la funzione autoeseguente riceverá un parametro
 * che ora stabiliamo essere EOC
 */
})('EOC');