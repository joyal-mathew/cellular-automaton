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
