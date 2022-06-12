$(".submit").on("click", function () {
    //disable button
    $(".submit").toggleClass("is-loading");
  
    // creating question object
  
    const qIDTags = {};
    qIDTags.qID = $("#select3").val().map((item) => item.trim());
    // Check whether all star marked fields have value or not
    function check(data) {
      if (data !== null && data !== "" && data !== undefined) {
        return true;
      }
      return false;
    }

  });
  