// membuat sebuah objeck canvas dari html elemen
var canvas = document.getElementById('canvas');
//membuat sebuah 2d gambar objek
var ctx = canvas.getContext('2d');
//kalkulasi radius hour menggunakan tinggi
var radius = canvas.height / 2;
//buat sumbu x dan y ke tengah canvas
ctx.translate(radius, radius);
//kurangi radius hour sebesar 90%
radius = radius * 0.90;

//jalankan fungsi drawclok setiap second yang di tentukan
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumber(ctx, radius);
    drawTime(ctx, radius);

}
//membuat fungsi gambar hour
function drawFace(ctx, radius) {
    var grad;
    //gambar lingkaran putih
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "White";
    ctx.fill();
    // membuat gradasi radial 
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#f5c311');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#11e9f5');
    //definisikan gradient ke stroke style
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    //gambar pusat hour
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a276e';
    ctx.fill();
}

function drawNumber(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial"; //set font 15% dari radius
    ctx.textBaseline = "middle"; //set tek ke tengah
    ctx.textAlign = "center"; // set align ke tengah
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour 
    hour = hour % 12;
    //// hitung sudut jarum penunjuk hour
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    //buat jarum penunjuk hour 50% dari radius kanvas
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    //hitung sudut jarut penunjuk minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    //buat jarum penunjuk minute 80% dari radius canvas
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    //second
    //hitung sudut jarum penunjuk second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}