const qID = window.location.href.split("edit/")[1];
const testFile =
  '<div class="box" ><h2 class="subtitle">TestFile</h2><textarea class="textarea stdin" placeholder="Stdin"></textarea><textarea class="textarea stdout" placeholder="Stdout"></textarea></div>';
const settings = {
	"async": true,
	"crossDomain": true,
	"url": qID,
	"method": "PUT",
	"headers": {
		"Content-Type": "application/json",
		"cache-control": "no-cache"
	},
	"processData": false,
	"data": "_fill"
};
const testcases = {};
testcases.cases = [];

//add & remove buttons for testfile
$('#add').on('click', () => {
	//compile testfile box and add to table
	const testfile = template({});
	$('#testcases').append(testfile);
});
$('#rem').on('click', () => {
	$('#testcases').children().last().remove();
})
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

//Handlebar template
const source = document.getElementById('fileTemplate').innerHTML; //get template structure
const template = Handlebars.compile(source); //compile template

if (prev_tc) {
	prev_tc.cases.forEach(item => {
		let testfile = {
			"stdin": item.stdin,
			"stdout": item.stdout
		};
		$('#testcases').append(template(testfile));
	});
}

$('.submit').on('click', function () {
	//disable button
	$('.submit').toggleClass('is-loading');

	// creating question object
	const ques = {};

	ques.name = $("#QuesName").val();
	ques.qID = qID;
	ques.isVisible = Boolean($("#isVisible").val());
	ques.description = $("#Description").val();
	ques.inputFormat = $("#InputFormat").val();
	ques.outputFormat = $("#OutputFormat").val();
	ques.explanation = $("#Explanation").val();
	ques.difficulty = Number($("#DifficultyLevel").val());
	ques.problemSetter = $("#ProblemSetter").val();
	ques.timeLimit = $("#TimeLimit").val();
	ques.memoryLimit = Number($("#MemoryLimit").val());
	ques.tags = $("#Tags").val();
	ques.editorial = $("#Editorial").val();

	// creating testcase Object
	const testcases = {};
	testcases.timeLimit = $("#TimeLimit").val();
	testcases.memoryLimit = $("#MemoryLimit").val();
	testcases.cases = [];
	$('#testcases').children('div').each(function () {
		let testfile = {
			stdin: '_fill',
			stdout: '_fill'
		};
		testfile.stdin = $(this).find('.stdin').val();
		testfile.stdout = $(this).find('.stdout').val();
		testcases['cases'].push(testfile);
	});

	if (!testcases.cases.length) {
		window.alert("No Testcase added");
		//enable button
		$('.submit').toggleClass('is-loading');

		return 0;
	}

	//send data to server;
	const data = {
		testcases,
		ques,
		qID
	};
	settings.data = JSON.stringify(data);
	$.ajax(settings).done(function (response) {
		//enable button
		$('.submit').toggleClass('is-loading');

		//show response
		window.alert(response);

	});

});
