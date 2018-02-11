import PrimeCalculatorWorker from 'worker-loader?name=dist/[hash].js!./workers/primeCalculator'
import {
    WorkerInputType,
    WorkerInput,
    WorkerMode,
    WorkerResponse,
    WorkerResponseType,
    StatusEntry
} from '../types/worker'
import '../css/main.css'

const primeWorker = new PrimeCalculatorWorker();
let logEntry = null as StatusEntry;
let lastStatusPercentage = 0;

primeWorker.postMessage({
    type: WorkerInputType.start,
    arg: {
        mode: WorkerMode.log,
        position: 100001
    }
} as WorkerInput);

primeWorker.addEventListener('message', (message: any) => {
    const responseData = <WorkerResponse>message.data;

    switch (responseData.type) {
        case WorkerResponseType.status:
            logEntry = responseData.data;

            if (lastStatusPercentage !== logEntry.percentage) {
                lastStatusPercentage = logEntry.percentage;

                document.getElementById('progress').style.width = `${lastStatusPercentage}%`;
                document.getElementById('progress').innerHTML = `${lastStatusPercentage}%`;
            }
            break;
        case WorkerResponseType.calculated:
            console.log('done', responseData.data.result);
            break;
    }
});

let addEntry = () => {
    document.getElementsByClassName('list').item(0).innerHTML += `<div class="entry"><div>Position: ${logEntry.position}</div><div>Num: ${logEntry.prime}</div></div>`;
};

document.getElementById('status').onclick = () => {
    addEntry();
};