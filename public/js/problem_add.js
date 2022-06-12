const testFile =
  '<div class="box" ><h2 class="subtitle">TestFile</h2><textarea class="textarea stdin" placeholder="Stdin"></textarea><textarea class="textarea stdout" placeholder="Stdout"></textarea></div>';
const settings = {
  async: true,
  crossDomain: true,
  url: "/admin/add",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  },
  processData: false,
  data: "_fill",
};

$("#add").on("click", () => {
  $("#testcases").append(testFile);
});
$("#rem").on("click", () => {
  $("#testcases").children().last().remove();
});

// var pj = [];

// 	function setupReader(file) {
// 		var name = file.name;
// 		var reader = new FileReader();
// 		reader.onload = function(e) {
// 			// get file content
// 			var text = e.target.result;
// 			var li = document.createElement("li");
// 			li.innerHTML = name + "____" + text;
// 			ul.appendChild(li);
// 		}
// 		reader.readAsText(file, "UTF-8");
// 	}

// 	for (var i = 0; i < files.length; i++) {
// 		setupReader(files[i]);
// 	}

// }

// var openFile = function(event) {
//     var input = event.target;

//     var reader = new FileReader();
//     reader.onload = function(){
//       var text = reader.result;
//       var ul = document.getElementById("filelist");
//       var li = document.createElement("li");
//       li.innerHTML = reader.result;
//       ul.appendChild(li);
//     };
//     reader.readAsText(input.files[0]);
//   };

// creating testcase Object
const testcases = {};
testcases.cases = [];

$("#Testcases").on("change", fileInputControl);
// fileInputControl(event);
function fileInputControl(event) {
  let fileInpControl = event.target;
  let files = fileInpControl.files;

  for (var i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let data = event.target.result;

      let testfile = {
        stdin: "_fill",
        stdout: "_fill",
      };
      console.log(data);
      var x = data.split("|",2);
     
      console.log(x);
      testfile.stdin = x[0];
      testfile.stdout = x[1];

      testcases["cases"].push(testfile);
      // console.log();
    };
    reader.readAsText(files[i]);
  }
}

$(".submit").on("click", function () {
  //disable button
  $(".submit").toggleClass("is-loading");

  // creating question object
  const ques = {};

  ques.name = $("#QuesName").val();
  ques.isVisible = Boolean($("#isVisible").val());
  ques.description = $("#Description").val();
  ques.inputFormat = $("#InputFormat").val();
  ques.outputFormat = $("#OutputFormat").val();
  ques.explanation = $("#Explanation").val();
  ques.difficulty = Number($("#DifficultyLevel").val());
  ques.difficultyAutoUpdate = Number($("#DifficultyLevel").val());
  ques.problemSetter = $("#ProblemSetter").val();
  ques.timeLimit = $("#TimeLimit").val();
  ques.memoryLimit = Number($("#MemoryLimit").val());
  ques.tags = $("#Tags").val();
  ques.editorial = $("#Editorial").val();

  const qIDTags = {};
  qIDTags.tags = $("#Tags").val().map((item) => item.trim());
  // Check whether all star marked fields have value or not
  function check(data) {
    if (data !== null && data !== "" && data !== undefined) {
      return true;
    }
    return false;
  }

  if (
    check(ques.name) &&
    check(ques.isVisible) &&
    check(ques.description) &&
    ques.timeLimit >= 2 &&
    ques.timeLimit <= 15 &&
    ques.memoryLimit >= 2048 &&
    ques.memoryLimit <= 512000
  ) {
    // Works fine;
  } else {
    window.alert("Something wrong! Please check again!");
    //enable button
    $(".submit").toggleClass("is-loading");
    return 0;
  }

  testcases.timeLimit = $("#TimeLimit").val();
  testcases.memoryLimit = $("#MemoryLimit").val();

  // $('#testcases').children('div').each(function () {
  // 	let testfile = {
  // 		stdin: '_fill',
  // 		stdout: '_fill'
  // 	};
  // 	testfile.stdin = $(this).find('.stdin').val();
  // 	testfile.stdout = $(this).find('.stdout').val();
  // 	testcases['cases'].push(testfile);
  // });

  if (!testcases.cases.length) {
    window.alert("No Testcase added");
    //enable button
    $(".submit").toggleClass("is-loading");
    return 0;
  }

  //send data to server;
  const data = {
    testcases,
    ques,
    qIDTags,
  };  
  
  settings.data = JSON.stringify(data);  
    //enable button
    $(".submit").toggleClass("is-loading");
    window.alert("Tạo thành công bài tập.");
    setTimeout(function () {
      window.location.href = "/admin/add";
     }, 0);
$.ajax(settings).done(function (response) {
    console.log("response"+response);

    $(".submit").toggleClass("is-loading");

    //show response

    //empty the textarea
    $("textarea").val("");
  });
});
