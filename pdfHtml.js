function createPdfFromHtml(prodObj) {
  //prodObj[prodName][rates = 0, thirty = 1, fortyfive = 2, sixty = 3, section = 4][-4 = 0, -3 = 1, -2 = 2, -1 = 3, par = 4, +1 = 5, +2 = 6, +3 = 7, +4 = 8]
  
var prodSetCONV = []; //sets of 4 products across
var prodSetPORT = [];
var prodSetGNMA = [];
var prodSetSPEC = [];
var rowsArr = new Array(20).fill("");
var i = 0;
var k;
var prodSetCount = 0;
//CONV prod section
for(var p of Object.entries(prodObj)){
  //p[0] = prodName, p[1] contains arrays of values
  if(p[1][4] != "CONV"){
    continue;
  }
  rowsArr = createPDFrows(p, rowsArr);
  i++;
  if(i == 4){
    prodSetCONV.push(rowsArr);
    rowsArr = new Array(20).fill("");
    i = 0;
  }
}
if(rowsArr[0] != ""){
  prodSetCONV.push(rowsArr);
  rowsArr = new Array(20).fill("");
}
i = 0;
//PORT prod section
for(var p of Object.entries(prodObj)){
  if(p[1][4] != "PORT"){
    continue;
  }
  rowsArr = createPDFrows(p, rowsArr);
  i++;
  if(i == 4){
    prodSetPORT.push(rowsArr);     
    rowsArr = new Array(20).fill("");
    i = 0;
  }
}
if(rowsArr[0] != ""){
  prodSetPORT.push(rowsArr);
  rowsArr = new Array(20).fill("");
}
i = 0;
//GNMA prod section
for(var p of Object.entries(prodObj)){
  if(p[1][4] != "GNMA"){
    continue;
  }
  rowsArr = createPDFrows(p, rowsArr);
  i++;
  if(i == 4){
    prodSetGNMA.push(rowsArr);      
    rowsArr = new Array(20).fill("");
    i = 0;
  }
}
if(rowsArr[0] != ""){
  prodSetGNMA.push(rowsArr);
  rowsArr = new Array(20).fill("");
}
i = 0;
//SPEC prod section
for(var p of Object.entries(prodObj)){
  if(p[1][4] != "SPEC"){
    continue;
  }
  rowsArr = createPDFrows(p, rowsArr);
  i++;
  if(i == 4){
    prodSetSPEC.push(rowsArr);     
    rowsArr = new Array(20).fill("");
    i = 0;
  }
}
if(rowsArr[0] != ""){
  prodSetSPEC.push(rowsArr);
  rowsArr = new Array(20).fill("");
}
//create table body strings
var tableBodyCONV = createProdSections(prodSetCONV);

var tableBodyPORT = createProdSections(prodSetPORT);

var tableBodyGNMA = createProdSections(prodSetGNMA);

var tableBodySPEC = createProdSections(prodSetSPEC);

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <style>
      html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
      }
      th, td {
        border: none;
        padding: 3px 5px;
      }
      td:nth-child(4n):not(:last-child),
      th:not(:last-child) {
        border-right: 5px solid white !important;
        padding-right: 2px;
      }
      p {
        text-align: center;
        font-size: 10px;
        margin: 0px;
      }
      a {
        text-decoration: none;
      }
    </style>
  </head>
<body>
<img src=" style="max-width: 250px; float: left; padding-bottom: 5px; margin-top: 20px; margin-left: 20px;">
<div style="float: right; width: 55%;">
  <p><strong>As Of </strong>${formatDate} CT </p>
  <p><span class="material-symbols-outlined" style="font-size: 10px;">call</span> <a href="tel:1234567890">123.456.7890</a></p>
  <p><span class="material-symbols-outlined" style="font-size: 10px;">mail</span> <a href="mailto:email@email.com">email@email.com</a></p>
