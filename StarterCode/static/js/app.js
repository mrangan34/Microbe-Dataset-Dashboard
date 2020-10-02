//Read samples.json
d3.json("samples.json").then(function(bellybutton) {
    console.log(bellybutton.samples);

    //creating arrays from larger array
    var bellybutton_array = bellybutton.samples;
    
    // console.log("printing bellybutton array")
    // console.log(bellybutton_array);

    // var bellybutton_map = bellybutton_array.map(object=>object.id);
    // console.log(bellybutton_map);

    var sample_ids_map = bellybutton_array.map(object=>object.id);
    // console.log("printing sample ID map");
    // console.log(sample_ids_map);

    var otu_ids_map = bellybutton_array.map(object=>object.otu_ids);
    // console.log(otu_ids_map);

    var sample_values_map = bellybutton_array.map(object=>object.sample_values);
    // console.log(sample_values_map);

    var otu_labels_map = bellybutton_array.map(object=>object.otu_labels);
    // console.log(otu_labels_map);

    // add every sample to the dropdown menu
    d3.select("select")
    .selectAll("option")
    .data(bellybutton_array)
    .enter()
    .append("option")
    .text(function(d) {
    return `${d.id}`;
    });

    var defaultData = bellybutton_array[0].id;
    console.log("now loading graphs for sample number")
    console.log(defaultData);
    

    // var data = [{
    //     type: 'bar',
    //     x: [20, 14, 23],
    //     y: ['giraffes', 'orangutans', 'monkeys'],
    //     orientation: 'h'
    //   }];
      
    //   Plotly.newPlot('bar', data);

    //   Plotly.newPlot('bubble', data, layout); 
    // // Bar Chart
    // var trace1 = {
    //     x: sample_values.slice(0,10).reverse(),
    //     y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    //     text: otu_labels.slice(0,10).reverse(),
    //     name: "Greek",
    //     type: "bar",
    //     orientation: "h"
    // };
    // var data = [trace1];
    // var layout = {
    //     title: "Top Ten OTUs for Individual " +sample,
    //     margin: {l: 100, r: 100, t: 100, b: 100}
    // };
    // Plotly.newPlot("bar", data, layout);  
    // });
  

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData() {
        console.log("a change in selection has occured");
        var dropdownMenu = d3.select("#selDataset");
    //     // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        console.log(dataset)
    //     // Initialize an empty array for the sample's data
    //     // var data = [];
        var newDataSample = bellybutton_array.filter(findSample => findSample.id == dataset);
            console.log("printing chosen sample");
            console.log(newDataSample);
    }
    //  
        
        // }
       

    // );
    

    // //set the data for the default graphs to be the first sample


    // //change the chart data if the dropdown menu selection changes
    // var newData = bellybutton_array.filter(object => object.id);
    // var filteredData = samples.filter(sampleObject => sampleObject.id == sample);








init();


});

