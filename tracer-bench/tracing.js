const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const opentelemetry = require('@opentelemetry/api');
const fs = require('fs')

// Read in environment variables for configuration
const BATCH = process.env["BATCH"] == 1
const  DISK = process.env["DISK"]  == 1

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
            console.error(`Exporting ${spans.length} span s...`)
            fs.appendFileSync("./output.txt", spans.map(JSON.stringify).join("\n"))
        }
    };
}

let spanProcessor;
if (BATCH) {
    spanProcessor = new BatchSpanProcessor(spanExporter)
} else {
    spanProcessor = new SimpleSpanProcessor(spanExporter)
}



provider.addSpanProcessor(spanProcessor);
provider.register();

// This is what we'll access in all instrumentation code
exports.tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');