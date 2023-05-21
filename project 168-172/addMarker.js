AFRAME.registerComponent("create-markers", {
    init:async function(){
     var mainScene = document.querySelector("#main-scene")
     var toys = await this.getAllToys()

     toys.map(toy=>{
        var marker = document.createElement("a-marker");
        marker.setAttribute("id", dish.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", dish.marker_pattern_url);
        marker.setAttribute("cursor", {
            rayOrigin:"mouse"
        })
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      var model = document.createElement("a-entity");

      model.setAttribute("id", `model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${toy.model_url})`);
      model.setAttribute("gesture-handler", {});
      model.setAttribute("animation-mixer", {});
      marker.appendChild(model);

     })
    },

    getAllToys:async function(){
      return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap=>{
        return snap.docs.map(doc.data())
      })
    }
})