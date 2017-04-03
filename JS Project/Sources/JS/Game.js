/*

include(fileName){  
document.write("<script type='text/javascript' src='"+fileName+"'></script>" );}  
include("..../stat2/compteur.js" ); */
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

/*-----------------------------------*/
/*Chargement des Images du Personnage*/

	var WalkLeft1 = new Image();
	WalkLeft1.src = 'common/Images/WorldSources/Personnages/Ube/UWL_1.png';
	var WalkLeft2 = new Image();
	WalkLeft2.src = 'common/Images/WorldSources/Personnages/Ube/UWL.png'

	var WalkRight1 = new Image();
	WalkRight1.src = 'common/Images/WorldSources/Personnages/Ube/UWR_1.png';
	var WalkRight2 = new Image();
	WalkRight2.src = 'common/Images/WorldSources/Personnages/Ube/UWR.png';

	var ImmobileLeft = new Image();
	ImmobileLeft.src = 'common/Images/WorldSources/Personnages/Ube/UIL.png';
	var ImmobileRight = new Image();
	ImmobileRight.src = 'common/Images/WorldSources/Personnages/Ube/UIR.png';

	//Initialisation de la variable d'image du perso
	var Perso = ImmobileRight;
	var Etat = 0;
	var direction = 'R';

/*-----------------------------------*/
/*Variables de fonctionnement du jeu */

var playpause = 'play';

/*-----------------------------------*/


var World=1;
var canvas = document.getElementById("canvas");
var img= new Image();
img.src='common/Images/WorldSources/Personnages/Ube/UIR.png';
var fondJeu = new Image();
fondJeu.src='common/Images/WorldSources/WorldBackground/World_'+World+'.png';
var affichage;
var Gamewidth = 600;
var GameHeight = 400;

function GameInitialisation(Gamewidth,GameHeight)
{
	ctx = canvas.getContext("2d"), 
	width = Gamewidth,
    height = GameHeight,
	keys = [],
	World=1,	
	playpause = 'SetGame',
	gameSetter='setgame';
	LevelInitialisation();	
	update();
	
	return ctx, width, height, keys, World,playpause, player, friction, gravity,affichage;
}

function LevelInitialisation()
{
    player = {
			    x : width/2,
			    y : height - 5,
			    width : 32,
			    height : 32,
			    speed: 3,
			    velX: 0,
			    velY: 0,
			    jumping: false
    		},
	/*Variable de Level*/
    friction = 0.8,
    gravity = 0.3,
	affichage=0;
	/*-----------------*/
	

	return player, friction, gravity,affichage;
}

GameInitialisation(Gamewidth,GameHeight);
	

canvas.width = width;
canvas.height = height;

function update()
{
	if(playpause == 'play' || (playpause == 'SetGame' && gameSetter=='setgame'))
	{
  // check keys
		if (keys[38] || keys[32]) {
		    // up arrow or space
		  if(!player.jumping){
		   player.jumping = true;
		   player.velY = -player.speed*2;
		  }
		}
		if (keys[39]) {
		    // right arrow
		    if (player.velX < player.speed) 
			{
		        player.velX++;
				direction = 'R';
				if(Etat == 1)
				{
					Perso = WalkRight1;
				}
				else
				{
					Perso = WalkRight2;
				}
														
		    }
		}
		if (keys[37]) 
		{
		    // left arrow
		    if (player.velX > -player.speed) 
			{
		        player.velX--;
				direction = 'L';
				if(Etat == 1)
				{
					Perso = WalkLeft1;
				}
				else
				{
					Perso = WalkLeft2;
				}
				
		    }
		}
	
		function Marche ()
		{
			if(Etat == 1)
			{
				Etat = 0 ;
			}
			else
			{
				Etat = 1;
			}
			return Etat;
		
		}
		setInterval(function(){EtatdeMarche = Marche ();},1000);

		document.onkeyup=function ()
							{
								if(direction == 'R')
								{
									Perso = ImmobileRight;
								}
								else
								{
									Perso = ImmobileLeft;
								}
								Etat=0;
							}
		player.velX *= friction;
	   
		player.velY += gravity;
	  
		player.x += player.velX;
		player.y += player.velY;
		
		if (player.x >= width-player.width+40) {
		    player.x = 0;
		    affichage ++;
		    console.log(affichage);
		   //Def coordonnée min en x 
		} else if (player.x <= 0) {
		    if(affichage==0)
		    {
		        player.x = 0;
		    }
		    else
		    {
		        if(player.x <= -40)
		        {
		            player.x = width-player.width;
		            affichage --;
		            console.log(affichage);
		        }
		        
		    }
		}
	  
		if(player.y >= height-62-player.height){
		    player.y = height-62- player.height;
		    player.jumping = false;
		}
	  
	  ctx.clearRect(0,0,width,height);
	  ctx.drawImage(fondJeu,0,0,width,height)
	  ctx.drawImage(Perso,player.x, player.y, player.width, player.height);
		
	  requestAnimationFrame(update);
	}
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

document.getElementById('restart').onclick=function(){LevelInitialisation(Gamewidth,GameHeight);};
document.getElementById('pause').onclick=	function()
											{
												if(playpause == 'play')
												{
													playpause ='stop';
												}
												else
												{
													playpause = 'play';
													update();
												}
												console.log(playpause);
											};
document.onkeypress						 =	function()
											{
												if(keys[27])
												{
													if(playpause == 'play')
													{
														playpause ='stop';
													}
													else
													{
														playpause = 'play';
														update();
													}
													console.log(playpause);
												}
											};

window.addEventListener("load",function()
								{
										update();
								}
						);



