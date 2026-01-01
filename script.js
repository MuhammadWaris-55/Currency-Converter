const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let icon = document.getElementById("icon");


//accessing all the countries 
// for (code in countryList) {
//    console.log(code , countryList[code]);
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";
        }
        else if (select.name === "to" && currCode === "PKR") {
            newOpt.selected = "selected";
        }
        select.append(newOpt);

    };

    select.addEventListener("change", (e) => {
        changeFlag(e.target);
    });
}

const changeFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSRC = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSRC;

}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === 0 || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurrency = fromcurr.value.toLowerCase();
    let toCurrency = tocurr.value.toLowerCase();

    const myURL = `${URL}/${fromCurrency}.json`;

    let response = await fetch(myURL);
    let data = await response.json();

    let rate = data[fromCurrency][toCurrency];
    let finalAmount = amtVal * rate;
    msg.innerHTML = `${amtVal}${fromCurrency.toUpperCase()} = ${finalAmount}${toCurrency.toUpperCase()}`
});
