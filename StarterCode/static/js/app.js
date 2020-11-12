
d3.json('samples.json').then (sampleData =>{

    console.log(sampleData.samples[0].otu_ids.slice(0,10));
    console.log(sampleData.samples[0].sample_values.slice(0,10));

});