$(document).ready(function(){

  var Array_Topics = new Array();
  var Array_Criteria = new Array();

  jQuery.get('definiciones.txt', function(data) {
    getData(data);
  }, 'text');

  jQuery.get('criterios.txt', function(data) {
    getCriteria(data);
  }, 'text');

  function getData(data){
    var string = data.split("~");
    string.splice(0, 1);
    console.log("**split**");
    console.log(string);

    var problems = string[0].split("*");
    problems.splice(0, 1);
    console.log("**Problemas**");
    console.log(problems);

    for (var index = 1; index < string.length; index++) {
      var subproblemsArray = string[index].split("¬");
      subproblemsArray.splice(subproblemsArray.length - 1, subproblemsArray.length);
      console.log(subproblemsArray);

      var Array_Temp = new Array();
      var name_problem = new Array();
      var subproblem = new Array();
      var mainproblem = new Array();
      var tempmainproblem = new Array();
      var solutions = new Array();
      var tempmainsolutions = new Array();
      var indexmainproblem = 0;
      var boolmainproblem;
      var boolsolution;

      for (var i = 0; i < subproblemsArray.length; i++) {
        var comp = subproblemsArray[i];
        comp = comp.substr(0, 5);

        if ($.trim(comp) === "***" )
        name_problem.push(subproblemsArray[i].substr(5, subproblemsArray[i].length-1));
        else{
          if ($.trim(comp.substr(0, 4)) === "**" ){
            subproblem.push(subproblemsArray[i].substr(4, subproblemsArray[i].length-1));
            boolmainproblem = true;
          } else {
            if ($.trim(comp.substr(0, 3)) === "*" ){
              if (!boolmainproblem || tempmainproblem.length == 0) {
                tempmainproblem.push(subproblemsArray[i].substr(3, subproblemsArray[i].length-1));
              } else {
                mainproblem.push(tempmainproblem);
                tempmainproblem = new Array();
                tempmainproblem.push(subproblemsArray[i].substr(3, subproblemsArray[i].length-1));
              }
              boolmainproblem = false;
              boolsolution = true;
            } else {
              if ($.trim(comp.substr(0, 3)) === "+" ){
                if (!boolsolution || tempmainproblem.length == 0) {
                  tempmainsolutions.push(subproblemsArray[i].substr(3, subproblemsArray[i].length-1));
                } else {
                  solutions.push(tempmainsolutions);
                  tempmainsolutions = new Array();
                  tempmainsolutions.push(subproblemsArray[i].substr(3, subproblemsArray[i].length-1));
                }
                boolsolution = false;

                if (i == subproblemsArray.length - 1) {
                  solutions.push(tempmainsolutions);
                  tempmainsolutions = new Array();
                  solutions.splice(0, 1);
                  mainproblem.push(tempmainproblem);
                  tempmainproblem = new Array();

                  var main = mainproblem.length;

                  for (var z = 0; z < main; z++) {
                    var maintwo = mainproblem[z].length;
                    for (var x = 0; x < maintwo; x++) {
                      // console.log("a");
                      mainproblem[z].push(solutions[indexmainproblem]);
                      indexmainproblem++;
                    }
                  }

                  Array_Temp.push(name_problem);
                  Array_Temp.push(subproblem);
                  Array_Temp.push(mainproblem);
                  Array_Topics.push(Array_Temp);

                }
              }
            }
          }
        }
      }

      // console.log("main = " + mainproblem.length);
      // console.log(name_problem);
      // console.log(subproblem);
      // console.log(mainproblem);
      // console.log(solutions);
    }
    console.log(Array_Topics);
    appendData();

  }

  function getCriteria(data){
    var string = data.split("*");
    string.splice(0, 1);
    Array_Criteria = string;
  }

  function appendData() {
    console.log(Array_Topics[0][0]);

    var icons = ["fa fa-money","fa fa-globe","fa fa-graduation-cap","fa fa-user","fa fa-building","fa fa-bar-chart","fa fa-archive","fa fa-microchip","fa fa-list"];

    for (var i = 0; i < Array_Topics.length; i++) {
      var div = $("<div></div>").addClass("col-md-3 col-sm-3 first-step field-main-problem");
      $(div).attr({"id" : i})
      var icon = $("<i></i>").addClass("" + icons[i]);
      $(icon).attr({"aria-hidden": true});
      var p = $("<p></p>").text(Array_Topics[i][0][0] + " ");

      $(div).append(icon);
      $(div).append(p);

      $("div.general-problem").append(div);
    }

  }

  var first_id;
  var second_id;
  var third_id;

  $(document).on("click", ".first-step", function(){
    $("div.problem").hide();
    $("div.subproblem").removeClass("hide");

    first_id = $(this).attr("id");

    for (var i = 0; i < Array_Topics[first_id][1].length; i++) {
      var div = $("<div></div>").addClass("col-md-3 col-sm-3 second-step field-main-problem");
      $(div).attr({"id" : i});

      var p = $("<p></p>").text(Array_Topics[first_id][1][i]);

      $(div).append(p);
      $("div.content-subproblem").append(div);
    }

    return false;

  });

  $(document).on("click", ".second-step", function(){
    $("div.subproblem").hide();
    $("div.mainproblem").removeClass("hide");

    second_id = $(this).attr("id");

    for (var i = 0; i < Array_Topics[first_id][2][second_id].length / 2; i++) {
      var div = $("<div></div>").addClass("col-md-12 col-sm-12 third-step field-main-problem");
      $(div).attr({"id" : i});

      var p = $("<p></p>").text(Array_Topics[first_id][2][second_id][i]);

      $(div).append(p);
      $("div.content-mainproblem").append(div);
    }

    return false;
  });

  $(document).on("click", ".third-step", function(){
    console.log("click");
    $("div.mainproblem").hide();
    $("section.criteria").removeClass("hide");

    third_id = $(this).attr("id");
    var tempIndex = + parseInt(Array_Topics[first_id][2][second_id].length / 2) + parseInt(third_id);
    var int_solution = Array_Topics[first_id][2][second_id][tempIndex].length;

    for (var i = 0; i < int_solution; i++) {
      var strTemp = Array_Topics[first_id][2][second_id][tempIndex][i];
      strTemp = strTemp.split("-");
      var h5 = $("<h5></h5>").text("Solución " + (i + 1) + ": " + strTemp[0]);
      $("div.list-criteria").append(h5);

      var th = $("<th></th>").attr({"id" : "sol" + i});
      $(th).text("Solución " + (i + 1));
      $("tr.table-header").append(th);
    }

    for (var i = 0; i < Array_Criteria.length; i++) {

      var tr = $("<tr></tr>").addClass("row-matrix");
      var td = $("<td></td>").attr({"id" : ("Col" + i + "-criteria")});
      $(td).text(Array_Criteria[i]);
      $(tr).append(td);
      for (var j = 0; j < int_solution; j++) {
        td = $("<td></td>").attr({"id" : ("Col" + i + "-" + j)});
        var input = $("<input></input>").attr({"type" : "number", "value" : 0, "class" : "input_matrix", "min" : 0, "max" : 5});

        $(td).append(input);
        $(tr).append(td);
      }
      $("tbody.tb-matrix").append(tr);

      if ((Array_Criteria.length - 1) == i) {
        var a = $("<a></a>").attr({"class" : "btn btn-primary", "href" : "#", "id" : "total"});
        $(a).text("Resolver");
        var tr = $("<tr></tr>").addClass("row-matrix");
        var td = $("<td></td>").attr({"id" : ("Total-criteria")});
        $(td).append(a);
        $(tr).append(td);
        for (var j = 0; j < int_solution; j++) {
          td = $("<td></td>").attr({"id" : ("Total" + i + "-" + j)});
          $(tr).append(td);
        }
        $("tbody.tb-matrix").append(tr);
      }
    }

    $("div.list-criteria").append("<br>");



    return false;
  });

    $(document).on("click", "a#total", function(){
    console.log("a");
    var total_nodos = $("tr.row-matrix");
    var hijos_nodos;
    var arry_sum = new Array();
    console.log(total_nodos);

    for (var i = 0; i < total_nodos.length; i++) {
      if (i != total_nodos.length - 1) {
        console.log(total_nodos[i]);
        console.log("*");
        hijos_nodos = $(total_nodos[i]).children();
        console.log(hijos_nodos);
        hijos_nodos = $(hijos_nodos).find(".input_matrix");

        if (i == 0) {
          for (var i = 1; i < hijos_nodos.length; i++) {
            // arry_sum.push(hijos_nodos[i]);
            console.log(hijos_nodos[i]);
          }
        }


      }
    }

    return false;
  });

});
