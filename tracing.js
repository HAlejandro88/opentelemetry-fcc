const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");


const zipkinExporter = new ZipkinExporter({
    url: 'http://localhost:9411/api/v2/spans', // Cambia la URL por la dirección de tu servidor Zipkin,
    serviceName: 'get-date'
});

const sdk = new NodeSDK({
  traceExporter: zipkinExporter,
  serviceName: 'get-date',
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter()
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk
  .start()