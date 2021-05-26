// parts layout and config taken from week 9 studio video
const config = {
    displayModeBar: true,
    responsive: true
}
var layout1 = {
    title: 'Child mortality, Baltic States vs. Russia (1965-2017) - (2017-2023) prediction',
    colorway: ['#0072ce', '#fff000', '#d52b1e', '#8a1e16', '#059033', '#355a20'],
    xaxis: {
        title: 'Years',
        range: ['1980-01-01', '2025-01-01'],
        type: 'date'
    },
    yaxis: {
        title: 'Child mortality as % of 1000 births',
        //autorange: true,
        type: 'linear',
        //fixedrange: false,
        range: [0, 35]
    }
}

var layout2 = {
    title: 'Child mortality, Baltic States vs Finland (2000-2017) - (2017-2023) prediction',
    colorway: ['#0072ce', '#117acf', '#003580', '#fff000', '#d52b1e', '#8a1e16', '#059033', '#355a20'],

    xaxis: {
        title: 'Years',
        range: ['2000-01-01', '2025-01-01'],
        type: 'date'
    },

    yaxis: {
        title: 'Child mortality as % of 1000 births',
        range: [0, 16],
       // autorange: true,
        type: 'linear'
        //fixedrange: false
    }
}
var layout3 = {
    title: 'Life expetancy 1990-2017',
    colorway: ['#0072ce',  '#003580',  '#d52b1e', '#8a1e16', '#059033', '#355a20'],

    xaxis: {
        title: 'Years',
        range: ['1990-01-01', '2019-01-01'],
        type: 'date'
    },

    yaxis: {
        title: 'Life expetancy in years',
        range: [60, 80],
        //autorange: true,
        type: 'linear'
    }
}
var layout4 = {
    title: 'Child mortality, Baltic States vs. Russia (2010-2017) - (2017-2023) prediction',
    colorway: ['#0072ce', '#fff000', '#d52b1e', '#8a1e16', '#059033', '#355a20'],
    xaxis: {
        title: 'Years',
        range: ['2010-01-01', '2025-01-01'],
        type: 'date'
    },
    yaxis: {
        title: 'Child mortality as % of 1000 births',
        //autorange: true,
        type: 'linear',
        //fixedrange: false,
        range: [0, 12]
    }
}
const plot1Div = document.getElementById("vis1");
const plot2Div = document.getElementById("vis2");
const plot3Div = document.getElementById("vis3");
const plot4Div = document.getElementById("vis4");

//joel (tutor) helped me with the below funcitons
function plotski(csv_data) {
    var estonia_trace = regressiontoTrace(csv_data, 'Estonia');
    var latvia_trace = regressiontoTrace(csv_data, 'Latvia');
    var lithuania_trace = regressiontoTrace(csv_data, 'Lithuania');
    var russia_trace = regressiontoTrace(csv_data, 'Russia');
    var baltic_trace = regressiontoTrace(csv_data, 'Baltic states');
    var annTxt1 = annotate();
    var annTxt2 = annotate1();
    var annTxt3 = annotate2();
    Plotly.newPlot('vis1', estonia_trace, layout1, config, {scrollZoom: true});
    Plotly.addTraces('vis1', russia_trace);
    Plotly.addTraces('vis1', baltic_trace);    
    Plotly.addTraces('vis1', latvia_trace);
    Plotly.addTraces('vis1', lithuania_trace);
    Plotly.addTraces('vis1', annTxt1);
    Plotly.addTraces('vis1', annTxt2);
    Plotly.addTraces('vis1', annTxt3);
    
    
    
}
//plotting second graph
function plotski2(csv_data) {
    var estonia_trace = regressiontoTrace(csv_data, 'Estonia');
    var finland_trace = regressiontoTrace(csv_data, 'Finland');
    var latvia_trace = regressiontoTrace(csv_data, 'Latvia');
    var lithuania_trace = regressiontoTrace(csv_data, 'Lithuania');
    var baltic_trace = regressiontoTrace(csv_data, 'Baltic states');
    Plotly.newPlot('vis2', estonia_trace, layout2, config, {scrollZoom: true});
    Plotly.addTraces('vis2', finland_trace);
    Plotly.addTraces('vis2', baltic_trace);
    Plotly.addTraces('vis2', latvia_trace);
    Plotly.addTraces('vis2', lithuania_trace);
  //  Plotly.addTraces('vis2', russia_trace);
}
//plotting life expectancy graph
function plotski3(csv_data) {
    var estonia_trace1 = lifeExpectancy(csv_data, 'Estonia');
    //var finland_trace1 = lifeExpectancy(csv_data, 'Finland');
    var latvia_trace1 = lifeExpectancy(csv_data, 'Latvia');
    var lithuania_trace1 = lifeExpectancy(csv_data, 'Lithuania');
    var russia_trace1 = lifeExpectancy(csv_data, 'Russia');
    var baltic_trace1 = lifeExpectancy(csv_data, 'Baltic states');
    //var annTxt1 = annotate();
    Plotly.newPlot('vis3', estonia_trace1, layout3, config, {scrollZoom: true});
  //  Plotly.addTraces('vis3', finland_trace1);
    Plotly.addTraces('vis3', baltic_trace1);
    Plotly.addTraces('vis3', latvia_trace1);
    Plotly.addTraces('vis3', lithuania_trace1);
    Plotly.addTraces('vis3', russia_trace1);
}
function plotski4(csv_data) {
    var estonia_trace = regressiontoTrace(csv_data, 'Estonia');
    var latvia_trace = regressiontoTrace(csv_data, 'Latvia');
    var lithuania_trace = regressiontoTrace(csv_data, 'Lithuania');
    var russia_trace = regressiontoTrace(csv_data, 'Russia');
    var baltic_trace = regressiontoTrace(csv_data, 'Baltic states');
    Plotly.newPlot('vis4', estonia_trace, layout4, config, {scrollZoom: true});
    Plotly.addTraces('vis4', russia_trace);
    Plotly.addTraces('vis4', baltic_trace);    
    Plotly.addTraces('vis4', latvia_trace);
    Plotly.addTraces('vis4', lithuania_trace); 
    
}

