﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function sqrDist(x1, y1, x2, y2) {
    return ((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))
}

function writeMessage(canvas, context, message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '12pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function draw(context, tri) {
    context.beginPath();
    context.moveTo(tri[0].x, tri[0].y);
    context.lineTo(tri[1].x, tri[1].y);
    context.lineTo(tri[2].x, tri[2].y);

    context.fill();
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function displayAllTriangles(context) {
    var rows = 'ABCDEF';
    let uri = window.location.href + 'FromRowCol?id=';
    for (myrow = 0; myrow < 6; myrow++) {
        for (mycol = 0; mycol < 12; mycol++) {

            $.ajax({
                url: uri + rows[myrow] + pad(mycol.toString(), 2),
                type: 'GET',
                contentType: 'application/json;',
                data: { action: 'FromRowCol' },
                success: function (results) {
                    draw(context, results);
                },
            }
            );
        }
    }
}

function displayTriangleId(canvas, context, v1x, v1y, v2x, v2y, v3x, v3y) {
    let uri = window.location.href + 'GetRowCol?id=';
    $.ajax({
        url: uri + v1x + v1y + v2x + v2y + v3x + v3y,
        type: 'GET',
        contentType: 'application/json;',
        data: { action: 'GetRowCol' },
        success: function (results) {
            writeMessage(canvas, context, 'Triangle is ' + results);
        },
    });
}

function displayTriAtMouse(canvas, canvasForMsg, contextForMsg) {
    canvas.addEventListener('mousemove', function (evt) {
        var mouse = getMousePos(canvas, evt);
        if (mouse.x < 0 || mouse.y < 0 || mouse.x > 59 || mouse.y > 59)
            writeMessage(canvasForMsg, contextForMsg, 'Keep mouse in area');
        else {
            // this code is only to prove the API
            // we are creating the 3 verts for the triangle closest to the
            // mouse position, then using the API to have it tell us the ID

            // determine which right angle we are closest to
            var topy = parseInt(mouse.y / 10) * 10;
            var boty = topy + 10;
            var leftx = parseInt(mouse.x / 10) * 10;
            var rightx = leftx + 10;

            var v1x; var v1y; var v2x; var v2y; var v3x; var v3y;

            // bottom triangles
            var dbot = sqrDist(leftx, boty, mouse.x, mouse.y);
            var dtop = sqrDist(rightx, topy, mouse.x, mouse.y);
            if (dtop < dbot) {
                // verts must be passed in from right angle and go clockwise
                v1x = pad(rightx, 2); v1y = pad(topy, 2);
                v2x = pad(rightx, 2); v2y = pad(boty, 2);
                v3x = pad(leftx, 2); v3y = pad(topy, 2);
            }
            else {
                v1x = pad(leftx, 2); v1y = pad(boty, 2);
                v2x = pad(leftx, 2); v2y = pad(topy, 2);
                v3x = pad(rightx, 2); v3y = pad(boty, 2);
            }

            displayTriangleId(canvasForMsg, contextForMsg, v1x, v1y, v2x, v2y, v3x, v3y);

        }
    }, false);
}