"use strict";

function start(automata, width, height) {
    const canvas = document.getElementById("display");
    const controls = document.getElementById("controls");
    const context = canvas.getContext("2d");
    const cells = new Array(width * height).fill(0);
    const image = context.createImageData(width, height);

    canvas.style.display = "block";
    controls.style.display = "none";
    canvas.width = width;
    canvas.height = height;

    for (let i = 3; i < image.data.length; i += 4) {
        image.data[i] = 255;
    }

    automata.init(cells);

    let updateHandle = setInterval(automata.update, 16, cells);
    let renderHandle = requestAnimationFrame(render);

    function render() {
        renderHandle = requestAnimationFrame(render);

        for (let i = 0; i < cells.length; ++i) {
            const color = automata.colorTable[cells[i]];

            image.data[i * 4 + 0] = color[0];
            image.data[i * 4 + 1] = color[1];
            image.data[i * 4 + 2] = color[2];
        }

        context.putImageData(image, 0, 0);
    }

    return () => {
        clearInterval(updateHandle);
        cancelAnimationFrame(renderHandle);

        canvas.style.display = "none";
        controls.style.display = "block";
    };
}
