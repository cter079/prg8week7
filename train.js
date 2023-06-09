// import { createChart, updateChart } from "./scatterplot.js"



// //
// // demo data
// //
// function loadData(){
//     Papa.parse("./mobilephones.csv", {
//         download:true,
//         header:true, 
//         dynamicTyping:true,
//         complete: results => checkData(results.data)
//     })
// }

// function checkData(data){
//         // data voorbereiden
//     data.sort(() => (Math.random() - 0.5))
//     let trainData = data.slice(0, Math.floor(data.length * 0.8))
//     let testData = data.slice(Math.floor(data.length * 0.8) + 1)

//     // neural network aanmaken
//     let nn = ml5.neuralNetwork({ task: 'regression', debug: true })

//     // data toevoegen aan neural network
//     for(let phone of trainData){
//         nn.addData({ storage:phone.storage, weight: phone.weight, cpu:phone.cpu, frontcam:phone.frontcam, rearcam:phone.rearcam }, { price: phone.price })
//     }
// //trainen
//     nn.normalizeData()
//     nn.train({ epochs: 20 }, () => console.log('model is trained'))
//     nn.save()



// }

// loadData()

let nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

function modelLoaded(){
    console.log('model is loaded')
    
    //when results are ready
    
}

document.getElementById('submit').addEventListener('click', () => {
 predictPrice()
})

async function predictPrice(){
    let weight = document.getElementById('weight').value
    //convert to number
    weight = parseInt(weight)
    let frontcam = document.getElementById('frontcam').value
    frontcam = parseInt(frontcam)
    let rearcam = document.getElementById('backcam').value
    rearcam = parseInt(rearcam)
    let storage = document.getElementById('storage').value
    storage = parseInt(storage)
    let cpu = document.getElementById('cpu').value
    cpu = parseInt(cpu)


    const results = await nn.predict({ weight, frontcam, rearcam, storage, cpu })

    //max 2 decimals after comma
    results[0].value = Math.round(results[0].value * 100) / 100


    document.getElementById('result').innerHTML = `The price of this phone is ${results[0].value} euros`
    
}


