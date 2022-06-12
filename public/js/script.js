$(document).ready(function() {
    var table = $('#example').DataTable({
      select: true,
      autoFill: true,

       'columnDefs': [
          {
             'targets': 0,
             'checkboxes': {
                'selectRow': true
             }
          }
       ],
       'select': {
          'style': 'multi'
       },
       'order': [[1, 'asc']]
    });
       // Handle form submission event 
   $('#frm-example').on('submit', function(e){
      var form = this;
      
      var rows_selected = table.column(0).checkboxes.selected();

      // Iterate over all selected checkboxes
      $.each(rows_selected, function(index, rowId){
         // Create a hidden element 
         $(form).append(
             $('<input>')
                .attr('type', 'hidden')
                .attr('name', 'qID[]')
                .val(rowId)
         );
      });

      // FOR DEMONSTRATION ONLY
      // The code below is not needed in production
      
      // Output form data to a console     
      $('#example-console-rows').text(rows_selected.join(","));
      
      // Output form data to a console     
      $('#example-console-form').text($(form).serialize());
       
      // Remove added elements
      $('input[name="qID\[\]"]', form).remove();
       
      // Prevent actual form submission
      e.preventDefault();
   });
 });
 