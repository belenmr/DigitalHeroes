const express = require('express');
const fs = require('fs');
const app = express();

app.listen(3030, () => console.log('Server running in 3030 port'));

const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));


app.get('/', function (req,res){
	res.send("Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.");
});


app.get('/heroes', (req, res) => {
	res.send(heroes);
});


app.get('/heroes/detalle/:id', (req,res) => {	
	let heroe = heroes.find(heroe => heroe.id === Number(req.params.id) )
	//console.log(heroe);
	
	if (heroe === undefined) {
		res.send("Heroe no encontrado")
	} else {
		res.send(`Hola, mi nombre es ${heroe.nombre} y soy ${heroe.profesion}`)
	}	
});


app.get('/heroes/bio/:id/:ok?', (req, res) => {	
	let heroe = heroes.find(heroe => heroe.id === Number(req.params.id) )
	//console.log(req.params.ok);
	//console.log(typeof req.params.ok);

	if (heroe === undefined) {
		res.send("No encontramos un héroe para mostrarte su biografía")
	} else if (req.params.ok.toLowerCase() === 'ok'){
		res.send(`Heroe: ${heroe.nombre} <br> Reseña: ${heroe.resenia}`)
	} else {
		res.send(`${heroe.nombre} dice: Lamento que no quieras saber más de mí :(`)
	}	
});


app.get('/creditos', (req, res) => {
	res.send("Creditos <br> Ejercicio realizado por Belén Medina Roldán");
})


app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});