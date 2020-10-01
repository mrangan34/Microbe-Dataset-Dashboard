//Read samples.json
d3.json("samples.json").then(function(bellybutton) {
    //console.log(bellybutton.samples);
    var bellybutton_array = bellybutton.samples;
    console.log("printing bellybutton array")
    console.log(bellybutton_array);

    // var bellybutton_map = bellybutton_array.map(object=>object.id);
    // console.log(bellybutton_map);



    var bellybutton_array = bellybutton.samples;

    var sample_ids_map = bellybutton_array.map(object=>object.id);
    // console.log("printing sample ID map");
    // console.log(sample_ids_map);


    var otu_ids_map = bellybutton_array.map(object=>object.otu_ids);
    console.log(otu_ids_map);

    var sample_values_map = bellybutton_array.map(object=>object.sample_values);
    // console.log(sample_values_map);

    var otu_labels_map = bellybutton_array.map(object=>object.otu_labels);
    // console.log(otu_labels_map);

    // Second, create new elements for extra data points
    d3.select("select")
    .selectAll("option")
    .data(bellybutton_array)
    .enter()
    .append("option")
    .text(function(d) {
    return `${d.id}`;
    });

//     // Create an array of each country's numbers
// var us = Object.values(data.us);
// var uk = Object.values(data.uk);
// var canada = Object.values(data.canada);

// // Create an array of music provider labels
// var labels = Object.keys(data.us);

// Display the default plot
// function init() {
//   var data = [{
//     values: us,
//     labels: labels,
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("pie", data, layout);
// }

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the sample's data
    var data = [];
    var result = bellybutton_array.find(function(e){
        return e.id == dataset;


  })
  console.log("the result is:")
  console.log(result)

    // if (dataset == '944') {

    // var result = bellybutton_array.find(function(e) {
    //     return e.id == '944';
    //     });
    //     console.log("the resulting array object is:")
    //     console.log(result)

//   }
//   else if (dataset == '950') {
//       data = uk;
//   }
//   else if (dataset == '958') {
//       data = canada;
//   }
  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();


});

