// // Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour-btn").on("click", function(event) {
      var id = this.id;
      var devoured = $(this).data("devoured");
  
      var changeDevour = {
        devoured: true
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: changeDevour
      }).then(
        function() {
          console.log("changed devour to", changeDevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $( "#add-order" ).submit(function( event ) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newOrder = {
        burgername: $("#order-text").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/newburger", {
        type: "POST",
        data: newOrder
      }).then(
        function() {
          console.log("created new order");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });