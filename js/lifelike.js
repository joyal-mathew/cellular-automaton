"use strict";

function Lifelike(rules, cellsWidth, cellsHeight) {
    return {
        colorTable: [
            [255, 255, 255],
            [0, 0, 0],
        ],

        init(cells) {
            for (let i = 0; i < cells.length; ++i) {
                if (Math.random() < rules.occurrence) {
                    const x = i % cellsWidth;
                    const y = i / cellsWidth | 0;

                    for (let dx = 0; dx < rules.size; ++dx) {
                        for (let dy = 0; dy < rules.size; ++dy) {
                            const j = mod(x + dx, cellsWidth) + mod(y + dy, cellsHeight) * cellsWidth;
                            cells[j] = 1;
                        }
                    }
                }
            }
        },

        update(cells) {
            for (let i = 0; i < cells.length; ++i) {
                const x = i % cellsWidth;
                const y = i / cellsWidth | 0;

                let neighborCount = 0;

                for (let dx = -1; dx <= 1; ++dx) {
                    for (let dy = -1; dy <= 1; ++dy) {
                        const j = mod(x + dx, cellsWidth) + mod(y + dy, cellsHeight) * cellsWidth;
                        if ((dx || dy) && cells[j] % 2) {
                            neighborCount += 1;
                        }
                    }
                }

                if (cells[i] == 1 && !rules.survive.includes(neighborCount)) {
                    cells[i] = 3;
                }
                else if (cells[i] == 0 && rules.birth.includes(neighborCount)) {
                    cells[i] = 2;
                }
            }

            for (let i = 0; i < cells.length; ++i) {
                if (cells[i] > 1) {
                    cells[i] = (cells[i] + 1) % 2;
                }
            }
        },
    };
}

function randomLifelike() {
    let birth = [...Array(9).keys()];
    let survive = [...Array(9).keys()];

    for (let i = 8; i >= 1; --i) {
        const j1 = Math.floor(Math.random() * (i + 1));
        const j2 = Math.floor(Math.random() * (i + 1));
        [birth[j1], birth[i]] = [birth[i], birth[j1]];
        [survive[j2], survive[i]] = [survive[i], survive[j2]];
    }

    birth = birth.slice(Math.floor(Math.random() * 10));
    survive = survive.slice(Math.floor(Math.random() * 10));
    birth.sort();
    survive.sort();

    return JSON.stringify({
        occurrence: Math.floor(Math.random() * 10) / 10,
        size: Math.floor(Math.random() * 3) + 1,
        birth,
        survive,
    }, (_, v) => v instanceof Array ? JSON.stringify(v) : v, 2).replace(/\\/g, '')
                                                                .replace(/\"\[/g, '[')
                                                                .replace(/\]\"/g,']');
}
