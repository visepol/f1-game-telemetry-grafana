import { F1TelemetryClient, constants } from "@racehub-io/f1-telemetry-client";
import { inspect } from "util";
// or: const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

const logPacket = (label: string) => (data: unknown) => {
	console.log(`[${label}]`, inspect(data, { depth: null, maxArrayLength: null, breakLength: Infinity }));
};

/*
*   'port' is optional, defaults to 20777
*   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
*                   defaults to true
*   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
*                   defaults to undefined
*   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
*                   defaults to false
*/
const client = new F1TelemetryClient({ port: 20777 });
client.on(PACKETS.event, logPacket("event"));
client.on(PACKETS.motion, logPacket("motion"));
client.on(PACKETS.carSetups, logPacket("carSetups"));
client.on(PACKETS.lapData, logPacket("lapData"));
client.on(PACKETS.session, logPacket("session"));
client.on(PACKETS.participants, logPacket("participants"));
client.on(PACKETS.carTelemetry, logPacket("carTelemetry"));
client.on(PACKETS.carStatus, logPacket("carStatus"));
client.on(PACKETS.finalClassification, logPacket("finalClassification"));
client.on(PACKETS.lobbyInfo, logPacket("lobbyInfo"));
client.on(PACKETS.carDamage, logPacket("carDamage"));
client.on(PACKETS.sessionHistory, logPacket("sessionHistory"));
client.on(PACKETS.tyreSets, logPacket("tyreSets"));
client.on(PACKETS.motionEx, logPacket("motionEx"));

// to start listening:
client.start();

// and when you want to stop:
//client.stop();