window.addEventListener('load', start);

import swal from 'sweetalert';

var height = null;
var weight = null;
var form = null;

function start() {
  height = document.querySelector('#inputHeight');
  weight = document.querySelector('#inputWeight');
  form = document.querySelector('form');
  preventFormSubmit();
  imcCalculator();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  form.addEventListener('submit', handleFormSubmit);
}

function imcCalculator() {
  var clearButton = document.getElementById('clear');
  var result = null;
  function calc() {
    var imc = parseFloat(
      (weight.value / (height.value * height.value)).toFixed(2)
    );
    if (!isNaN(imc)) {
      if (imc == 0 || imc == Infinity) {
        error();
      } else {
        document.querySelector('.showCalcResult strong').innerHTML = imc;
        if (imc < 18.5) {
          result = '0';
        } else if (imc > 18.5 && imc < 25) {
          result = '1';
        } else if (imc > 25 && imc < 30) {
          result = '2';
        } else if (imc > 30 && imc < 40) {
          result = '3';
        } else if (imc > 40) {
          result = '4';
        }
        document
          .getElementById('resultCalc' + result)
          .classList.add('colorResult');
        height.disabled = true;
        weight.disabled = true;
      }
    } else {
      error();
    }
  }
  function error() {
    swal(
      'Algo está errado!',
      'Digite um número válido para altura e peso. Use ponto ao invés de vírgula. Obtenha ajuda observando os exemplos.',
      'error'
    );
    clearAll();
  }
  function clearAll() {
    document.getElementById('inputHeight').value = '';
    document.getElementById('inputWeight').value = '';
    document.querySelector('.showCalcResult strong').innerHTML = '';
    document
      .getElementById('resultCalc' + result)
      .classList.remove('colorResult');
    height.disabled = false;
    weight.disabled = false;
    height.focus();
  }
  height.focus();
  form.addEventListener('submit', calc);
  clearButton.addEventListener('click', clearAll);
}
