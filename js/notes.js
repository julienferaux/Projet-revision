var main_note = document.getElementsByClassName('note_list_item')[0];
var add = document.getElementById('add')[0];
add.addEventListener('onclick',document.write("TEST !!!!! !!! ! !! !"));
if(add != null){
    document.write("TO TO LE Chenapan " ) ;
    add.onclick = function(){
        document.write("TEST !!!!! !!! ! !! !");
    }
}else{
    document.write(" TEST 2  " ) ;
}
