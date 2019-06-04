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
        
          
thisCity.innerHTML="<b>YOUR CITY</b>"+"<br>"+'<img src="https://openweathermap.org/img/w/'+data.weather[0].icon+'.png">'+"<br>"+Math.round(data.main.temp-273)+"℃"+"<br>"+data.name+","+data.weather[0].description;
           }
      }

}  
  getThisCity ()
 });