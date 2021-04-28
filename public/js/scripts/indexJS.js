//
//
// codice nell'index.html body
//
//

var currentTab = 0; 
showTab(currentTab); 

function showTab(n) {

  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Cerca";
    document.getElementById("nextBtn").addEventListener('click', function(){
      this.parentNode.submit();
    });
  } else {
    document.getElementById("nextBtn").innerHTML = "Avanti";
  }
  
  aggiornaStep(n);
}

function aggiornaStep(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");

  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function nextPrev(n) {

  var x = document.getElementsByClassName("tab");

  x[currentTab].style.display = "none";

  currentTab = currentTab + n;

  showTab(currentTab);
}




//
//
// codice nell'index body
//
//
mostra_nascondi(1);

for ( let x of ['uni', 'corso', 'esame'] ) {
  let obj = document.getElementById("suggerimenti_" + x + "_input");
  obj.addEventListener("input", function(){ cerca(x, obj.value); });
  obj.addEventListener("click", function(){ this.select(); });
}

function seleziona(parent, val, val_id) {
  console.log(val);
  let id = parent.getAttribute("id");
  id += "_input";

  let obj = document.getElementById(id);
  obj.value = val;

  document.getElementById(id + "_hidden").value = val_id;

  mostra_nascondi(1);
}

function mostra_nascondi (val) {
  let x = document.querySelectorAll("div.suggerimenti_result") //.style.display = "none";
  let disp = 'none';

  if (val === 0) {
    disp = 'block';
  } 

  for (let i = 0; i < x.length; i++) {
    x[i].style.display = disp;
  }
}

function cerca(cerca, q) {                
  if (cerca === ""){
    console.log("param cerca empty");
    return;
  }

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      let response = JSON.parse(xhttp.responseText);

      let str = '\r\n';

      for (let i = 0; i < response.length; i++) {
        str += '<li onclick="seleziona(this.parentElement, this.innerHTML, ' + response[i].id + ')" style="padding-left:0;">';  
        str += response[i].content;
        str += '</li>\r\n' + ((i == (response.length - 1)) ? '\r\n' : '<hr>\r\n');

        document.getElementById('suggerimenti_' + cerca).innerHTML = str;
      } 

      mostra_nascondi(0);
      // xhttp.responseText;
    } else if (this.readyState == 4 && this.status >= 300) {
      console.log(xhttp.responseText);
      mostra_nascondi(1);
    } 
  };

  let query = "cerca=" + cerca;
  query += "&q=" + q;

  xhttp.open("GET", "server.php?" + query, true);
  xhttp.send();
}