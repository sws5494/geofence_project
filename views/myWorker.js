function timedCount() {
    postMessage('test');
    setTimeout("timedCount()", 1000);
}

timedCount();
