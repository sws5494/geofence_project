function timedCount() {
    console.log("Log");
    setTimeout("timedCount()", 1000);
}

timedCount();
