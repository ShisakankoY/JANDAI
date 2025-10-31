//入力
const x1 = [
    0,
    0,
    1,
    1
];

const x2 = [
    0,
    1,
    0,
    1
];

//出力
const y = [
    0,
    0,
    0,
    1
];

//シグモイド関数
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

//保存用配列
let hideArray = [];
let outputArray = [];

//重み・バイアス
let w1 = Math.random() * 2 - 1;
let w2 = Math.random() * 2 - 1;
let bias = Math.random() * 2 - 1;

let w3 = Math.random() * 2 - 1;
let output_bias = Math.random() * 2 - 1;

//隠れ層
function hide() {
    for (let i = 0; i < x1.length; i++) {
        let z = (x1[i] * w1) + (x2[i] * w2) + bias;
        hideArray.push(sigmoid(z));
    }
}

//出力層
function output() {
    for (let i = 0; i < hideArray.length; i++) {
        let v = (hideArray[i] * w3) + output_bias;
        outputArray.push(sigmoid(v));
    }
}

//誤差
let errors = [];
function error() {
    for (let i = 0; i < outputArray.length; i++) {
        let m = y[i] - outputArray[i];
        errors.push(m);
    }
}

//学習率
let lr = 0.5;

//重み・バイアスの更新(逆伝播)
function update() {
    let outputGradient_Array = [];
    let hideGradient_Array = [];
    //勾配
    for (let i = 0; i < errors.length; i++) {
        let outputGradient = errors[i] * outputArray[i] * (1 - outputArray[i]);
        let hideGradient = outputGradient * w3 * hideArray[i] * (1 - hideArray[i]);
        outputGradient_Array.push(outputGradient);
        hideGradient_Array.push(hideGradient);
    }

    //出力層の重み
    for (let i = 0; i < errors.length; i++) {
        w3 = w3 + lr * outputGradient_Array[i] * hideArray[i];
        output_bias = output_bias + lr * outputGradient_Array[i];
    }

    //隠れ層の重み
    for (let i = 0; i < errors.length; i++) {
        let deltaHidden = hideGradient_Array[i];
        w1 = w1 + lr * deltaHidden * x1[i];
        w2 = w2 + lr * deltaHidden * x2[i];
        bias = bias + lr * deltaHidden;
    }
}

let count = 0;
const text = document.getElementById('text');

//学習
function epoch() {
    count++;
    hideArray = [];
    outputArray = [];
    errors = [];
    outputGradient_Array = [];
    hideGradient_Array = [];

    hide();
    output();
    error();
    update();

    if (count % 5 === 0) {
        text.innerHTML = "Epoch: " + count + "<br>"
            + "outputArray: " + outputArray.join(' ') + "<br>"
            + "errors" + errors.join(' ');
    }

    if (count <= 2000) {
        requestAnimationFrame(epoch);
    }
}

epoch();