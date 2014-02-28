now=$(date +"%T")
if [ "$1" == "kill" ]; then    
    echo -e "ENDED @ $now \n=====================================================" >> malta.log
    kill -9 `ps aux | grep malta | grep -v grep | awk '{print $2}'`
else
    # clean log
    # echo '' > malta.log
    echo "STARTED @ $now" >> malta.log
    malta 2/slides/build/index.html 2/slides/>> malta.log 2>&1 &
fi