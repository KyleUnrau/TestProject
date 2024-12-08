import { createLibp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
var BootstrapAddresses = {
    listen: ["/ip4/127.0.0.1/tcp/8000/ws"]
};
const Node = await createLibp2p({ start: false, addresses: BootstrapAddresses, transports: [webSockets()], connectionEncrypters: [noise()], streamMuxers: [yamux()] });
await Node.start();
console.log("Libp2p has started");
const ListenAddresses = Node.getMultiaddrs();
console.log("Libp2p is listening on the following addresses: " + ListenAddresses);
await Node.stop();
console.log("Libp2p has stopped");
