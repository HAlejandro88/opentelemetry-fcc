
const { MeterProvider } = require('@opentelemetry/metrics')
const {PrometheusExporter} = require('@opentelemetry/exporter-prometheus')

const prometheusPort = PrometheusExporter.DEFAULT_OPTIONS.port
const prmetheusEndpoint = PrometheusExporter.DEFAULT_OPTIONS.endpoint

const exporter = new PrometheusExporter({startServer: true}, () => {
    console.log(`prometheus scrape endpoint http://${prometheusPort}${prmetheusEndpoint}`)
})

const meter = new MeterProvider().getMeter('your-meter-name')

const requestCount = meter.createCounter("requests", {
    exporter,
    interval: 1000,
    description: "Count all incoming requests"
})

const boundInstruments = new Map();

module.exports.countAllrequests = () => {
    return (req,res,next) => {
        if(!boundInstruments.has(req.path)) {
            const labels = {route: req.path}
            const boundCounter = requestCount.bind(labels)
            boundInstruments.set(req.path, boundCounter)
        }

        boundInstruments.get(req.path).add(1)
        next()
    }
}