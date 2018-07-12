var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.get('/',function(req,res){
	res.render('index',{
		title:'Wheater App By City Name',
		weather:null,
		error:null
	}
	);
});

app.post('/',function(req,res){

	var apiKey = 'bd3c8921aadcb8c10aeb213a56767f7c';
    var city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`

    request(url,function(err,response,body){
    	if(err){
            res.render('index',{
				title:'Wheater App By City Name',
				weather:null,
				error:'Something went wrong!'
			});
    	}else{
            console.log('body:', body);
            var weather = JSON.parse(body);
            if(weather.main == undefined){
               res.render('index',{
				title:'Wheater App By City Name',
				weather:null,
				error:'Something went wrong!'
			   });
            }else{
            	var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {title:'Wheater App By City Name',weather: weatherText, error: null});
            }
    	}
    });
});



app.listen(3000, function(){
	console.log('port running at 3000..')
});