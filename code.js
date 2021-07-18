const button = document.getElementById('button-convert')
const select = document.getElementById('select-value')

const convertValues = async () => {
    const getReaisValue = document.getElementById('input-real').value
    const realValueText = document.getElementById('Real-value-text')
    const currentValueText = document.getElementById('current-value-text')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json())
    const data2 = await fetch("https://www.mercadobitcoin.net/api/BTC/ticker/").then( response => response.json())

    const dollar = data.USDBRL.high
    const Euro = data.EURBRL.high
    const bitCoin = data2.ticker.date

    // realValueText.innerHTML = `R$ ${getReaisValue}`

    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(getReaisValue)

    // currentValueText.innerHTML = `R$ ${parseInt(getReaisValue / dollar)}`

    if (select.value === 'US$ Dólar americano') {
        currentValueText.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(getReaisValue / dollar)
    }

    if (select.value === '€ Euro') {
        currentValueText.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(getReaisValue / Euro)
    }

    if (select.value === 'Bitcoin') {
        currentValueText.innerHTML = new Intl.NumberFormat('de-DE', {
            maximumFractionDigits:10,
            style: 'currency',
            currency: 'XBT'
        }).format(getReaisValue / bitCoin)
    }

}



const changeCurrency = () => {

    const currencyImg = document.getElementById('currency-img')
    const currencyName = document.getElementById('currency-name')
    const getReaisValue = document.getElementById('input-real').value


    if (select.value === 'US$ Dólar americano') {
        currencyImg.src = './Assets/EUA.png'
        currencyName.innerHTML = 'Dólar Americano'
    }
    if (select.value === '€ Euro') {
        currencyImg.src = './Assets/Euro.png'
        currencyName.innerHTML = 'Euro'
    }

    if (select.value === 'Bitcoin') {
        currencyImg.src = './Assets/Bit-Coin.png'
        currencyName.innerHTML = 'BitCoin'
    }

    if (getReaisValue > 0) {
        convertValues()
    }

}


button.addEventListener('click', convertValues)
select.addEventListener('change', changeCurrency)