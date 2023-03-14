import dayjs from "dayjs";

export function SmoothHorizontalScrolling(e, time, amout, start) {
    var eAnt = amout / 100;
    var curTime = 0;
    var scrollCounter = 0;
    const y = window.scrollY;
    while(curTime < time) {
        window.setTimeout(SHS_B, curTime, e, scrollCounter, eAnt, start, y);
        curTime += time / 100;
        scrollCounter++;
    }
    window.scrollTo(0, y);
}

function SHS_B(e, sc, eAnt, start, y) {
    e.scrollLeft = eAnt * sc + start;
}


export function WindowScrollTop() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
}

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, -1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    })

    return daysMatrix;
}
