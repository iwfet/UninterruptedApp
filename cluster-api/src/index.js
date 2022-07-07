import os from 'os';
import cluster from 'cluster';

const rumPrimaryProcess=()=>{
    const processesCount = os.cpus().length /2
    console.log(`Primary ${process.pid} is running on ${processesCount} cpus\n`);
    for (let index=0; index<processesCount; index++)
        cluster.fork()

    cluster.on('exit', (work,code,signal)=>{
        if (code !== 0 && !work.exitedAfterDisconnect){
            console.log(`Worker ${work.process.pid}`)
            cluster.fork()
        }
    })
    
}

const rumWorkerProcess=async()=>{
    await import("./server.js")
}


cluster.isPrimary ? rumPrimaryProcess() : rumWorkerProcess()