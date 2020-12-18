const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    message1.textContent = "";
    message2.textContent = "";

    const loc = searchElement.value;
    go(loc);
});

const go = (loc) => {
    fetch("/weather?address=" + loc).then((resp) => {
        resp.json().then((data) => {
            if (data.errorMessage) {
                message1.textContent = data.errorMessage;
                message2.textContent = "";
            } else {
                const {location, forecast, temperature, precip, humidity} = data;
                message1.textContent = location;
                message2.textContent = forecast + ". It is currently " + temperature + " degress out. There is a " + precip + "% chance of rain, and humidity is " + humidity + "%";
            }
        });
    });
};
//
