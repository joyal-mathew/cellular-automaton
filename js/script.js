"use strict";

const turmitePresets = [
    `
{
    "colorTable": [ [255, 255, 255], [0, 0, 0] ],
    "transitionTable": [
        [ { "write": 1, "turn": "CW", "state": 0 }, { "write": 0, "turn": "CCW", "state": 0 } ]
    ]
}
    `,
    `
{
    "colorTable": [ [255, 255, 255], [0, 0, 0] ],
    "transitionTable": [
        [ { "write": 1, "turn": "CW", "state": 0 }, { "write": 1, "turn": "CW", "state": 1 } ],
        [ { "write": 0, "turn": "N", "state": 0 }, { "write": 0, "turn": "N", "state": 1 } ]
    ]
}
    `,
];

const lifelikePresets = [
    `
{
    "occurrence": 0.5,
    "size": 1,
    "birth": [3],
    "survive": [2, 3]
}
    `,
    `
{
    "occurrence": 0.0001,
    "size": 3,
    "birth": [1, 3, 5, 7],
    "survive": [1, 3, 5, 7]
}
    `,
];

window.onload = () => {
    const canvas = document.getElementById("display");
    const turmiteStart = document.querySelector("#turmite .start");
    const lifelikeStart = document.querySelector("#lifelike .start");
    const turmiteRules = document.querySelector("#turmite .rules");
    const lifelikeRules = document.querySelector("#lifelike .rules");

    document.querySelector("#lifelike .random").onclick = () => {
        lifelikeRules.value = randomLifelike();
    };

    for (const element of document.getElementsByClassName("automaton")) {
        const show = document.querySelector(`#${element.id} .show`);
        const hide = document.querySelector(`#${element.id} .hide`);

        hide.style.display = "none";

        show.onclick = () => {
            if (hide.style.display == "none") {
                hide.style.display = "block";
            }
            else {
                hide.style.display = "none";
            }
        }
    }

    for (const preset of document.querySelectorAll("#turmite .preset")) {
        let value = turmitePresets.shift();
        preset.onclick = () => {
            turmiteRules.value = value;
        };
    }

    for (const preset of document.querySelectorAll("#lifelike .preset")) {
        let value = lifelikePresets.shift();
        preset.onclick = () => {
            lifelikeRules.value = value;
        };
    }

    canvas.style.display = "none";

    let stop = null;

    addEventListener("keyup", e => {
        if (e.code === "Escape") {
            if (stop) {
                stop();
                stop = null;
            }
        }
    });

    turmiteStart.onclick = () => {
        stop = start(Turmite(JSON.parse(turmiteRules.value), innerWidth, innerHeight), innerWidth, innerHeight);
    };

    lifelikeStart.onclick = () => {
        stop = start(Lifelike(JSON.parse(lifelikeRules.value), innerWidth, innerHeight), innerWidth, innerHeight);
    };
};
