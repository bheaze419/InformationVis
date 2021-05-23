//layout and config taken from week 9 studio
const config = {
    displayModeBar: true,
    responsive: true
}

var layout1 = {
    title: 'Child mortality Baltic States and surrounding countries (1965-2017) - (2017-2023) prediction',
    colorway: ['#0072ce', '#117acf', '#003580', '#fff000', '#d52b1e', '#8a1e16', '#059033', '#355a20'],
    // shapes: [
    //     // 1st highlight during Feb 4 - Feb 6
    //     {
    //         type: 'rect',
    //         // x-reference is assigned to the x-values
    //         xref: 'x',
    //         // y-reference is assigned to the plot paper [0,1]
    //         yref: 'paper',
    //         x0: '1950',
    //         y0: '.09',
    //         x1: '2020',
    //         y1: '.9',
    //         fillcolor: '#d3d3d3',
    //         opacity: 1,
    //         line: {
    //             width: 0
    //         }
    //     }
    // ],

    xaxis: {
        autorange: true,
        range: ['2015', '2020'],
        rangeselector: {
            buttons: [{
                    count: 10,
                    label: '10y',
                    step: 'year',
                    stepmode: 'backward'
                },
                {
                    count: 25,
                    label: '25y',
                    step: 'year',
                    stepmode: 'backward'
                },
                {
                    count: 50,
                    label: '50y',
                    step: 'year',
                    stepmode: 'backward'
                },
                {
                    step: 'all'
                }
            ]
        },
        rangeslider: {
            range: ['2015-02-17', '2017-02-10']
        },
        type: 'date',
        showspikes: true,
        spikemode: 'across',
        spikecolor: '#333',
        spikesides: true,
        spikethickness: 2
    },
    yaxis: {
        autorange: true,
        type: 'linear'
    }
}

//Plotly.d3.csv("mortality.csv", function(rows));{
const plot1Div = document.getElementById("vis1");
const plot2Div = document.getElementById("vis2");
const plot3Div = document.getElementById("vis3");
var state = "Estonia";
var round = false;
counter = 0;
for (let x = 0; x < 4; x++) {
    // console.log(state + x);
    switch (state) {
        case 'Estonia':
            round = true;
            Plotly.d3.csv("mortality.csv", plotski);
            break;
            // case 'Russia':
            //     console.log(round + state + counter);
            //     Plotly.d3.csv("mortality.csv", plotski);
            //     //Plotly.newPlot('vis1', skrt, layout1, config);
            //     //var skrt3 = [skrt, skrt1];
            //     break;
        case 'Finland':
            console.log(state + counter);
            Plotly.d3.csv("mortality.csv", plotski);
            break;
        case 'Ukraine':
            console.log(state + counter);
            Plotly.d3.csv("mortality.csv", plotski);
            break;
        case 'Russia':
            console.log(state + counter);
            Plotly.d3.csv("mortality.csv", plotski);
            break;
        case 'Baltic states':
            console.log(state + counter);
            Plotly.d3.csv("mortality.csv", plotski);

    }
    //Plotly.newPlot('vis1', skrt3);

    function plotski(csv_data) {
        console.log(state + counter + round);
        let country_data = csv_data.filter(d => d.country == state);
        let mortality_data = country_data.map(d => Number(d.mortality))
        let min_mortality = Math.min(...mortality_data)
        let max_mortality = Math.max(...mortality_data)

        //This regression library needs values stored in arrays
        //We are using the strech function to normalise our data
        let regression_data = country_data.map(d => [stretch(d.year, 1965, 2017, 0, 1),
            stretch(d.mortality, min_mortality, max_mortality, 0, 1)
        ])
        //Here is where we train our regressor, experiment with the order value
        let regression_result = regression.polynomial(regression_data, {
            order: 4
        });
        let extension_x = [];
        let extension_y = [];
        for (let year = 2017; year < 2025; year++) {
            //We've still got to work in the normalised scale
            let prediction = regression_result.predict(stretch(year, 1950, 2017, 0, 1))[1]

            extension_x.push(year);
            //Make sure to un-normalise for displaying on the plot
            extension_y.push(stretch(prediction, 0, 1, min_mortality, max_mortality));
        }

        var trace1 = [{
                x: country_data.map(d => d.year),
                y: country_data.map(d => d.mortality),
                mode: "lines",
                name: state + " child mortality"
            },
            {
                x: extension_x,
                y: extension_y,
                mode: "lines",
                name: state + " child mortality prediciton"
            }
        ]
        console.log(trace1 + state);
        switch (counter) {
            // case 0:
            //     Plotly.newPlot('vis1', trace1, layout1, config);
            //     state = "Russia";
            //     break;
            case 0:
                Plotly.newPlot('vis1', trace1, layout1, config);

                state = "Finland";
                break;
            
            case 1:
                Plotly.addTraces('vis1', trace1);
                state = "Russia";
                break;
            case 2:
                Plotly.addTraces('vis1', trace1);
                //Baltic states takes from average of Estonia, Latvia, Lithuania 
                state = "Baltic states";
                break;
            case 3:
                Plotly.addTraces('vis1', trace1);
                break;
            case 4:
                var traceAnn = {
                    x: [1990, 1990],
                    y: [0, 60],
                    mode: 'lines+markers+text',
                    name: 'Lines, Markers and Text',
                    text: ['End of Soviet Occupation Of Baltic Sates'],
                    textposition: 'top',
                    type: 'scatter'
                };
                var annTrace = [traceAnn];
                Plotly.addTraces('vis1', annTrace);
        }
        counter++;
        console.log(counter + state);
    }
    

    //This stretch function is actually just the map function from p5.js
    function stretch(n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    };
    //unpack function taken from week 9 lecture
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }
}