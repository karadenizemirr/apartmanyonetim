// sparklines
$(document).ready(function() {
   
    var randomizeArray = function (arg) {
        var array = arg.slice();
        var currentIndex = array.length,
        temporaryValue, randomIndex;
  
        while (0 !== currentIndex) {  
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }  
        return array;
    }

    // data for the sparklines that appear below header area
    var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

    // topb big chart    
    var spark1 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
            enabled: true
            },
        },
        stroke: {
            width: 2
        },
        series: [{
            data: randomizeArray(sparklineData)
        }],
        colors: ['#DCE6EC'],
        title: {
            text: '$424,652',
            offsetX: 0,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Sales',
            offsetX: 0,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    var spark1 = new ApexCharts(document.querySelector("#apexspark1"), spark1);
    spark1.render();
    
    var spark2 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
            enabled: true
            },
        },
        stroke: {
            width: 2
        },
        series: [{
            data: randomizeArray(sparklineData)
        }],
        colors: ['#DCE6EC'],
        title: {
            text: '$235,312',
            offsetX: 0,
            style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Expenses',
            offsetX: 0,
            style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    var spark2 = new ApexCharts(document.querySelector("#apexspark2"), spark2);
    spark2.render();
    
    var spark3 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
            enabled: true
            },
        },
        stroke: {
            width: 2
        },
        colors: ['#6435c9'],
        series: [{
            data: randomizeArray(sparklineData)
        }],
        xaxis: {
            crosshairs: {
            width: 1
            },
        },
        title: {
            text: '$135,965',
            offsetX: 0,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Profits',
            offsetX: 0,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    var spark3 = new ApexCharts(document.querySelector("#apexspark3"), spark3);
    spark3.render();
});