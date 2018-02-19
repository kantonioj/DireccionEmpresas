var global_inputs = 3;

$(document).ready(function(){
  $(button_plus).on("click", function() {
    global_inputs++;
    if (global_inputs >= 3) { $(button_minus).removeClass("disabled"); }
    else { $(button_minus).addClass("disabled"); }
    if (global_inputs == 5) { $(button_plus).addClass("disabled"); }
    var input = $("<input></input>").attr({
      "id" : "S" + global_inputs,
      "class" : "input_solutions",
      "type" : "text",
      "placeholder" : "Solución " + global_inputs
    });

    $(".input_solutions_div").append(input);
    return false;
  });

  $(button_minus).on("click", function() {
    global_inputs--;
    if (global_inputs <= 4) { $(button_plus).removeClass("disabled"); }
    else { $(button_plus).addClass("disabled"); }
    if (global_inputs == 3) { $(button_minus).addClass("disabled"); }
    $("#S" + (global_inputs + 1)).remove();
    return false;
  });

  $(matrix).on("click", function() {
    $(dataTable).removeClass("hide");
    var input;
    $("#T1").text("");
    $("#T2").text("");
    $("#T3").text("");
    $("#H4").remove();
    $("#H5").remove();
    $("#O4").remove();
    $("#O5").remove();
    $("#A4").remove();
    $("#A5").remove();
    $("#C4").remove();
    $("#C5").remove();
    $("#U4").remove();
    $("#U5").remove();
    $("#R4").remove();
    $("#R5").remove();
    $("#I4").remove();
    $("#I5").remove();
    $("#T4").remove();
    $("#T5").remove();
    for (var i = 4; i <= global_inputs; i++) {
      var th = $("<th></th>").attr({
        "id" : "H" + i
      });
      th.text("Solución " + i);

      $(".table-header").append(th);
      /* ------------- objectives -------------*/

      th = $("<td></td>").attr({
        "id" : "O" + i
      });
      input = $("<input></input>").attr({
        "type" : "number",
        "value" : 0,
        "class" : "input_matrix",
        "min" : 0,
        "max" : 5,
      });
      th.append(input);

      $(".table-objectives").append(th);
      /* ------------- alternatives -------------*/
      th = $("<td></td>").attr({
        "id" : "A" + i
      });

      input = $("<input></input>").attr({
        "type" : "number",
        "value" : 0,
        "class" : "input_matrix",
        "min" : 0,
        "max" : 5
      });
      th.append(input);

      $(".table-alternatives").append(th);
      /* ------------- consecuencies -------------*/
      th = $("<td></td>").attr({
        "id" : "C" + i
      });

      input = $("<input></input>").attr({
        "type" : "number",
        "value" : 0,
        "class" : "input_matrix",
        "min" : 0,
        "max" : 5
      });
      th.append(input);

      $(".table-consecuencies").append(th);
      /* ------------- uncertainty -------------*/
      th = $("<td></td>").attr({
        "id" : "U" + i
      });

      input = $("<input></input>").attr({
        "type" : "number",
        "value" : 0,
        "class" : "input_matrix",
        "min" : 0,
        "max" : 5
      });
      th.append(input);

      $(".table-uncertainty").append(th);
      /* ------------- risk -------------*/
      th = $("<td></td>").attr({
        "id" : "R" + i
      });

      input = $("<input></input>").attr({
        "type" : "number",
        "value" : 0,
        "class" : "input_matrix",
        "min" : 0,
        "max" : 5
      });
      th.append(input);

      $(".table-risk").append(th);
      /* ------------- information -------------*/
      th = $("<td></td>").attr({
        "id" : "I" + i
      });

      input = $("<input></input>").attr({
        "type" : "number",
        "value" : 0,
        "class" : "input_matrix",
        "min" : 0,
        "max" : 5
      });
      th.append(input);

      $(".table-information").append(th);
      /* ------------- total -------------*/
      th = $("<td></td>").attr({
        "id" : "T" + i
      });
      th.text("");

      $(".table-total").append(th);
    }


    return false;
  });

  $(total).on("click", function() {
    var Sol;
    for (var i = 1; i <= global_inputs; i++) {
      Sol = 0;
      Sol +=  parseInt($("#O" + i).children().val());
      Sol +=  parseInt($("#A" + i).children().val());
      Sol +=  parseInt($("#C" + i).children().val());
      Sol +=  parseInt($("#U" + i).children().val());
      Sol +=  parseInt($("#R" + i).children().val());
      Sol +=  parseInt($("#I" + i).children().val());
      console.log(Sol);
      $("#T" + i).text(Sol.toString());
    }
    return false;
  });

});
