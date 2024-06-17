let BASE_URL = `https://latest.currency-api.pages.dev/v1/currencies/eur.json`

const dropdowns = document.querySelectorAll(".dropdown select");
const btn =  document.querySelector("button")
const fromCurr = document.querySelector(" .from  select ");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon = document.querySelector(".icon");
 


// for (code in countryList)
//     {
//         console.log(code,countryList[code]);
//     }

// Adding multiple options on country choices

for(let select of dropdowns)
    {
        for (currCode in countryList)
            {
                 let newOption = document.createElement("option");
                 newOption.innerText = currCode;
                 newOption.value = currCode;
                 select.append(newOption)
// MAKING BY DEFAULT COUNTRYIES US AND IND

                 if(select.name === "from" && currCode === "USD")
                    {newOption.selected = "selected"}

                 if(select.name === "to" && currCode === "INR")
                    {newOption.selected = "selected"}

                 // SELECTING COUNTRY CODE TO FLAG SELECT
                 select.addEventListener("change",(evt) =>{
                    updateFlag(evt.target);
                 });


            }
    }

const updateFlag = (element) => {

        let currCode = element.value;
        let countryCode = countryList[currCode];

        let newSRC = `https://flagsapi.com/${countryCode}/flat/64.png`;


        // SELECTING IMAGE OF FLAG USIING .PARENTELEMENT
         
        let img = element.parentElement.querySelector("img");
        img.src = newSRC;


}


btn.addEventListener("click", async (evt) => {
        evt.preventDefault(); // preeveting url showing 
        updateExchangeRate();

});

const updateExchangeRate = async() =>{

        //  ACCESING ENTER AOMUNT 

        let amount = document.querySelector(".amount input")
 
        let amtValue = amount.value;
        console.log (amtValue);

    // If negative or blank filled 

        if (amtValue === "" || amtValue <1) {
            amtValue =1;
            amount.value = "1";
        }

        console.log(fromCurr.value,toCurr.value);


//  working with api 

        let URL = `https://latest.currency-api.pages.dev/v1/currencies/eur.json`
        let response = await fetch(URL);
        msg.innerText = "Getting the Exchange rate..."
        const data =  await response.json()

    // const data_par = JSON.parse(data);
    //     const eurRate = data.eur;
    //    console.log(eurRate); // Output: 0

        console.log(response)
        console.log(data)

        let from_flag = fromCurr.value.toLowerCase();
        console.log(from_flag);
        
        let rate_from = data.eur[from_flag];
        console.log(rate_from);

        let to_flag = toCurr.value.toLowerCase();
        console.log(to_flag);
        

        let rate_to = data.eur[to_flag];
        console.log(rate_to);

        let eur_2_from = rate_from;
        let eur_2_to = rate_to;

        let from_2_to =  (amtValue * ((rate_to)/(rate_from)));
        console.log(from_2_to);


        msg.innerText = `${amtValue}  ${from_flag.toUpperCase()} = ${from_2_to.toFixed(3)} ${to_flag.toUpperCase()}`

    }

    icon.addEventListener("click", () => {
        let tempCode = fromCurr.value;
        fromCurr.value = toCurr.value;
        toCurr.value = tempCode;
        updateFlag(fromCurr);
        updateFlag(toCurr);
        updateExchangeRate();
      });

 