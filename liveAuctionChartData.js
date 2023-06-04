import Chart from "chart.js/auto"

const chartValues      = [];

const chartAskPrice    = [];
const chartAskSize     = [];
const chartBidPrice    = [];
const chartBidSize     = [];
const chartTimeStamp   = [];


const config = {
    type: "line",
    data: {
        labels: [],
        datasets: [
            { label: "Ask Price",
              data: chartAskPrice },
            { label: "Ask Size",
              data: chartAskSize },
            { label: "Bid Price",
              data: chartBidPrice }
            { label: "Bid Size",
              data: chartBidSize }
        ],
    }
};

const context = document.getElementById("chart");

const chart  = new Chart(context, config);

const source = new EventSource("api.guyyatsu.me/btc-usd/live-auctions");

source.onmessage = function (event) {
    const data = JSON.parse(event.data);
    if (config.data.labels.length === 20) {
        config.data.labels.shift();
        config.data.datasets[0].data.shift();
    }
    config.data.labels.push(data.time);
    config.data.datasets[0].data.push(data.value);
    lineChart.update();
}
