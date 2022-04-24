const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const opentelemetry = require('@opentelemetry/api');
const fs = require('fs')

// Configure tracer for experiment v3
const BATCH = 1
const  DISK = 0

const provider = new BasicTracerProvider();

// Configure span processor to send spans to the exporter.
// This is configured via environment variables.
let spanExporter;
if (!DISK) {
    console.log(`Using STDOUT, DISK=${process.env["DISK"]}`)
    spanExporter = new ConsoleSpanExporter();
} else {
    console.log(`Using file, DISK=${process.env["DISK"]}`)
    spanExporter = {
        export: (spans) => {
            fs.appendFileSync("./output.txt", spans.map(JSON.stringify).join("\n"))
        }
    };
}

let spanProcessor;
if (BATCH) {
    spanProcessor = new BatchSpanProcessor(spanExporter, {maxQueueSize: 1000})
} else {
    spanProcessor = new SimpleSpanProcessor(spanExporter)
}



provider.addSpanProcessor(spanProcessor);
provider.register();

// This is what we'll access in all instrumentation code
exports.tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');