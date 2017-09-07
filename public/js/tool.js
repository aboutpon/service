function remove(id){
   $.get('/content/delete/'+id).done(function(res){
     if (res.status) {
       $('#id'+id).remove();
     }else {
       alert('error delete');
     }
   });
}
