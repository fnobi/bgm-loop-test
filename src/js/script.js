import { Howl } from 'howler';

const dom = {
    button: document.querySelector('#button'),
    time: document.querySelector('#time')
};

const sound = new Howl({
    src: [ '/8bit18.mp3' ],
    loop: true
});

let flag = false;

function loop () {
    const seconds = sound.seek();
    const duration = sound.duration();
    if (!isNaN(seconds)) {
        dom.time.innerHTML = `${Math.floor(seconds)}s / ${Math.floor(duration)}s`;
    }
    requestAnimationFrame(loop);
}

sound.on('play', () => {
    flag = true;
    dom.button.innerHTML = 'pause';
});

sound.on('pause', () => {
    flag = false;
    dom.button.innerHTML = 'resume';
});

dom.button.addEventListener('click', () => {
    flag ? sound.pause() : sound.play();
});

loop();
