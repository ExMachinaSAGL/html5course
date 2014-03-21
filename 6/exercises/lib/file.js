EOC.makeNS('EOC.file', {
    check : function (){
        return !!(window.File && window.FileReader && window.FileList && window.Blob);
    }
});
EOC.file.supportFileAPI = EOC.file.check();
