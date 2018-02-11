import {WorkerInputType, WorkerInput, WorkerResponse, WorkerResponseType, WorkerMode} from '../../types/worker'
import {Helpers} from '../common/helpers'

const sendMessage: any = self.postMessage;

class PrimeWorker {
    private currentPosition = 0;
    private currentPrime = 1;
    private targetPosition = 0;
    private active = false;

    private clear() {
        this.currentPosition = 0;
        this.currentPrime = 1;
        this.targetPosition = 0;
        this.active = false;

        Helpers.clearCache();
    }

    public sendStatus() {
        sendMessage({
            type: WorkerResponseType.status,
            data: (this.active ? {
                active: true,
                position: this.currentPosition,
                prime: this.currentPrime,
                percentage: Math.floor(this.currentPosition / this.targetPosition * 100)
            } : {
                active: false
            })
        } as WorkerResponse);
    }

    public calculate(numOfPrime: number) {
        this.clear();

        this.active = true;
        this.targetPosition = numOfPrime;

        while (this.currentPosition !== numOfPrime) {
            this.currentPrime = Helpers.calculatePrime(this.currentPrime);
            this.currentPosition++;

            if (this.mode === WorkerMode.log) {
                this.sendStatus();
            }
        }

        return this.currentPrime;
    }

    public mode = null as WorkerMode;
}

const worker = new PrimeWorker();

self.addEventListener('message', message => {
    let eventData = <WorkerInput>message.data;
    switch (eventData.type) {
        case WorkerInputType.start:
            worker.mode = eventData.arg.mode;
            const result = worker.calculate(eventData.arg.position);

            sendMessage({
                type: WorkerResponseType.calculated,
                data: {
                    result
                }
            } as WorkerResponse);
            break;
    }
});