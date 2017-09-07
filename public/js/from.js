var count = 0;
var place = [];

$('#save').click(function () {
  $("#selectError1 option:selected").each(function() {
    place.push($(this).val());
  });

  var type = $('#selectError').val();
  var name = $('#focusedInput').val();
  var des = $('#textarea2').val();
  var file_name = $('input[type="file"]').val();
  var data = {
    con_name:name,
    con_ty_id:type,
    con_description:des,
    con_video:place,
    con_part: file_name
  };

  $.post('/from/save',data).done(function (res) {
    console.log(res);
  })

});
$('$')
