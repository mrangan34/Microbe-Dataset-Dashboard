//Read samples.json
d3.json("samples.json").then(function(bellybutton) {
   
    var bellybutton_samples = bellybutton.samples;
    console.log(bellybutton_samples);


    // add every sample to the dropdown menu
    d3.select("select")
    .selectAll("option")
    .data(bellybutton_samples)
    .enter()
    .append("option")
    .text(function(d) {
    return `${d.id}`;
    });

   // Function called automatically
    function getData() {
        // console.log("a change in selection has occured");
        var dropdownMenu = d3.select("#selDataset");
        
    //     // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
  
        var newDataSample = bellybutton_samples.filter(findSample => findSample.id == dataset);
       
        var selected_sample_otu_ids = newDataSample[0].otu_ids;
       
        var selected_sample_otu_labels = newDataSample[0].otu_labels;
      
        var selected_sample_sample_values = newDataSample[0].sample_values;
       

        //metadata 
        
        var newDataMetadata = bellybutton.metadata.filter(findSample => findSample.id == dataset);
        console.log(newDataMetadata)
        var age = newDataMetadata[0].age;
        var ethnicity = newDataMetadata[0].ethnicity;
        var gender = newDataMetadata[0].gender;
        var location = newDataMetadata[0].location;
        var washFrequency = newDataMetadata[0].wfreq;
        
        // clear demographic table
        d3.select("h3");
        d3.selectAll("panel-title");
        d3.selectAll("p").remove();

        // add demographic info to table
        d3.select("h3")
        .selectAll("panel-title")
        .data(newDataMetadata)
        .enter()
        .append("p")
        .text(function(d) {
        return `Age: ${age}`;
        });

        // add demographic info to table
        d3.select("h3")
        .selectAll("panel-title")
        .data(newDataMetadata)
        .enter()
        .append("p")
        .text(function(d) {
        return `ethnicity: ${ethnicity}`;
        });


        // add demographic info to table
        d3.select("h3")
        .selectAll("panel-title")
        .data(newDataMetadata)
        .enter()
        .append("p")
        .text(function(d) {
        return `Gender: ${gender}`;
        });


        // add demographic info to table
        d3.select("h3")
        .selectAll("panel-title")
        .data(newDataMetadata)
        .enter()
        .append("p")
        .text(function(d) {
        return `Location: ${location}`;
        });


        // add demographic info to table
        d3.select("h3")
        .selectAll("panel-title")
        .data(newDataMetadata)
        .enter()
        .append("p")
        .text(function(d) {
        return `Wash Frequency: ${washFrequency}`;
        });

        //bar chart

        var data = [{
            type: 'bar',
            text: selected_sample_otu_labels,
            y: selected_sample_otu_ids.slice(0,10).reverse(),
            x: selected_sample_sample_values.slice(0,10).reverse(),
            orientation: 'h'
          }];
          

        var layout = {
        title: 'Top 10 OTUs for selected sample',
        xaxis1: {
            title: {
                text: 'Sample Value'},
            domain: [0, 0.5],

            zeroline: true,
            showline: true,
            showticklabels: true,
            showgrid: true
        },
        yaxis: {
            title: {
                text: 'OTU ID'},
            type: 'category',
            zeroline: true,
            showline: true,
            showticklabels: true,
            showgrid: true
            
        },
        
        legend: {
            x: 0.029,
            y: 1.238,
            font: {
            size: 10
            }
        },
        margin: {
            l: 100,
            r: 20,
            t: 200,
            b: 70
        },
        width: 900,
        height: 900,
        paper_bgcolor: 'rgb(248,248,255)',
        plot_bgcolor: 'rgb(248,248,255)',
        annotations: [
            {
            xref: 'paper',
            yref: 'paper',
            x: -0.2,
            y: -0.109,
            showarrow: false,
            font:{
                family: 'Arial',
                size: 10,
                color: 'rgb(150,150,150)'
            }
            }
        ]
        };
        Plotly.newPlot('bar', data, layout);


        //bubble chart
        var log_selected_sample_sample_values = selected_sample_sample_values.map(Math.log);
        var log_selected_sample_sample_values = log_selected_sample_sample_values.map(value=>value*10);

       
        var trace1 = {
            x: selected_sample_otu_ids,
            
            y: selected_sample_sample_values,
            text: selected_sample_otu_labels,
            
            mode: 'markers',
            marker: {
            size: log_selected_sample_sample_values,
                
              }
            }
          
          
        var data = [trace1];
        
        var layout = {
        title: 'All OTU IDs and Sample Values for Selected Sample',
        showlegend: false,
        height: 600,
        width: 600,
        xaxis: {
            title: {
              text: 'OTU ID',
            
            },
          },
          yaxis: {
            title: {
              text: 'Sample Value',
             }}
        };
        
        Plotly.newPlot('bubble', data, layout);

    
  
        //getData closing parentheses
        }
    
    getData()
    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);




});

init();