//function processing mortality csv data training plotly's regression tool with countries and providing 2 plots for each country one for the actual data and another for the predicted data, ultimatly returning array to be plotted

function regressiontoTrace(csv_data, country_name) {
    console.log(country_name);
    let countryData = csv_data.filter(d => d.country == country_name);
    let mortality_data = countryData.map(d => Number(d.mortality));
    let min_mortality = Math.min(...mortality_data);
    let max_mortality = Math.max(...mortality_data);
    let regression_data = countryData.map(d => [stretch(d.year, 1980, 2017, 0, 1),
        stretch(d.mortality, min_mortality, max_mortality, 0, 1)
    ]);
    let regression_result = regression.polynomial(regression_data, {
        order: 4
    });
    let extension_x = [];
    let extension_y = [];
    for (let year = 2017; year < 2026; year++) {
        //We've still got to work in the normalised scale
        let prediction = regression_result.predict(stretch(year, 1960, 2017, 0, 1))[1]

        extension_x.push(year);
        //Make sure to un-normalise for displaying on the plot
        extension_y.push(stretch(prediction, 0, 1, min_mortality, max_mortality));
    }
    var trace = [{
            x: countryData.map(d => d.year),
            y: countryData.map(d => d.mortality),
            mode: "lines",
            name: country_name + " child mortality"
        },
        {
            x: extension_x,
            y: extension_y,
            mode: "lines",
            name: country_name + " child mortality prediction"
        }
    ];
    return trace;
}
//calling plotly D3 libary
Plotly.d3.csv("mortality.csv", plotski);
Plotly.d3.csv("mortality.csv", plotski2);
//csv data for life-expectancy.csv https://ourworldindata.org/grapher/life-expectancy?time=1980..latest&country=RUS~LVA~LTU~EST
Plotly.d3.csv("life-expectancy.csv", plotski3);
Plotly.d3.csv("mortality.csv", plotski4);
//taken from week 9 tutorial
//This stretch function is actually just the map function from p5.js
function stretch(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
//adding annotations, sadly text would not work
function annotate() {
    var traceAnn = {
        x: [1990, 1990],
        y: [0, 25],
        //mode: ['lines+text'],
        name: ["End of Soviet Occupation Of Baltic Sates"],
        text: ["End of Soviet Occupation Of Baltic Sates"],
       // textposition: ['top'],
        type: ['scatter']
    }
    return traceAnn;
}
function annotate1() {
    var traceAnn = {
        x: [2002, 2002],
        y: [0, 13],
        //mode: ['lines+text'],
        name: ["Baltic countries apply to enter EU"],
        text: ["Baltic countries apply to enter EU"],
       // textposition: ['top'],
        type: ['scatter']
    }
    return traceAnn;
}
function annotate2() {
    var traceAnn = {
        x: [2004, 2004],
        y: [0, 12],
        //mode: ['lines+text'],
        //not sure but label isn't working
        name: ["Baltic states get accepted into EU"],
        text: ["Baltic states get accepted into EU"],
       // textposition: ['top'],
        type: ['scatter']
    }
    return traceAnn;
}
//function processing lifeExpectancy csv data and returning array to be plotted
function lifeExpectancy (csv_data, country_name){
    let country_data = csv_data.filter(d => d.Country == country_name);
    let data = [{
        x: country_data.map(d => d.Year),
        y: country_data.map(d => d.Expectancy),
        mode: 'lines',
        name: country_name + " life expectancy"
    }]
    return data;

}