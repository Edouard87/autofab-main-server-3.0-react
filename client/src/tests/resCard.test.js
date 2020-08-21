import React from "react"
import ReservationCard from "../components/reservation/ReservationCard"
import ReactTestRenderer from "react-test-renderer"
import timekeeper from "timekeeper"

let testRes = {};

beforeAll(() => {
    /**
     * Initialize a test reservation
     */
    testRes = {
        "blocks": [
            10
        ],
        "_id": "5f3efe317155682b90f6ab4c",
        "user": "5f0b6b473a084ccbe13f4046",
        "date": "08-20-2020",
        "machine": {
            "tags": [],
            "_id": "5f0b6b473a084ccbe13f404c",
            "name": "Your First Machine",
            "type": {
                "_id": "5f0b6b473a084ccbe13f404b",
                "name": "Laser Cutter",
                "__v": 0
            },
            "status": 0,
            "__v": 0
        },
        "description": "blah blah blah",
        "status": 0,
        "start": 1597932000000,
        "end": 1597935600000,
        "start_expires": 1597932600000,
        "end_expires": 1597936200000,
        "cancel_expires": 1597845600000,
        "__v": 0
    }
})
test("The user has made a reservation but it has yet to start", () => {
    /**
     * The user has made a reservation and everything is good. They
     * should see the Scheduled card as their reservation has
     * yet to start.
     * 
     * Note that timekeeper also works
     * in this particular situation. In other words,
     * it is possible for you to mock tests on both ends!
     */
    timekeeper.freeze(1497932000000); // Freeze at before the start of the reservation
    const renderer = ReactTestRenderer.create(
        <ReservationCard reservation={testRes} />
    );
    let tree = renderer.toJSON();
    expect.stringMatching(tree.props.className, /scheduled/);
});

test("The user has made a reservation and should mark it ASAP ", () => {
    /**
     * The user has made a reservation and it is now about
     * time for it to start. That said, they must still confirm
     * it. They should see the 'starting' card
     */
    timekeeper.freeze(1597932000000);
    const renderer = ReactTestRenderer.create(
        <ReservationCard reservation={testRes} />
    );
    let tree = renderer.toJSON();
    expect.stringMatching(tree.props.className, /starting/);
});

test("The user has made a reservation and has marked it as such.  ")

// it("")

