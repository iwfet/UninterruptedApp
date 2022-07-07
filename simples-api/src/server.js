import { Console } from 'console'
import http from 'http'



const processId = process.pid

const server = http.createServer((req,res)=>{
    for(let index = 0; index <1e7; index++)
    res.end(`handled by pi: ${processId}`)

})

server.listen(5000).
once('listening', ()=>{console.log('Server start in process',processId);})

process.on('SIGTERM',()=>{
    Console.log("server ending",new Date().toISOString())
    server.close(()=>process.exit())
})