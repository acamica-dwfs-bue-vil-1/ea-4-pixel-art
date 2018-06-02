var nombreColores = [
  'White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var paleta = document.getElementById('paleta');
var grillaPixeles = document.getElementById('grilla-pixeles');
var indicadorColor = document.getElementById('indicador-de-color');
var indicadorColorSecundario = document.getElementById('indicador-de-color-secundario');

//Llamo acá a las funciones creadas.
generarColores();
generarPixeles();

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    indicadorColor.style.backgroundColor = colorActual;
  })
);

function generarColores () {
  for (i = 0; i < nombreColores.length; i++) {
    var div = document.createElement('div');
    div.style.backgroundColor = nombreColores[i];
    div.className = 'color-paleta';
    $(div).addClass(nombreColores[i]);
    paleta.appendChild(div);
  }
}

function generarPixeles () {
  for (i = 0; i <= 1750; i++) {
    var div = document.createElement('div');
    grillaPixeles.appendChild(div);
  }
}

paleta.addEventListener('click', cambiarColor);
function cambiarColor (e) {
  if (borrar === false) {  
    console.log(e.target);
    var color = e.target.style.backgroundColor
    console.log(color);
    indicadorColor.style.backgroundColor = color;
  }
}

grillaPixeles.addEventListener('click', pintar);
function pintar (e) {
  if (borrar === false) {  
    e.target.style.backgroundColor = indicadorColor.style.backgroundColor;
  }else{
    e.target.style.backgroundColor = 'white';
  }
}

var estadoMouse = 0;
grillaPixeles.addEventListener('mousedown', function(){
  estadoMouse = 1;   
  console.log(estadoMouse);    
});
grillaPixeles.addEventListener('mouseup', function(){
  estadoMouse = 0;  
  console.log(estadoMouse);
});

grillaPixeles.addEventListener('mouseover', pintarEnMov);
function pintarEnMov (e) {
  if (estadoMouse === 1) {
    pintar(e);
  }
}

$('#borrar').click(borrarPantalla);

function borrarPantalla () {
  $('#grilla-pixeles').children().animate({'background-color': 'white'}, 1000);
}

$('#guardar').click(guardarPixelArt);

$('.imgs img').click(function(){
  var $superheroe = eval($(this).attr('id'));
  cargarSuperheroe($superheroe);
});

//FUNCIONES ADICIONALES
//Sombrea los colores al hacer hover sobre ellos.
$('.color-paleta').hover(
  function(){
    $(this).addClass('inner-shadow');
  }, 
  function(){
    $(this).removeClass('inner-shadow');
  });

paleta.addEventListener('contextmenu', cambiarColorSecundario);
function cambiarColorSecundario (e) {
  var color = e.target.style.backgroundColor
  indicadorColorSecundario.style.backgroundColor = color;
}
grillaPixeles.addEventListener('contextmenu', pintarSecundario);
function pintarSecundario (e) {
  e.target.style.backgroundColor = indicadorColorSecundario.style.backgroundColor;
}

//Goma de borrar.
var borrar = false;
var indicadorColorTemp;
var colorPersonalizadoTemp;
$('#goma-de-borrar').click(function () {
  if (borrar === false) {
    borrar = true;
    indicadorColorTemp = indicadorColor.style.backgroundColor;    
    indicadorColor.style.backgroundColor = 'transparent';
    colorPersonalizadoTemp = colorPersonalizado.value;
    colorPersonalizado.value = '#FFFFFF';
    colorPersonalizado.disabled = true;
  }else{
    borrar = false;
    indicadorColor.style.backgroundColor = indicadorColorTemp;
    colorPersonalizado.value = colorPersonalizadoTemp;
    colorPersonalizado.disabled = false;
    
  }
  $('#goma-de-borrar').toggleClass('borde-rojo');
});

//Animación.
$(document).ready (function(){
  let titulo = $('header h1').children();
  let x = 21;
  setInterval (function() {
    for (let i = 0; i < titulo.length; i++) {
      setTimeout(function () {
        $(titulo[i]).css('color', nombreColores[x]);
        $(titulo[i-1]).css('color', nombreColores[x-1]);
        $(titulo[i-2]).css('color', nombreColores[x-2]);
        $(titulo[i-3]).css('color', nombreColores[x-3]);
        $(titulo[i-4]).css('color', nombreColores[x-4]);
        $(titulo[i-5]).css('color', nombreColores[x-5]);
        $(titulo[i-6]).css('color', nombreColores[x-6]);
        $(titulo[i-7]).css('color', nombreColores[x-7]);
        $(titulo[i-8]).css('color', nombreColores[x-8]);
      }, (i * 100));
    }
  if (x < 118) {
      x++;  
    }else{
      x = 11;
    }
  }, 800);
});