// Para compilar: tsc main.ts
// Para executar: node main.js
// Para que haga válido el config.json: tsc -p tsconfig.json
// Siempre usar el comando tsc -p tsconfig.json para compilar
import { data } from './data.js';
// Aquí se crea una lista de series
var list = [];
var a = new data(data.series);
a.list_series.forEach(function (serie) {
    list.push(serie);
});
var SerieTable = document.getElementById('SeriesTable');
// Aquí itera sobre los datos de la lista
for (var i = 0; i < list.length; i++) {
    mostrarSeries(list[i]);
}
mostrarPromedio();
// Así se crea con un objeto
function mostrarSeries(serie1) {
    var tbodySeries = document.createElement('tbody');
    //Necesito que el nombre de la serie sea un link a la imagen de la serie
    tbodySeries.innerHTML = "\n    <tr><td> ".concat(serie1.rank, "</td> <td> <a href=\"#\" id=\"").concat(serie1.name, "\">").concat(serie1.name, "</a> </td> <td> ").concat(serie1.channel, "</td> <td> ").concat(serie1.seasons, "</td></tr>\n    ");
    SerieTable.appendChild(tbodySeries);
    var serieName = document.getElementById(serie1.name);
    serieName === null || serieName === void 0 ? void 0 : serieName.addEventListener('click', function (event) {
        event.preventDefault();
        // Eliminar el cuadro de imagen anterior
        var oldImageBox = document.getElementById('imageBox');
        if (oldImageBox) {
            oldImageBox.remove();
        }
        // Crear el cuadro con la imagen, el nombre, la descripción y el enlace
        var serieImage = document.createElement('img');
        serieImage.src = serie1.image;
        var serieTitle = document.createElement('h2');
        serieTitle.textContent = serie1.name;
        var serieDescription = document.createElement('p');
        serieDescription.textContent = serie1.description;
        var serieLink = document.createElement('a');
        serieLink.href = serie1.link;
        serieLink.textContent = serie1.link;
        var imageBox = document.createElement('div');
        imageBox.id = 'imageBox';
        imageBox.appendChild(serieImage);
        imageBox.appendChild(serieTitle);
        imageBox.appendChild(serieDescription);
        imageBox.appendChild(serieLink);
        var serieInfo = document.getElementById('serieInfo');
        serieInfo === null || serieInfo === void 0 ? void 0 : serieInfo.appendChild(imageBox);
    });
}
function mostrarPromedio() {
    var promedio = 0;
    var total = 0;
    for (var i = 0; i < list.length; i++) {
        total += list[i].seasons;
    }
    promedio = total / list.length;
    var tbodyPromedio = document.createElement('tbody');
    tbodyPromedio.innerHTML = "\n    <tr><td colspan=\"4\" class=\"promedio\"> Promedio de temporadas: ".concat(promedio, "</td></tr>\n    ");
    SerieTable.appendChild(tbodyPromedio);
}
