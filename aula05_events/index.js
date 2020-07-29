import ev from './events.js';

ev.on("testEvent", () => {
    console.log("Ouviu Tambem");
});

ev.emit("testEvent", "evento bla bla bla");