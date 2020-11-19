function getPlots(id) {

    d3.json("samples.json").then((data) =>{
        // call data for samples
        var samples = data.samples;
        // filter data per id
        var filter = samples.filter(sampleObj => sampleObj.id == id);
        // Pull the first result
        var result = filter[0]
        // checks result in consol
        console.log(result);
        // x values
        var sample_values = result.sample_values;
        // y values
        var otu_ids = result.otu_ids;
        // y labels
        var otu_labels = result.otu_labels;

        // Bar Graph data
        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            marker:{
                color: 'babyblue'},
            type: "bar",
            orientation: "h"
            };
        // check for correct data
        console.log(`${sample_values.slice(0,10).reverse()}`);
        console.log(`${otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse()}`);

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        }
        // Graph bar graph
        Plotly.newPlot("bar", data, layout);

        // Bubble Plot
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        },
        text: otu_labels
    };
        // set the layout for the bubble plot
        var layout1 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
    };
        // Data Variable
        var data1 = [trace1];

        // Graph bubble plot
        Plotly.newPlot("bubble", data1, layout1);

    })
};


// Pull Necessary Data
function getDemoInfo(id) {
    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        // console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}


// Change event when id changes
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
};


// Starter Preview for when localhost is booted
function init() {
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");

    // Read data
    d3.json("samples.json").then((data)=> {
        // console.log(data)

        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        })

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
        
    })
}

// Call init function
init();