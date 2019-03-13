export const drawChart = function (canvas) {
    let ctx;
    let margin = { top: 40, left: 75, right: 0, bottom: 75 };
    let chartHeight, chartWidth, yMax, xMax, data;
    let maxYValue = 0;
    let ratio = 0;
    let renderType = { lines: 'lines', points: 'points' };

    let render = function (canvasId, dataObj) {
        data = dataObj;
        getMaxDataYValue();
        chartHeight = canvasId.getAttribute('height');
        chartWidth = canvasId.getAttribute('width');
        xMax = chartWidth - (margin.left + margin.right);
        yMax = chartHeight - (margin.top + margin.bottom);
        ratio = yMax / maxYValue;
        ctx = canvasId.getContext("2d");
        renderChart();
    };

    let renderChart = function () {
        renderBackground();
        renderText();
        renderLinesAndLabels();

        //render data based upon type of renderType(s) that client supplies
        if (data.renderTypes == undefined || data.renderTypes == null) data.renderTypes = [renderType.lines];
        for (let i = 0; i < data.renderTypes.length; i++) {
            renderData(data.renderTypes[i]);
        }
    };

    let getMaxDataYValue = function () {
        for (let i = 0; i < data.dataPoints.length; i++) {
            if (data.dataPoints[i].y > maxYValue) maxYValue = data.dataPoints[i].y;
        }
    };

    let renderBackground = function () {
        let lingrad = ctx.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
        lingrad.addColorStop(0.0, '#D4D4D4');
        lingrad.addColorStop(0.2, '#fff');
        lingrad.addColorStop(0.8, '#fff');
        lingrad.addColorStop(1, '#D4D4D4');
        ctx.fillStyle = lingrad;
        ctx.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
        ctx.fillStyle = 'black';
    };

    let renderText = function () {
        let labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
        ctx.font = labelFont;
        ctx.textAlign = "center";

        //Title
        let txtSize = ctx.measureText(data.title);
        ctx.fillText(data.title, (chartWidth / 2), (margin.top / 2));

        //X-axis text
        txtSize = ctx.measureText(data.xLabel);
        ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

        //Y-axis text
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.font = labelFont;
        ctx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
        ctx.restore();
    };

    let renderLinesAndLabels = function () {
        //Vertical guide lines
        let yInc = yMax / data.dataPoints.length;
        let yPos = 0;
        let yLabelInc = (maxYValue * ratio) / data.dataPoints.length;
        let xInc = getXInc();
        let xPos = margin.left;
        for (let i = 0; i < data.dataPoints.length; i++) {
            yPos += (i == 0) ? margin.top : yInc;
            //Draw horizontal lines
            drawLine(margin.left, yPos, xMax, yPos, '#E8E8E8');

            //y axis labels
            ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
            let txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
            let txtSize = ctx.measureText(txt);
            ctx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);

            //x axis labels
            txt = data.dataPoints[i].x;
            txtSize = ctx.measureText(txt);
            ctx.fillText(txt, xPos, yMax + (margin.bottom / 3));
            xPos += xInc;
        }

        //Vertical line
        drawLine(margin.left, margin.top, margin.left, yMax, 'black');

        //Horizontal Line
        drawLine(margin.left, yMax, xMax, yMax, 'black');
    };

    let renderData = function (type) {
        let xInc = getXInc();
        let prevX = 0,
            prevY = 0;

        for (let i = 0; i < data.dataPoints.length; i++) {
            let pt = data.dataPoints[i];
            let ptY = (maxYValue - pt.y) * ratio;
            if (ptY < margin.top) ptY = margin.top;
            let ptX = (i * xInc) + margin.left;

            if (i > 0 && type == renderType.lines) {
                //Draw connecting lines
                drawLine(ptX, ptY, prevX, prevY, 'black', 2);
            }

            if (type == renderType.points) {
                let radgrad = ctx.createRadialGradient(ptX, ptY, 8, ptX - 5, ptY - 5, 0);
                radgrad.addColorStop(0, 'Red');
                radgrad.addColorStop(0.9, 'White');
                ctx.beginPath();
                ctx.fillStyle = radgrad;
                //Render circle
                ctx.arc(ptX, ptY, 8, 0, 2 * Math.PI, false)
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#000';
                ctx.stroke();
                ctx.closePath();
            }

            prevX = ptX;
            prevY = ptY;
        }
    };

    let getXInc = function () {
        return Math.round(xMax / data.dataPoints.length) - 1;
    };

    let drawLine = function (startX, startY, endX, endY, strokeStyle, lineWidth) {
        if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
        if (lineWidth != null) ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    };

    return {
        renderType: renderType,
        render: render
    };
}();
