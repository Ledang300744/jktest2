const question_id = window.location.href.split("/")[5];
const contest_id = window.location.href.split("/")[4];
console.log(question_id, contest_id);
var prob_no = $("#prob-no");
const data = {
  cid: "_fill",
  code: "_fill",
  qID: "_fill",
  language: "_fill",
};
const settings = {
  async: true,
  crossDomain: true,
  url: "/contests/" + contest_id + "/submit/" + question_id,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
  processData: false,
  data: "_fill",
};
const settingsTest = {
  async: true,
  crossDomain: true,
  url: "/contests/" + contest_id + "/submit/test/" + question_id,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
  processData: false,
  data: "_fill",
};


//hide result table
$(".table").hide();

//Handlebar template
const source = document.getElementById("result").innerHTML; //get template structure
const template = Handlebars.compile(source); //compile template

prob_no.append(
  "<a target = '_blank' href='/contests/" +
    contest_id +
    "/" +
    question_id +
    "'>" +
    question_id +
    "</a>"
);
$("#btnNB").on("click", function () {
  window.alert("Nộp bài thành công, chờ kết quả!");
  
})
const submitSolution = () => {
  if (editor.getValue().trim() === "") {
    alert("Source code can't be empty!");
    return;
  }
  document.getElementById("running").style.display = "block";
  //disable button
  $("button").prop("disabled", true);
  data.cid = contest_id;
  data.code = editor.getValue();
  data.language = $("#language").val();
  data.qID = question_id;
  settings.data = JSON.stringify(data);

  $.ajax(settings).done(function (response) {
    //enable button
    $("button").removeAttr("disabled");
    //show result table
    $(".table").show();
    //empty previous results
    $("tbody").empty();

    document.getElementById("running").style.display = "none";

    response.forEach((item, index) => {
      //compile row and add to table
      const data = {
        number: index,
        time: item["time"],
        memory: item["memory"],
        result: item["status"]["description"],
      };
      const compiledRow = template(data);
      $("tbody").append(compiledRow);
    });
  });

};

const submitSolutionTest = () => {
  if (editor.getValue().trim() === "") {
    alert("Source code can't be empty!");
    return;
  }
  document.getElementById("running").style.display = "block";
  //disable button
  $("button").prop("disabled", true);
  data.cid = contest_id;
  data.code = editor.getValue();
  data.language = $("#language").val();
  data.qID = question_id;
  settingsTest.data = JSON.stringify(data);

  $.ajax(settingsTest).done(function (response) {
    //enable button
    $("button").removeAttr("disabled");
    //show result table
    $(".table").show();
    //empty previous results
    $("tbody").empty();

    document.getElementById("running").style.display = "none";

    response.forEach((item, index) => {
      //compile row and add to table
      const data = {
        number: index,
        time: item["time"],
        memory: item["memory"],
        result: item["status"]["description"],
      };
      const compiledRow = template(data);
      $("tbody").append(compiledRow);
    });
  });
};

const goBack = () => {
  window.location.href = "/contests/" + contest_id + "/" + question_id;
};
