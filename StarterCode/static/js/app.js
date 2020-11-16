// d3.json('samples.json').then(function(sampleData){

//     var nameIds = sampleData.names;
//     console.log(sampleData.samples[0].otu_ids.slice(0,10));
//     console.log(sampleData.samples[0].sample_values.slice(0,10));

// });


function getPlots(id) {

    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        
        var otuIds = sampledata.samples[0].otu_ids;
        console.log(otuIds)
        
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10);
        console.log(sampleValues)

        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)

        var otuTop = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();

        var otuId = otuTop.map(d => "OTU " + d);
        console.log(`otu ids: ${otuId}`)

        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`otu labels: ${labels}`)

        var trace = {
            x: sampleValues,
            y: otuId,
            text: labels,
            marker:{
                color: 'babyblue'},
            type: "bar",
            orientation: "h"
            };
        
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
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
        marker: {
            size: sampledata.samples[0].sample_values,
            color: sampledata.samples[0].otu_ids
        },
        text: sampledata.samples[0].otu_labels
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
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}


// Change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
    console.log(id)
};


// Starter Preview
function init() {
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");

    // Read data
    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        })

        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
        
    })
}

// Call init function
init();