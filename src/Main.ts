import {createLibp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { kadDHT } from "@libp2p/kad-dht";
import { bootstrap } from "@libp2p/bootstrap";

const Node = await createLibp2p({
    start: false,
    addresses: {
        listen: ["/ip4/0.0.0.0/tcp/0/ws"]
    }, transports: [webSockets()],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()]
});

await Node.start();
console.log("Libp2p has started");

const ListenAddresses = Node.getMultiaddrs();
console.log("Libp2p is listening on the following addresses: " + ListenAddresses);

await Node.stop();
console.log("Libp2p has stopped");