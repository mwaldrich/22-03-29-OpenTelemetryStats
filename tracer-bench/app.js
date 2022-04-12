'use strict';

const { tracer } = require('./tracing')
const { rdtsc } = require('rdtsc')


// warm()
bench()

function warm() {
    for (let i = 0; i < 1000; i += 1) {
        doWork();
    }
}

function bench() {
    for (let i = 0; i < 1000; i++) {
        const {cycles, ms} = doWork()

        console.error(`${cycles},${ms}`)
    }
}

function doWork() {
    const before_time = performance.now()
    const before_cycles = rdtsc()
    const parentSpan = tracer.startSpan('main')
    parentSpan.end()
    const after_cycles = rdtsc()
    const after_time = performance.now()

    console.log(`rdtsc overhead: ${rdtsc() - rdtsc()}`)
    console.log(`wall time overhead: ${performance.now() - performance.now()}`)

    const elapsed_cycles = after_cycles-before_cycles
    const elapsed_time = after_time-before_time
    console.log(`CPU Cycles: ${elapsed_cycles}`)
    console.log(`Wall time: ${elapsed_time}ms`)

    return {cycles: elapsed_cycles, ms: elapsed_time}
}