<table style="float: right; padding-bottom: 5px; text-align: right !important;">  
    <tr><td colspan="3"><p><strong>Lock Hours </strong>9:00 AM CT until the following business day at 7:29 AM CT </p></td></tr>
    <tr><th colspan="3"><p><strong>Lock Expiration Dates</strong></p></th></tr>
    <tr><td><p>${thirtyExp} (30 Day)</p></td> <td><p>${fortyfiveExp} (45 Day)</p></td><td><p>${sixtyExp} (60 Day)</p></td></tr>
</table>
</div>
<table style="border-bottom: 1px solid black !important;">
    <tbody>
      <tr>
      <td colspan="16" style="background-color: #005eB8; padding: 0px; margin: 0px; height: 3px;"></td>
      </tr>
      <tr>
        <td colspan="16" style="background-color: #E81C2D; color: #FFFFFF; font-size: 14px; font-weight: bold; padding-top: 2px; padding-bottom: 2px;">CONVENTIONAL</td>
      </tr> 
      ${tableBodyCONV}
      <tr><td><br></td></tr>
      <tr>
      <td colspan="16" style="background-color: #005eB8; padding: 0px; margin: 0px; height: 3px;"></td>
      </tr>
      <tr>
      <td colspan="16" style="background-color: #E81C2D; color: #FFFFFF; font-size: 14px; font-weight: bold; padding-top: 2px; padding-bottom: 2px;">PORTFOLIO</td>
      </tr>
      ${tableBodyPORT}
      <tr><td><br></td></tr>
      <tr>
      <td colspan="16" style="background-color: #005eB8; padding: 0px; margin: 0px; height: 3px;"></td>
      </tr>
      <tr>
      <td colspan="16" style="background-color: #E81C2D; color: #FFFFFF; font-size: 14px; font-weight: bold; padding-top: 2px; padding-bottom: 2px;">GNMA</td>
      </tr>
      ${tableBodyGNMA}
      <tr><td><br></td></tr>
      <tr>
      <td colspan="16" style="background-color: #005eB8; padding: 0px; margin: 0px; height: 3px;"></td>
      </tr>
      <tr>
      <td colspan="16" style="background-color: #E81C2D; color: #FFFFFF; font-size: 14px; font-weight: bold; padding-top: 2px; padding-bottom: 2px;">Spec Payup</td>
      </tr>
      ${tableBodySPEC}
      <tr><td><br></td></tr>
      </tbody>
</table>
<br>
<br>
</body>
</html>
  `;
  
  // 2. Convert the HTML string directly into a PDF blob (In-Memory Only)
  const htmlBlob = Utilities.newBlob(htmlContent, 'text/html', 'my_document.html');
  
  return htmlBlob;
}

function createPDFrows(p, rowsArr){  
  rowsArr[0] += `<th colspan="4" style="background-color: #F0F0F0; font-weight: bold; font-size: 12px; border-bottom: 1px dashed black;">${p[0]}</th>`;
  rowsArr[1] += `<td>
                        <p  style="text-align: center; border-bottom: 1px solid black;">Rate</p>
                    </td>
                    <td>
                        <p  style="text-align: center; border-bottom: 1px solid black;">30-Day</p>
                    </td>
                    <td>
                        <p  style="text-align: center; border-bottom: 1px solid black;">45-Day</p>
                    </td>
                    <td>
                        <p  style="text-align: center; border-bottom: 1px solid black;">60-Day</p>
                    </td>`;
  for(var j = 1; j<19; j++){
    k = j - 1;
    if(k > p[1][0].length -1){
      rowsArr[j + 1] += `<td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td>`;
    }
    else{
      rowsArr[j + 1] += `<td><p><strong>${p[1][0][k]}</strong></p></td><td><p>${p[1][1][k]}</p></td><td><p>${p[1][2][k]}</p></td><td><p>${p[1][3][k]}</p></td>`;
    }
}
  return rowsArr;
}

function createProdSections(prodSet){
  var tableBody = "";
    for(var s of prodSet){
      for(var r of s){
        if(r === `<td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td>` ||
        r === `<td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td>` ||
        r === `<td><p>-</p></td><td><p>-</p></td><td><p>-</p></td><td><p>-</p></td>`){
          continue;
        }
        tableBody += `<tr>
                          ${r}
                      </tr>`;
      }
  }
  return tableBody;
}
