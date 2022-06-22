// 获取canvas元素
var cvs = document.getElementById("cvs");
var cvsClientRect = cvs.getBoundingClientRect();
// 线段的点的集合
var points = [];
// 可拖动圆圈的点的集合
var circles = [];

// 圆圈对象
let radius = 10;
let color = 10;
// 拖拽点标记
let isSelected = false;

// 鼠标按下事件
cvs.addEventListener("mousedown", mousedownHandler, false);
// 鼠标结束事件
cvs.addEventListener(
  "dblclick",
  function () {
    cvs.removeEventListener("mousemove", mousemoveHandler);
  },
  false
);
var ctx = cvs.getContext("2d");
var flag = false;

// 鼠标移动事件
function mousedownHandler(event) {
  if (event.button == 0 && !flag) {
    points.push({
      x: event.pageX - cvsClientRect.x,
      y: event.pageY - cvsClientRect.y,
    });
    console.log(points, "points");
    if (points.length >= 1) {
      cvs.addEventListener("mousemove", mousemoveHandler, false);
    }
    drawPolygon(points);
  } else if (event.button === 2) {
    flag = true;
    cvs.removeEventListener("mousemove", mousemoveHandler);
  }
}

function drawPolygon(points) {
  ctx.clearRect(0, 0, 700, 500);
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (var i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.stroke();
}

function mousemoveHandler(event) {
  drawPolygon(
    points.concat({
      x: event.pageX - cvsClientRect.x,
      y: event.pageY - cvsClientRect.y,
    })
  );
}

// 编辑功能
function polygonEdit() {
  ctx.clearRect(0, 0, 700, 500);
  let newPoints = "91.11,155.234567,104,370,445,309,343,110,343,110";
  // console.log(newPoints);
  // 分割字符串并转为数字数组
  let newArr = newPoints.split(",").map(Number);
  let drawXPoints = [];
  let drawYPoints = [];
  newArr.forEach((value, index) => {
    if (index % 2 === 0) {
      drawXPoints.push(value);
    } else {
      drawYPoints.push(value);
    }
  });

  let drawArr = [];

  for (let i = 0; i < drawXPoints.length - 1; i++) {
    for (let j = 0; j < drawYPoints.length - 1; j++) {
      if (i === j) {
        drawArr.push({
          x: drawXPoints[i],
          y: drawYPoints[j],
        });
      }
    }
  }

  console.log(drawXPoints, "drawXPoints");
  console.log(drawYPoints, "drawYPoints");
  console.log(drawArr, "drawArr");
  drawPolygon(drawArr);
}
