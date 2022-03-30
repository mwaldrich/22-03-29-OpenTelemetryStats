const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const opentelemetry = require('@opentelemetry/api');

const provider = new BasicTracerProvider();

// Configure span processor to send spans to the exporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

// This is what we'll access in all instrumentation code
exports.tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');