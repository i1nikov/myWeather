var  exchange=document.getElementById('exchange');
var  buy=document.getElementById('buy');
var  sale=document.getElementById('sale');
function getData (){ 
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    xhttp.send();
    xhttp.addEventListener('readystatechange',getValute);
 
    function getValute(){
        if(xhttp.status===200 && xhttp.readyState===4){   
          var valute=JSON.parse(xhttp.responseText);
          console.log(valute)   
  exchange.innerHTML="<br>"+valute[0].ccy+"<br>"+valute[1].ccy+"<br>"+valute[2].ccy;
  buy.innerHTML="Покупка"+"<br>"+valute[0].buy+"<br>"+valute[1].buy+"<br>"+valute[2].buy;        
sale.innerHTML="Продажа"+"<br>"+valute[0].sale+"<br>"+valute[1].sale+"<br>"+valute[2].sale;               
        }    
      }
}
getData();