AFRAME.registerComponent("markerHandler", {
    init:async function(){
        this.el.addEventListener("markerFound", () =>{
            this.handleMarkerFound()
        });
        this.el.addEventListener("markerLost", ()=>{
            this.handleMarkerLost()
        })
    },
    handleMarkerFound:function(){
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display="flex";
        var ordersumButton = document.getElementById("order-summary-button");
        var orderButton = document.getElementById("order-button");

        orderButton.addEventListener("click", function(){
            swal({
                icon:"https://i.imgur.com/4NZ6uLY.jpg",
                title:"Thanks for order",
                text: " ",
                timer: 2000, 
                buttons: false

            })
        })
        ordersumButton.addEventListener("click", ()=>{
            swal({
                icon:"warning",
                title:"Order Summary", 
                text:"Please wait"
            })
        })

    }, 
    handleMarkerLost:function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display="none";

    },
    getOrderSummary:async function(uid){
      return await firebase
      .firebase()
      .collection("users")
      .doc(uid)
      .get()
      .then(doc=>doc.data())

    },
  handleOrder: function (tNumber, toy) {
    firebase
      .firestore()
      .collection("tables")
      .doc(tNumber)
      .get()
      .then(doc=>{
        var details = doc.data();

        if (details["current_orders"][toy.id]) {
          details["current_orders"][toy.id]["quantity"] += 1;
          var currentQuantity = details["current_orders"][toy.id]["quantity"];
         
          details["current_orders"][toy.id]["subtotal"] =
            currentQuantity * toy.price;
        } else {
            details["current_orders"][toy.id] = {
              item: toy.toy_name,
              price: toy.price,
              quantity: 1,
              subtotal: toy.price * 1
            };
          }
          details.total_bill += toy.price;

          firebase
            .firestore()
            .collection("users")
            .doc(doc.id)
            .update(details);
  
      })
  },
 
  handleRatings:function(toy){
    document.getElementById("rating-modal-div").style.display="flex"
    document.getElementById("rating-input").value="0"

    var saveRatingButton = document.getElementById("save-rating-button");
    saveRatingButton.addEventListener("click", ()=>{
      document.getElementById("rating-modal-div").style.display="none"
      var rating=document.getElementById("rating-input").value
    })

  

    firebase
    .firestore()
    .collection("toys")
    .doc(tNumber)
    .update({
      rating:rating
    })
    .then(()=>{
      swal({
        icon:"success", 
        title:"Thanks for Paying!",
        text:"We Hope You Enjoyed Your Purchase!!",
        timer:2500, 
        buttons:false
      })
    })
  }

})