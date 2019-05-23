var start = function() {

    output("GOLDEN DRAGON <br/><br/+>" +
      "Things to be done <br>Explore ... 20%<br/>Shop ... 70%<br>Arena ... 20%<br>");
  
    //prompts player for their name
    var getName = function() {
      player.name = prompt("What's your name?");
    }
    getName();
  
    //checks if the user has pressed the 'how to play button'
    var ifPlayerName = function() {
      parent = document.getElementById("container");
      child = document.getElementById("howTo");
  
      parent.removeChild(child);
    }
    ifPlayerName();
  };
  
  //sets var output to the txt on screen
  var output = function(txt) {
    document.getElementById("game").innerHTML = txt;
  };
  
  //holds player locations visited
  var first_forest_visit = 0;
  var unlocked_battle = 0;
  
  //<==== PLAYER INFORMATION =====>
  var player = {
    name: "Unknown",
    
    location: explore,
  
    health: 100,
  
    strength: 0,

    agility: 0,

    stamina: 0,

    level: 1,

    experience: 0,
  
    money: 1000,
  
    abilities: [],
    
    hasHealth: function () {
      if(this.health < 0){
        this.health = 0;
      }
    }
  };
  // <==================== RANDOM STATS ==========================>
  player.strength = Math.floor(Math.random() * Math.floor(3));
  player.stamina = Math.floor(Math.random() * Math.floor(3));
  player.agility = Math.floor(Math.random() * Math.floor(3));
  //<==== PLAYER INFORMATION =====>
  
  //<===== Explore ======>
  var explore = function() {
    //clears the game screen upon visit
    var clearUponVisit = function() {
      output("");
      add_output = document.getElementById("game");
    }
    clearUponVisit();
  
    //runs the first time the player visits 'forest'
    var checkFirstVisit = function() {
      if (first_forest_visit === 0) {
        player.money += 15;
        output("You find a body of a fallen soldier...<br/> " +
          "Next to him is a sack of gold!<br/><br/> Obtained 15 gold!<br><br>");
  
        first_forest_visit += 1;
  
      }
    }
    checkFirstVisit();
  
    //displays default header text upon visit
    var displayHeaderText = function() {
      add_output.innerHTML += "You walk through the forest and hear people<br/>";
    }
    displayHeaderText();
  
    //<--- RANDOM EVENT ----->
    randEvent = function() {
      var doge = Math.floor(Math.random() * 100);
      return doge;
    };
    var randEvent = randEvent();
  
    if (first_forest_visit == 1) {
      add_output.innerHTML += "<button style='padding: 2em;' class = 'gameButton' onClick = 'theShop()'>Move towards people</button> <br/>";
  
      randEvent = -1;
    }
  
    switch (randEvent) {
      case 1, 25, 30, 45, 50, 60, 75, 99:
        add_output.innerHTML += "<br> You found 100 gold...";
        player.money += 100;
        break;
      default:
        add_output.innerHTML += "";
        break;
    }
    //<--- RAND EVENT ----->
  
    //checks if the player own an ability - if so [battle] is unlocked!
    var checkPlayerAbilities = function() {
  
      if (player.abilities.length >= 1 && unlocked_battle === 0) {
        document.getElementById("battleButton").style.display = "inline-block";
  
        add_output.innerHTML += "<br>UPDATE!<br>";
        add_output.innerHTML += "<br>After puchasing your new weapon you can now go to battle!<br>";
        add_output.innerHTML += "<br>You can now search for opponents!<br>";
        unlocked_battle += 1;
      }
    }
    checkPlayerAbilities();
  
  };
  //<======== Enemies =========>
  
  enemies = [
    {
      id: 0,
      name: "Goblin",
      
      health: 50,
      power: 3,
        
      money: 10,
      strength: 1,

      experience: 20,
      
      speech: "Wraaa!"
    },
    {
      id: 1,
      name: "Knight",
      
      health: 100,
      power: 5,
        
      money: 20,
      strength: 10,

      experience: 30,
      
      speech: "It's really hot with this helmet on"
      
    },
    {
      id: 2,
      name: "Orc",
      
      health: 250,
      power: 8,
        
      money: 30,
      strength: 15,

      experience: 50,
      
      speech: "Fight me human!"
    },
    {
      id: 3,
      name: "Ogre",
      
      health: 500,
      power: 10,
        
      money: 50,
      strength: 20,

      experience: 70,
      
      speech: "You look as tasty as the previous human"
    },
    {
      id: 4,
      name: "Dragon",

      health: 700,
      power: 15,

      money: 1000,
      strength: 30,

      experience: 100,

      speech: "Rwarrr!"
    }
  ];

  // <============ RANDOM LOOT ================>

  loot = [{
    id: 0,
    name: "Diamonds",

    value: 200,
    description: "Shiny!"
  },
  {
    id: 1,
    name: "Wood",

    value: 50,
    description: "Bunch of wood"
  }
];

