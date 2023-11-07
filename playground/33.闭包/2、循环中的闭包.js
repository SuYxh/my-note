for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}

// for (var i = 0; i < 3; i++) {
//   ((i) => {
//     setTimeout(function () {
//       console.log(i);
//     }, 1000 * i);
//   })(i)
// }

// function createButtons() {
//   for (let i = 1; i <= 5; i++) {
//     const button = document.createElement('button');
//     button.textContent = 'Button ' + i;
//     button.onclick = function () {
//       alert('This is button ' + i);
//     };
//     document.body.appendChild(button);
//   }
// }

function createButtons() {
  for (var i = 1; i <= 5; i++) {
    ((x) => {
      const button = document.createElement("button");
      button.textContent = "Button " + x;
      button.onclick = function () {
        alert("This is button " + x);
      };
      document.body.appendChild(button);
    })(i);
  }
}

createButtons();
