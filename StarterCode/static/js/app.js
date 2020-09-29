//Read samples.json
    d3.json("samples.json").then(function(bellybutton) {
        var samples = bellybutton.samples.id;
        console.log(samples);
       
    });