window.onload=function(){
chekLs();
showCity();
getExchange();
setInterval(getExchange,3600000);
}

var arrOfTowns=[];
var add=document.getElementById('add');
var thisCity= document.getElementById('thisCity');
 navigator.geolocation.getCurrentPosition(function (position){
 var lat = position.coords.latitude;
 var lng = position.coords.longitude;

 function getThisCity (){
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var xhttp = new XMLHttpRequest();
 xhttp.open("GET",`${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=ae0f2116b81c9b8d32f1d370cfecd486`); 
    xhttp.send();
    xhttp.addEventListener('readystatechange',getCity);

    function getCity(){
        if(xhttp.status===200 && xhttp.readyState===4){   
          var data=JSON.parse(xhttp.responseText);
          console.log(data)
        
          
thisCity.innerHTML="<b>YOUR CITY</b>"+"<br>"+'<img src="https://openweathermap.org/img/w/'+data.weather[0].icon+'.png">'+"<br>"+Math.round(data.main.temp-273)+"℃"+"<br>"+data.name+", "+data.weather[0].description;
           }
      }

}  
  getThisCity ()
 });



 
function getData (){
    var showTown=document.getElementById('show');
    var town=document.getElementById('chooseTown');
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${proxy}http://api.openweathermap.org/data/2.5/weather?q=${town.value} &APPID=ae0f2116b81c9b8d32f1d370cfecd486`); 
    xhttp.send();
    xhttp.addEventListener('readystatechange',getCity);
 
    function getCity(){
        if(xhttp.status===200 && xhttp.readyState===4){   
          var data=JSON.parse(xhttp.responseText);
          arrOfTowns.push(data);
          localStorage.setItem("towns",JSON.stringify(arrOfTowns));
          console.log(arrOfTowns)
          showCity();
           }
      }

}



function chekLs(){
 if(localStorage.getItem('towns') != null) {
   arrOfTowns=JSON.parse(localStorage.getItem('towns'));}  
  
}
function showCity(){
      var element="";
      for(let i=0; i< arrOfTowns.length; i++){
       element=element+'<div id="single">';
      element=element+arrOfTowns[i].name+','+arrOfTowns[i].sys.country;
     
      element=element+'<div id="s">'+'<img src="https://openweathermap.org/img/w/'+arrOfTowns[i].weather[0].icon+'.png">'+'</div>';
      element=element+'<div id="s">'+Math.round(arrOfTowns[i].main.temp-273)+"℃"+'</div>';
      element=element+'<div id="s">'+arrOfTowns[i].weather[0].description+"<br>"+"wind: "+arrOfTowns[i].wind.speed+" mph"+"<br>"+"humidity: "+arrOfTowns[i].main.humidity+"%"+'</div>'; 
         element=element+'<div id="s">'+'<button dataArt ="'+[i]+'" class= "del">Delete</button>'+'<br>'+'<button dataArt ="'+arrOfTowns[i].name+'" numb ="'+[i]+'" class= "ref">Refresh</button>'+'</div>';
     
        
        element=element+'</div>';
     }
      show.innerHTML=element;
}


function refresh(event){ 
if (event.target.className==="ref"){
var atr= event.target.getAttribute("dataArt");
var numb=event.target.getAttribute("numb");  
getData();
}
function getData (){

    var proxy = "https://cors-anywhere.herokuapp.com/";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",`${proxy}http://api.openweathermap.org/data/2.5/weather?q=${atr} &APPID=ae0f2116b81c9b8d32f1d370cfecd486`); 
    xhttp.send();
    xhttp.addEventListener('readystatechange',getCity);
 
    function getCity(){
        if(xhttp.status===200 && xhttp.readyState===4){   
          var data=JSON.parse(xhttp.responseText);
          arrOfTowns.splice([numb],1,data);
          showCity();
          localStorage.setItem("towns",JSON.stringify(arrOfTowns));
          console.log(arrOfTowns)
      
           }
      }

}
  
}


function del(event) {
if (event.target.className==="del"){
var atr= event.target.getAttribute("dataArt");
arrOfTowns.splice([atr],1);
showCity();
localStorage.setItem("towns",JSON.stringify(arrOfTowns));

}
}
var  exchange=document.getElementById('exchange');
var  buy=document.getElementById('buy');
var  sale=document.getElementById('sale');
function getExchange (){ 
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    xhttp.send();
    xhttp.addEventListener('readystatechange',getValute);
 
    function getValute(){
        if(xhttp.status===200 && xhttp.readyState===4){   
          var valute=JSON.parse(xhttp.responseText);
          console.log(valute)   
  exchange.innerHTML="<b>Курс валют</b>"+"<br>"+valute[0].ccy+"<br>"+valute[1].ccy+"<br>"+valute[2].ccy;
  buy.innerHTML="Покупка"+"<br>"+valute[0].buy+"<br>"+valute[1].buy+"<br>"+valute[2].buy;        
sale.innerHTML="Продажа"+"<br>"+valute[0].sale+"<br>"+valute[1].sale+"<br>"+valute[2].sale;               
        }    
      }
}


  
 document.addEventListener("click",refresh);
 document.addEventListener("click",del);
 add.onclick=getData;