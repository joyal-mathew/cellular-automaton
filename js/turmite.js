"use strict";

function Turmite(rule, cellsWidth, cellsHeight) {
    const pos = { x: cellsWidth / 2 | 0, y: cellsHeight / 2 | 0 };
    const dir = { x: 0, y: 1 };

    let state = 0;

    return {
        colorTable: rule.colorTable,

        init() {

        },

        update(cells) {
            const cellIndex = pos.x + pos.y * cellsWidth;
            const transition = rule.transitionTable[state][cells[cellIndex]];

            cells[cellIndex] = transition.write;
            state = transition.state;

            switch (transition.turn) {
                case "CW":
                    [dir.x, dir.y] = [dir.y, -dir.x];
                    break;
                case "CCW":
                    [dir.x, dir.y] = [-dir.y, dir.x];
                    break;
                case "UT":
                    [dir.x, dir.y] = [-dir.x, -dir.y];
                    break;
            }

            pos.x = mod(pos.x + dir.x, cellsWidth);
            pos.y = mod(pos.y + dir.y, cellsHeight);
        },
    };
}

function randomTurmite() {
    const states = Array(1 + Math.floor(Math.random() * 8)).fill().map(() => []);
    const alphabet = [...Array(1 + Math.floor(Math.random() * 8)).keys()];
    const colorTable = Array(alphabet.length).fill().map(() => randomColor());
    const transitionTable = [];
    const turns = [ "CW", "CCW", "UT" ];

    for (let i = 0; i < states.length; ++i) {
        const stateTable = [];
        for (let j = 0; j < alphabet.length; ++j) {
            stateTable.push({
                write: Math.random() * alphabet.length | 0,
                turn: turns[Math.random() * turns.length | 0],
                state: Math.random() * states.length | 0,
            });
        }
        transitionTable.push(stateTable);
    }

    return JSON.stringify({
        colorTable,
        transitionTable,
    }, (_, v) => v instanceof Array ? JSON.stringify(v) : v, 2).replace(/\"\[/g, '[')
                                                                .replace(/\]\"/g,']')
                                                                .replace(/\\\"/g,'"');
}

function randomColor() {
    return Array(3).fill().map(() => Math.random() * 256 | 0);
}
