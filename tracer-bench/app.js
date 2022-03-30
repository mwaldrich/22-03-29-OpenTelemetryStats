'use strict';

const { tracer } = require('./tracing')
const { rdtsc } = require('rdtsc')

for (let i = 0; i < 10; i += 1) {
    doWork();

    for (let i = 0; i < 1_000_000; i++) {
        /* no-op */
    }
}

function doWork() {
    const before = rdtsc()
    const parentSpan = tracer.startSpan('main')
    parentSpan.end()
    const after = rdtsc()

    console.log(`CPU Cycles: ${after-before}`)
}