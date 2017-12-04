import { Howl } from 'howler';

const BPM = 158; // beat per minutes = 1分に何ビート打つか
const BEATS = 36 * 4; // ビート数 = 小節数 × 4拍子
const DURATION = 60 * BEATS / BPM;

const dom = {
    toggle: document.querySelector('#toggle'),
    skip: document.querySelector('#skip'),
    time: document.querySelector('#time')
};

const sound = new Howl({
    src: [ './8bit18.mp3' ],
    loop: false // 手動loopなので不要
});

let flag = false;

function loop () {
    const seconds = sound.seek();
    if (!isNaN(seconds) && !isNaN(DURATION)) {
        dom.time.innerHTML = `${Math.floor(seconds)}s / ${Math.floor(DURATION)}s`;
    }
    if (seconds > DURATION) {
        sound.seek(seconds - DURATION);
    }
    requestAnimationFrame(loop);
}

sound.on('play', () => {
    flag = true;
    dom.toggle.innerHTML = 'pause';
});

sound.on('pause', () => {
    flag = false;
    dom.toggle.innerHTML = 'resume';
});

dom.toggle.addEventListener('click', () => {
    flag ? sound.pause() : sound.play();
});

dom.skip.addEventListener('click', () => {
    sound.seek(50);
});

loop();