// <============= INVENTORY ===================>

inventory = [{

}];
  
  //<========= BATTLE FUNCTIONS ===============>
  
  var battleWorld = function (enemyID) {
      //checks player if they have less than 1 health, if so health = 0;
      player.hasHealth();
    
      var gameScreen = document.getElementById("game");
      gameScreen.innerHTML = "";
          
      //if user is in Battle
      if(player.inBattle && enemyID != undefined){
          
          userInBattle(enemyID);
          
      } 
      
      //if not in battle
      else {
          
          //creates holding [divs]
          var displaySelectScreen = function () {
              gameScreen.innerHTML += "<div id='select'>SELECT OPPONENT</div>";
              gameScreen.innerHTML += "<br /> <div id='opponentList'></div>"
          };
          displaySelectScreen();
          
          //generates opponent buttons and [inBattle] function
          var generateOpponents = function () {
              var opponentDiv = document.getElementById("opponentList");
              
              for(var i = 0; i<enemies.length; i++){
                  opponentDiv.innerHTML += "<br /><br /><button style ='padding: 0.5em; 'onClick = 'inBattle("+enemies[i].id+")' class = 'enemyButtons'>"+enemies[i].name+"<br /> Level: "+enemies[i].health/10+"</button>";
              }
          };
          generateOpponents();
          
          inBattle = function (enemyID) {
              player.inBattle = true;
              
              //sends enemyID to battleworld();
              battleWorld(enemyID);
          
          }
      
          
      };
      
      //USER IN BATTLE
      userInBattle = function(enemyID){
          var gameScreen = document.getElementById("game");
          var enemy = enemies[enemyID];
          
          
          //creates battle screen;
          var displayBattleScreen = function () {
              gameScreen.innerHTML += "BATTLE MODE!";
              gameScreen.innerHTML += "<div 'abilitiesAvailable'></div>";
          }
          displayBattleScreen();
          
          //display enemy information
          var displayEnemy = function (id) {
              gameScreen.innerHTML += "<br /><br />Fighting: " + enemy.name;
              gameScreen.innerHTML += '<center><img src="img/enemies/' + enemy.name.toLowerCase() +'.png" alt ="' + enemy.name + '"class="img-avatar"><div><h3></center>';
              gameScreen.innerHTML += "<br /><br /><div id = 'enemyHealthBar'></div>";
              gameScreen.innerHTML += "<div id = 'enemyHealth'></div>";
              gameScreen.innerHTML += "Enemy health";
              gameScreen.innerHTML += "<br /><center> \"" + enemy.speech +"\"</center>";
              
          }
          displayEnemy(enemyID);
          
          //display player information
          var displayPlayerInfo = function () {
              
              var createPlayerHealthBar = function (){
                  gameScreen.innerHTML += "<div id = 'playerHealthBar'></div>";
                  gameScreen.innerHTML += "Your health";
                  healthBar = document.getElementById("playerHealthBar");
                  if(player.health > 0){
                  healthBar.style.width = player.health+'%';
                  } else {
                  healthBar.style.width = 1 + '%';
                  }
                  healthBar.style.height = 2+'%';
                  healthBar.style.borderRadius = '15px 15px'
                  
                  healthBar.style.margin = 'auto'
                  
                  healthBar.style.backgroundColor = 'lime';
                  
                  healthBar.style.display = 'block';
                  
              }
              createPlayerHealthBar();
              
              
          };
          displayPlayerInfo();
          
          //creates [abilities buttons]
          var displayAbilitiesAvailable = function(){
          gameScreen = document.getElementById("game");
          gameScreen.innerHTML += "<br />";
            //creates enemy HealthBar here
            var createEnemyHealthBar = function (){
              var enemyHealthBar = document.getElementById('enemyHealthBar');
  
              enemyHealthBar.style.height = 2+'%';
              enemyHealthBar.style.borderRadius = '15px 15px'
  
              enemyHealthBar.style.margin = 'auto'
  
              enemyHealthBar.style.backgroundColor = 'red';
  
              enemyHealthBar.style.display = 'block';
            }
            createEnemyHealthBar();
  
          for(var x in player.abilities){
              gameScreen.innerHTML += "  <button style = 'padding: 1em;' onClick = 'updateBattleInformation("+player.abilities[x].id+")'>"+player.abilities[x].name+"<br />Attack Damage: "+player.abilities[x].power+"</button>";
          }
  
          };
          displayAbilitiesAvailable();
          
          healthBar = {
              length: 50,
          }
          
          currentEnemyInfo = {
              health: enemies[enemyID].health,
              max_health: enemies[enemyID].health,
              power: enemies[enemyID].strength,
              
              money: enemies[enemyID].money,
              strength: enemies[enemyID].strength,
              experience: enemies[enemyID].experience,
          }
          
          //[ability buttons] -> gets the ability information;
          updateBattleInformation = function(abilityID){
  
              var playerDamage = abilityList[abilityID].power*((player.strength + player.agility + player.stamina)/10);
              var playerHealth = player.health;
              var max_health = currentEnemyInfo.max_health;
  
              
              var enemyHealth = currentEnemyInfo.health;
              var enemyPower = currentEnemyInfo.power;
              
              enemyHealth -= playerDamage; //updated enemy health
              
              playerHealth -= enemyPower; //updated player health
            
    
              
              //if ENEMY or PLAYER hit 0 health
              if(enemyHealth <= 0){
                  playerWin(currentEnemyInfo.money, currentEnemyInfo.experience);
              } 
              else if (playerHealth <= 0){
                  player.health = 0;
                  playerLost();
              }
              
              
               //<------ ENEMY HEALTH BAR UPDATES -------->
              if(document.getElementById("enemyHealthBar")){
                           document.getElementById("enemyHealthBar").style.maxWidth = '100%';
              document.getElementById("enemyHealthBar").style.width = (enemyHealth/max_health)*100 + "%";
              }
              
              //<------ ENEMY HEALTH BAR UPDATES -------->
              
              
              currentEnemyInfo.health -= playerDamage;
              player.health = playerHealth;
  
              
              //<------ PLAYER HEALTH BAR UPDATES -------->
              if(playerHealth >= 0 && document.getElementById('playerHealthBar')){
              if(playerHealth){
              document.getElementById('playerHealthBar').style.width = player.health + '%';
              } else{
              document.getElementById('playerHealthBar').style.width = 1 + '%';
              }
              }
              //<------ PLAYER HEALTH BAR UPDATES -------->
              
              
              
              
  
  
          }
          
      }
      
      
      //player Win
      
      var playerWin = function (money, experience) {
          document.getElementById("game").innerHTML = "Congratulations you won! <br /> Gained money: " + money + "<br/>Gained experience: " + experience + "<br/>Gained loot: " ;
          document.getElementById("game").innerHTML += "<br /> <button style='padding: 2em;' onClick = 'battleWorld()'>Return</button>";
  
          player.money += money;
          player.experience += experience;
          
          player.inBattle = false;
          levelUp();
      };
      
      //player Lost
      var playerLost = function () {
          gameScreen = "";
        
          document.getElementById("game").innerHTML = "You lost...";
          document.getElementById("game").innerHTML += "<br/ ><button style ='padding: 1em;' onClick = 'battleWorld()'>Return</button>";
          
          player.inBattle =false;
          alert("You died! Better luck next time!");
          location.reload();
      }
  
  }
  
  //<========= BATTLE FUNCTIONS ===============>
  
  
  //STATS button
  displayStats = function() {
    clearGameWindow();
    var hold = [];
    for (var i = 0; i < player.abilities.length; i++) {
      hold.push(" " + player.abilities[i].name)
    };
  
    output(
      "Name: " + player.name + "<br/>" +
      "Strength: " + player.strength + "<br>" +
      "Agility: " + player.agility + "<br>" +
      "Stamina: " + player.stamina + "<br>" +
      "Level: " + player.level + "<br>" +
      "Experience: " + player.experience + "<br>" +
      "Money: " + player.money + "<br>" +
      "Health: " + player.health + "<br />"+
      "Weapons: " + hold
    );
  };
  
  //clears text from game
  var clearGameWindow = function() {
    document.getElementById("game").innerHTML = "";
  };
  
  // <================== SHOP FUNCTIONS ======================>
  
  //displays shop button
  theShop = function() {
  
    if (first_forest_visit == 1) {
      document.getElementById("shopButton").style.display = "inline-block";
      first_forest_visit += 1;
    
  
    clearGameWindow();
  
    output("While walking towards people you see an old tavern called Golden Dragon and next to it a shop!");
    add_output.innerHTML += "<br><br>UPDATE!";
    add_output.innerHTML += ("<br><br> You unlocked the Shop!");
    }
  
  };
  
  // <================== SHOP FUNCTIONS ======================>
  
  var shopWorld = function () {
    //sets player location to ShopWorld
    if(player.location != "theShop"){
      player.location = 'theShop';
    }
    
    //if player location is set to 'shopWorld'  
    console.log(player.location);
    
    var shop = document.getElementById("game");
    var clearShop = function () {shop.innerHTML = "";}
    clearShop();
    
    if(player.location === "theShop"){
      var shop = document.getElementById("game");
      var abilities = abilityList;
          
      //display money
      shop.innerHTML += "<div id ='shopMoney'>Money: "+player.money+"</div><br />";
      
      //display each ability available
      for(var x in abilities){
        console.log(player.abilities[x]);
          if(player.abilities[x] == undefined){
          shop.innerHTML += "   <button onclick='purchase("+x+")'style='padding: 0.3em; font-size: 80%; font-family: Monospace;'>" + abilities[x].name+"<br/> Damage: "+abilities[x].power+
          "<br/>Cost: " + abilities[x].cost+ "</button>";
          }
        
      }
      
      
      //make this here so it appears after the ability list
      game.innerHTML += "<br /><div style='font-size: 80%;' id = 'warning'></div>";
      game.innerHTML += "<br /><div style='color: lime;' id='allGood'></div>";
      
      //if player selects an ability -> this runs and if player owns it then it displays results
      purchase = function (id) {
        var warning = document.getElementById('warning');
        var allGood = document.getElementById('allGood');
        var shopMoney = document.getElementById('shopMoney');
        //if player owns more than 1 ability - check and see if player already owns the ability
    
        checkIfOwned = function () {
          for(var x in player.abilities){
            if(player.abilities[x].id == abilityList[id].id){
              //break is here so console doesn't log (can't property undefined);
              return false;
              break;
            }
          }
          return true;
        };
        checkMoney = function () {
          if(player.money < abilityList[id].cost){
            return false;
          }
          return true;
        }
        
        
        if(!checkIfOwned()){
          
          warning.innerHTML = "You already own: " + abilityList[id].name;
          allGood.innerHTML = "";
          
        } else if (!checkMoney()) {
          warning.innerHTML = "You don't have enough money to purchase: " + abilityList[id].name;
          allGood.innerHTML = "";
        }
        else {
          //displays green text
          allGood.innerHTML = "You purchased: " + abilityList[id].name
      
          //player.money - ability cost
          player.money -= abilityList[id].cost;   
          
          //money updates
          shopMoney.innerHTML = "Money: " + player.money;
        
          //ability bought will push to player abilities
          player.abilities.push(abilityList[id]);
        }
        
        
      }
      
      //creates health Div and everything health display goes here
      var displayHealthShop = function () {
        game.innerHTML += "<div id = 'healthUpdate'>Health: " + player.health + "</div>";
        game.innerHTML += "<br /><div id = 'healShop'></div>";
        var healthDiv = document.getElementById('healShop');
             
        healthDiv.innerHTML += "<button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(25, 5)'>Heal: 25 Health<br />Cost: 5 Money</button>";
        
        healthDiv.innerHTML += "   <button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(50, 10)'>Heal: 50 Health<br />Cost: 10 Money</button>";
        
        healthDiv.innerHTML += "   <button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(100, 20)'>Heal: 100 Health<br />Cost: 20 Money</button>";
        
           if(player.health >= 100){
          document.getElementById('healShop').style.display = "none";
        }
        
      }
      displayHealthShop();
      
      
      
      
    }
    
    //buy health
    buyHealth = function (health, cost) {
        //check if player has max health, or no health
      //located if(player.location === 'theshop')--> first (if);
      
      
      //if money and doesn't exceed health -> runs
      if((player.health+health) <= 100 && player.money >= cost){
        
        player.health += health;
        player.money -= cost;
        
        
        document.getElementById('allGood').innerHTML = "Health +" + health;
        document.getElementById('healthUpdate').innerHTML = "Health: " + player.health;
        
      }
      //if player has less money or health
      else {
        //less money
        if(player.money < cost){
          document.getElementById('warning').style.color = 'red';
        document.getElementById('warning').innerHTML = "<br />Money: " + player.money + " - purchase something less than " + cost + " money...";
        } 
        //less health
        else{
        document.getElementById('warning').style.color = 'red';
        document.getElementById('warning').innerHTML = "<br />Health: " + player.health + " - purchase something less than " + health + " health...";
        }
      }
      
      }
    
  };
  
  // <================== SHOP FUNCTIONS ======================>
  
  // <================== WEAPONS ==================>
  var Ability = function(id, name, type, power, stamina_cost, cost, text) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.power = power;
    this.cost = cost;
    this.text = text; 
    
    this.checkStamina = function () {
      if(player.stamina < this.stamina_cost){
        console.log("You don't have enough power to use this!");
        this.power = 0;
      };
    }
  };
  
  abilityList = [
  //(ID, name, type, power, stamina_cost, cost, text)
  new Ability(0, "Stick", "weapon", 10, 3, 15, "Wooden stick"),
  new Ability(1, "Knife", "weapon", 15, 5, 30, "Rogue knife"),
  new Ability(2, "Bow", "weapon", 20, 10, 50, "Wooden bow"),
  new Ability(3, "Sword", "weapon", 25, 15, 100, "A fine sword"),
  new Ability(4, "Firesword", "weapon", 40, 20, 200, "BURNING!")
  ];
  // <================== ABILITIES ==================>
  
  document.getElementById('game').style.overflow = 'hidden';

  // <================== LEVEL UP ====================>

  var levelUp = function(){
    if(player.experience == 100)
    {
        player.level += 1;
        player.experience = 0;
        player.strength += 3
    }
    else if(player.experience > 100)
    {
        player.level += 1;
        player.experience -= 100;
        player.strength += 3
    }
  }