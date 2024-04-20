// Para compilar: tsc main.ts
// Para executar: node main.js
// Para que haga válido el config.json: tsc -p tsconfig.json
    // Siempre usar el comando tsc -p tsconfig.json para compilar

import {serie} from './serie.js';
import {data} from './data.js';

// Aquí se crea una lista de series
const list: serie[] = [];
let a = new data(data.series);
a.list_series.forEach((serie) => {
    list.push(serie);
});

let SerieTable: HTMLElement = document.getElementById('SeriesTable')!;

// Aquí itera sobre los datos de la lista
for (let i: number = 0; i < list.length; i++)
{
    mostrarSeries(list[i]);
}
mostrarPromedio();

// Así se crea con un objeto
function mostrarSeries(serie1: serie) 
{
    let tbodySeries = document.createElement('tbody');
    //Necesito que el nombre de la serie sea un link a la imagen de la serie
    tbodySeries.innerHTML = `
    <tr><td> ${serie1.rank}</td> <td> <a href="#" id="${serie1.name}">${serie1.name}</a> </td> <td> ${serie1.channel}</td> <td> ${serie1.seasons}</td></tr>
    `
    SerieTable.appendChild(tbodySeries);


    let serieName = document.getElementById(serie1.name);
    serieName?.addEventListener('click', (event) => {
        event.preventDefault(); 

        // Eliminar el cuadro de imagen anterior
        let oldImageBox = document.getElementById('imageBox');
        if (oldImageBox) {
            oldImageBox.remove();
        }

        // Crear el cuadro con la imagen, el nombre, la descripción y el enlace
        let serieImage = document.createElement('img');
        serieImage.src = serie1.image; 
        serieImage.style.width = '100%';
        serieImage.style.height = 'auto';
        let serieTitle = document.createElement('h2');
        serieTitle.textContent = serie1.name;
        let serieDescription = document.createElement('p');
        serieDescription.textContent = serie1.description; 
        let serieLink = document.createElement('a');
        serieLink.href = serie1.link; 
        serieLink.textContent = serie1.link;

        let imageBox = document.createElement('div');
        imageBox.id = 'imageBox'; 
        imageBox.appendChild(serieImage);
        imageBox.appendChild(serieTitle);
        imageBox.appendChild(serieDescription);
        imageBox.appendChild(serieLink);

        let serieInfo = document.getElementById('serieInfo');
        serieInfo?.appendChild(imageBox);
    });
}

function mostrarPromedio()
{
    let promedio: number = 0;
    let total: number = 0;
    for (let i: number = 0; i < list.length; i++)
    {
        total += list[i].seasons;
    }
    promedio = total / list.length;
    let tbodyPromedio = document.createElement('tbody');
    tbodyPromedio.innerHTML = `
    <tr><td colspan="4" class="promedio"> Promedio de temporadas: ${promedio}</td></tr>
    `
    SerieTable.appendChild(tbodyPromedio);
}


