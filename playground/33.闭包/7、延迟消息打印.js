function delayedLogger(message) {
  setTimeout(function () {
    console.log(message);
  }, 2000);
}

delayedLogger("Hello after 2 seconds"); // 2秒后控制台应该显示什么？

function scheduleAlerts() {
  const alerts = [];

  for (var i = 1; i <= 3; i++) {
    alerts.push(
      (function (index) {
        return function () {
          console.log("Alert " + index + " after " + index + " second(s)");
        };
      })(i)
    );
  }

  console.log(alerts);

  for (var j = 1; j <= alerts.length; j++) {
    setTimeout(alerts[j - 1], j * 1000);
  }
}

scheduleAlerts(); // 控制台将如何显示信息？
