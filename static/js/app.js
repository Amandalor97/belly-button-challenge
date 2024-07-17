// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
console.log(data.names);
    // Get the names field
    const names= data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdownEl = d3.select('#selDataset')
    
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
   for (const name of names) {
    dropdownEl.append('option').text(name)
   }
    

    // Get the first sample from the list
    const firstname = names[0]

    // Build charts and metadata panel with the first sample
   optionChanged(firstname)
  });
}

// Function for event listener
function optionChanged(newSample) {
//   // Build charts and metadata panel each time a new sample is selected
console.log(newSample);
buildMetadata(newSample)
buildCharts(newSample)
}


// Build the metadata panel
function buildMetadata(newSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
console.log('metaData:',newSample)


    // get the metadata field
    let metadata = data.metadata
    console.log(metadata)
    // Filter the metadata for the object with the desired sample number
    let desiredobject = metadata.find(object => object.id == newSample)
    console.log(desiredobject)

    // Use d3 to select the panel with id of `#sample-metadata`
    const samplemetadata = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    samplemetadata.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    let keys = Object.keys(desiredobject)
    let values = Object.values(desiredobject)
    for (let i = 0; i<keys.length; i++) {
      let key = keys[i]
      let value = values[i]
      samplemetadata.append('li').text(`${key}: ${value}`).attr("list-group-item")
    }
  });
}


// function to build both charts
function buildCharts(newSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
console.log('Charts:',newSample)
    // Get the samples field
let samples = data.samples
console.log(samples)
//     // Filter the samples for the object with the desired sample number
let chartsample = samples.find(sampledata => sampledata.id == newSample)
console.log(chartsample)
    // Get the otu_ids, otu_labels, and sample_values
let otu_ids = chartsample.otu_ids
let otu_labels = chartsample.otu_labels
let sample_values = chartsample.sample_values
    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
      },
      text: otu_labels
    };
    
    let databubble = [trace1];
    
    let layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
      title: 'OTU ID'},
      yaxis: {
      title: 'Number of bacteria'},
      height: 600,
      width: 1000
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', databubble, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let xbar = sample_values.slice(0,10).reverse()
    let ybar = otu_ids.slice(0,10).reverse()
    console.log(xbar)
    console.log(ybar)

  let ylabels = ybar.map(function(element) {
    return "OTU" + element;
    });
    console.log(ylabels);
    
    let trace2 = {
      type: 'bar',
      x: sample_values.slice(0,10).reverse(),
      y: ylabels,
      text: otu_labels.slice(0,10).reverse(),
      orientation: 'h'
    };

    let databar = [trace2]

    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
      title: 'Number of Bacteria'},
    }

    // Render the Bar Chart
    Plotly.newPlot('bar', databar, layout2);
  });
}



// Initialize the dashboard
init();
