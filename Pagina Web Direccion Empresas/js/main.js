$(document).ready(function(){

  /* Variables problem */
  var economic = ["Administración de gastos", "Distribución de recursos", "Inversión", "Gastos inesperados", "Ahorro" ];
  var subEconomic = ["administration", "distribution", "inversion", "spend", "saving" ];

  var social = ["Bullying", "Comunicación", "Presión social"];
  var subSocial = ["bullying", "communication", "presion"];

  var academic = ["Estudio", "Elección de Carrera", "Organización", "Busqueda de material"];
  var subAcademic = ["studies", "careers", "organize", "material"];

  var personal = ["Autestima", "Control de emociones", "Conflicto", "Elección de empleo"];
  var subPersonal = ["selfEsteem", "emotion", "conflicts", "employee"];

  function selectArray(select) {
    switch (select) {
      case "economic": return economic; break;
      case "social": return social; break;
      case "academic": return academic; break;
      case "personal": return personal; break;
      case "business": return economic; break;
      case "administration":  return economic; break;
      case "habits": return economic; break;
      case "techo": return economic; break;
      case "other": return economic; break;
    }
  }

  function selectSubArray(select) {
    switch (select) {
      case "economic": return subEconomic; break;
      case "social": return subSocial; break;
      case "academic": return subAcademic; break;
      case "personal": return subPersonal; break;
      case "business": return subEconomic; break;
      case "administration":  return subEconomic; break;
      case "habits": return subEconomic; break;
      case "techo": return subEconomic; break;
      case "other": return subEconomic; break;
    }
  }

  $(".field-main-problem").on("click", function(){
    $("div.problem").hide();
    $("div.subproblem").removeClass("hide");

    var array = selectArray($(this).attr("data-problem"));
    var subarray = selectSubArray($(this).attr("data-problem"));

    for (var i = 0; i < array.length; i++) {
      var div = $("<div></div>").addClass("col-md-3 col-sm-3 field-main-problem");
      $(div).attr({"data-subproblem": "" + subarray[i]});

      var p = $("<p></p>").text(array[i]);

      $(div).append(p);
      $("div.content-subproblem").append(div);
    }

  });
  console.log(economic);

  jQuery.get('http://yourserver.com/file.txt', function(data) {
    do_something_with(data)
  }, 'text');

});
