//=============================================================================
// INDIE_Debugger.js
//=============================================================================

/*:
* @plugindesc Debugger plugin
* @author Soczó Kristóf
* @help
* Fasza debugger rendszer
* Script commands: this.logCommonEvent(n) change the n with your common event id
* this.logEvent(this._eventId); will print the event name and if you are using the this.finishEvent(this._eventId); you can make a better hierarchy
* this.createEventLabel(1, "Hello World", "red");
* 
* Kapcsold kia  log ablakot amíg HARC vAN ! (KÉSZ)
* Track list:   Switcher state
*               Self Switch State
*               Variables changes
*               Level up / Down (both manual, and automatically)
*               Item gain / Remove
*               Money gain / remove
*               Teleport from / to
*               Waiting 
*               Common event (manually)
*               Erase event
*               Party changed (add / remove)
*               Battle LOG (win/ lose / escaped / defated mobs / battle time)
*               Quest Jorunay (Yanfly)
*
* Quest Journay supported logs: Plugin commands only: Only support Quest (and not objectives) - Completed, Failed, Add, remove, AVAILABLE 
*
* @param Windows
*
* @param EnableGoldWindow
* @text Show the Gold Window
* @parent Windows
* @type boolean
* @default true
* @desc enable or display to display the gold window
*
* @param EnableGameTimeWindow
* @text Show the Game Time Window
* @parent Windows
* @type boolean
* @default true
* @desc enable or display to display the game time window
*
* @param EnableStepCounterWIndow
* @text Step Counter Window
* @parent Windows
* @type boolean
* @default true
* @desc enable or dsiable the Step Counter window
*
* @param EnableLogWindow
* @text Log window
* @parent Windows
* @type boolean
* @default true
* @desc enable or dsiable the log Window
*
* @param LogWindowScrollUp
* @text Scroll Up
* @parent Windows
* @type text
* @default y
* @desc set your custom shorcut for the scrolling up the log window
*
* @param LogWindowScrollDown
* @text Scroll Down
* @parent Windows
* @type text
* @default c
* @desc set your custom shorcut for the scrolling down the log window
*
* @param SmartFadeEnable
* @text Smart fade
* @parent Windows
* @type boolean
* @default true
* @desc enable or dsiable the Smart fade function.
*
* @param EnableParalellRunningLog
* @text Enable Paralell Log
* @parent Windows
* @type boolean
* @default false
* @desc still in development...
*
* @param Logs
*
* @param EnableBattleLogs
* @text Enable Battle logs
* @parent Logs
* @type boolean
* @default true
* @desc enable or disable the Battle logs. (will show after battle end)
*
* @param EnableQuestLog
* @text Enable Quest Log
* @parent Logs
* @type boolean
* @default false
* @desc enable or disable the Yanfly Quest Journay Plugin logs
*
* @param EnableVarTracker
* @text Enable Variables log
* @parent Logs
* @type boolean
* @default true
* @desc enable or disable the log for the Variables changes
*
* @param StarterVariable
* @text Starter Variable
* @parent Logs
* @type variable
* @default 2
* @desc Variable for game starter log track. Delete if not need starter log. Please use greater then 1 var value if need.
*
* @param EnableSelfSwitch
* @text Enable Self Switch log
* @parent Logs
* @type boolean
* @default true
* @desc enable or disable the self switch logs
*
* @param Modal Window Group #1
*
* @param EnableModalWinGroup1
* @text Enable Group #1
* @parent Modal Window Group #1
* @type boolean
* @default true
* @desc Always just one modal group window can enable the same time
*
* @param ItemWatcher
* @text Enable Item Watcher #1
* @parent Modal Window Group #1
* @type item
* @desc select which item you want to track.
*
* @param ItemWatcher2
* @text Enable Item Watcher #2
* @parent Modal Window Group #1
* @type item
* @desc select which item you want to track.
*
* @param ItemWatcher3
* @text Enable Item Watcher #3
* @parent Modal Window Group #1
* @type item
* @desc select which item you want to track.
*
* @param Modal Window Group #2
*
* @param EnableModalWinGroup2
* @text Enable Group #2
* @parent Modal Window Group #2
* @type boolean
* @default false
* @desc Always just one modal group window can enable the same time
*
* @param PlayerInfo1
* @text Player info
* @type select
* @option Player Name
* @value PlayerName
* @option Player HP
* @value PlayerHP
* @option Player MP
* @value PlayerMP
* @option Player TP
* @value PlayerTP
* @option Player Level
* @value PlayerLevel
* @option Player Class
* @value PlayerClass
* @parent Modal Window Group #2
*
* @param PlayerInfo2
* @text Player info 2
* @type select
* @option Player Name
* @value PlayerName
* @option Player HP
* @value PlayerHP
* @option Player MP
* @value PlayerMP
* @option Player TP
* @value PlayerTP
* @option Player Level
* @value PlayerLevel
* @option Player Class
* @value PlayerClass
* @parent Modal Window Group #2
*
* @param PlayerInfo3
* @text Player info 3
* @type select
* @option Player Name
* @value PlayerName
* @option Player HP
* @value PlayerHP
* @option Player MP
* @value PlayerMP
* @option Player TP
* @value PlayerTP
* @option Player Level
* @value PlayerLevel
* @option Player Class
* @value PlayerClass
* @parent Modal Window Group #2 
*/

var INDIE = INDIE || {};
INDIE.Debugger = INDIE.Debugger || {};

(function($) {
    "use strict";


    var parameters = PluginManager.parameters('INDIE_Debugger');
    var enableGoldWindow = JSON.parse(parameters['EnableGoldWindow'] || 'true');
    var enableGameTimeWindow = JSON.parse(parameters['EnableGameTimeWindow'] || 'true');  
    var enableStepCounterWIndow = JSON.parse(parameters['EnableStepCounterWIndow'] || 'true');
    var enableLogWindow = JSON.parse(parameters['EnableLogWindow'] || 'true'); 
    var smartFadeEnable = JSON.parse(parameters['SmartFadeEnable'] || 'true');
    var EnableBattleLogs = JSON.parse(parameters['EnableBattleLogs'] || 'true');

    // yanfly Quest Journay
    var EnableQuestLog = JSON.parse(parameters['EnableQuestLog'] || 'false');

    // logs params
    var enableParalellRunningLog = JSON.parse(parameters['EnableParalellRunningLog'] || 'false');
    var EnableVarTracker = JSON.parse(parameters['EnableVarTracker'] || 'true');
    var EnableSelfSwitch = JSON.parse(parameters['EnableSelfSwitch'] || 'true');

    var StarterVariable = Number(parameters['StarterVariable'] || '2');

    var logScrollUpKey = parameters['LogWindowScrollUp'] || 'y'; // Default 'y'
    var logScrollDownKey = parameters['LogWindowScrollDown'] || 'c'; // Default 'c'

    // modal window group 1
    var EnableModalWinGroup1 = JSON.parse(parameters['EnableModalWinGroup1'] || 'true'); 
    var enableItemWatcherWindow = parameters['ItemWatcher'];
    var enableItemWatcherWindow2 = parameters['ItemWatcher2'];
    var enableItemWatcherWindow3 = parameters['ItemWatcher3'];

    // modal window group 2
    var EnableModalWinGroup2 = JSON.parse(parameters['EnableModalWinGroup2'] || 'false'); 
    var PlayerInfo1 = String(parameters['PlayerInfo1']);
    var PlayerInfo2 = String(parameters['PlayerInfo2']);
    var PlayerInfo3 = String(parameters['PlayerInfo3']);

    INDIE.Debugger.logData = INDIE.Debugger.logData || [];

    // Convert the characters to upper case, because JavaScript key codes are case-sensitive
    logScrollUpKey = logScrollUpKey.toUpperCase();
    logScrollDownKey = logScrollDownKey.toUpperCase();

    // Get the key codes from the characters
    var logScrollUpKeyCode = logScrollUpKey.charCodeAt(0);
    var logScrollDownKeyCode = logScrollDownKey.charCodeAt(0);

      // Update the keyMapper after getting the key codes
      Input.keyMapper[logScrollUpKeyCode] = 'scrollUp';
      Input.keyMapper[logScrollDownKeyCode] = 'scrollDown';
      
    // check dialogs & battle
    INDIE.Debugger.isDialogueRunning = false;
    INDIE.Debugger.isBattleRunning = false;

//=============================================================================
// ** Windows 
//=============================================================================


var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        if(enableGoldWindow){
            this._goldWindow = new GoldWindow(10, 10);  // Move the window 10px down and to the right
            this.addWindow(this._goldWindow);
        }
        if (enableGameTimeWindow) {  
            this._gameTimeWindow = new Window_GameTime();
            this.addChild(this._gameTimeWindow);
        }
        if (enableStepCounterWIndow) {
            this._stepCounterWindow = new Window_StepCounter();
            this.addChild(this._stepCounterWindow);
        }
        if (enableLogWindow) {
            this._debugLogWindow = new Window_DebugLog();
            this.addChild(this._debugLogWindow);
        }
        if (enableItemWatcherWindow) {
            this._itemWatcherWindow = new Window_ItemWatcher();
            this.addChild(this._itemWatcherWindow);
        }
        if (enableItemWatcherWindow2) {
            this._itemWatcherWindow2 = new Window_ItemWatcher2();
            this.addChild(this._itemWatcherWindow2);
        }
        if (enableItemWatcherWindow3) {
            this._itemWatcherWindow3 = new Window_ItemWatcher3();
            this.addChild(this._itemWatcherWindow3);
        }
        if (EnableModalWinGroup2) {
            if(PlayerInfo1) {
                this.PlayerInfo1 = new Window_PlayerInfo1();
                this.addChild(this.PlayerInfo1);
            }
        }
        if (EnableModalWinGroup2) {
            if(PlayerInfo2) {
                this.PlayerInfo2 = new Window_PlayerInfo2();
                this.addChild(this.PlayerInfo2);
            }
        }
        if (EnableModalWinGroup2) {
            if(PlayerInfo3) {
                this.PlayerInfo3 = new Window_PlayerInfo3();
                this.addChild(this.PlayerInfo3);
            }
        }
    };


//=============================================================================
// ** Modal Window Group 1
//=============================================================================

    // Item Watcher #1

    function Window_ItemWatcher() {
        this.initialize.apply(this, arguments);
    }
    
    Window_ItemWatcher.prototype = Object.create(Window_Base.prototype);
    Window_ItemWatcher.prototype.constructor = Window_ItemWatcher;
    
    Window_ItemWatcher.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = Graphics.boxWidth - 450; 
        var y = Graphics.boxHeight - 500 - height; 
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };
    
    Window_ItemWatcher.prototype.windowWidth = function() {
        return 140; 
    };
    
    Window_ItemWatcher.prototype.windowHeight = function() {
        return this.fittingHeight(0.45); 
    };
    
    Window_ItemWatcher.prototype.refresh = function() {
        this.contents.clear();
        var itemId = Number(enableItemWatcherWindow);
        var itemName = $dataItems[itemId].name;
        var itemQuantity = $gameParty.numItems($dataItems[itemId]);
        this.contents.fontSize = 13;
        this.drawText(itemName + ": " + itemQuantity, 0, -10);
    };
    

   
    // Item log
    // Azért írtuk ide, mert az item watcher -el egybe kellett rakni a Gainitem frissítés miatt.

    var _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._itemWatcherWindow) {
        SceneManager._scene._itemWatcherWindow.refresh();
    }
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();
        var logText = currentTime + " [ITEM]" + " " + item.name + " x" + Math.abs(amount);
        if(amount > 0){
            logText += " gained";
        } else {
            logText += " taken away";
        }
        scene._debugLogWindow.addLine(logText);
    }
};

// Item Watcher #2

function Window_ItemWatcher2() {
    this.initialize.apply(this, arguments);
}

Window_ItemWatcher2.prototype = Object.create(Window_Base.prototype);
Window_ItemWatcher2.prototype.constructor = Window_ItemWatcher2;

Window_ItemWatcher2.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - 450 + this.windowWidth() + 5; // Move this window to the right of the first one
    var y = Graphics.boxHeight - 500 - height; 
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_ItemWatcher2.prototype.windowWidth = function() {
    return 140; 
};

Window_ItemWatcher2.prototype.windowHeight = function() {
    return this.fittingHeight(0.45); 
};

Window_ItemWatcher2.prototype.refresh = function() {
    this.contents.clear();
    var itemId = Number(enableItemWatcherWindow2);
    var itemName = $dataItems[itemId].name;
    var itemQuantity = $gameParty.numItems($dataItems[itemId]);
    this.contents.fontSize = 13;
    this.drawText(itemName + ": " + itemQuantity, 0, -10);
};

// Item Watcher #3

function Window_ItemWatcher3() {
    this.initialize.apply(this, arguments);
}

Window_ItemWatcher3.prototype = Object.create(Window_Base.prototype);
Window_ItemWatcher3.prototype.constructor = Window_ItemWatcher3;

Window_ItemWatcher3.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - 450 + (this.windowWidth() * 2) + 10; // Move this window to the right of the second one
    var y = Graphics.boxHeight - 500 - height; 
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_ItemWatcher3.prototype.windowWidth = function() {
    return 140; 
};

Window_ItemWatcher3.prototype.windowHeight = function() {
    return this.fittingHeight(0.45); 
};

Window_ItemWatcher3.prototype.refresh = function() {
    this.contents.clear();
    var itemId = Number(enableItemWatcherWindow3);
    var itemName = $dataItems[itemId].name;
    var itemQuantity = $gameParty.numItems($dataItems[itemId]);
    this.contents.fontSize = 13;
    this.drawText(itemName + ": " + itemQuantity, 0, -10);
};



//=============================================================================
// ** Modal Window Group 2
//=============================================================================

// Player Info #1
function Window_PlayerInfo1() {
    this.initialize.apply(this, arguments);
}

Window_PlayerInfo1.prototype = Object.create(Window_Base.prototype);
Window_PlayerInfo1.prototype.constructor = Window_PlayerInfo1;

Window_PlayerInfo1.prototype.initialize = function() {
    this._playerName = $gameParty.leader().name();
    this._playerHP = $gameParty.leader().hp;
    this._playerClass = $gameParty.leader().currentClass().name;  // Új változó
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - 450; 
    var y = Graphics.boxHeight - 500 - height; 
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};


Window_PlayerInfo1.prototype.windowWidth = function() {
    return 140; 
};

Window_PlayerInfo1.prototype.windowHeight = function() {
    return this.fittingHeight(0.45); 
};

Window_PlayerInfo1.prototype.refresh = function() {
    this.contents.clear();
    if (PlayerInfo1 == "PlayerName") {
        this.contents.fontSize = 15;
        this.drawText($gameParty.leader().name(), 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo1 == "PlayerHP") {
        this.contents.fontSize = 15;
        this.drawText("HP: " + $gameParty.leader().hp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo1 == "PlayerMP") {
        this.contents.fontSize = 15;
        this.drawText("MANA: " + $gameParty.leader().mp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo1 == "PlayerTP") {
        this.contents.fontSize = 15;
        this.drawText("TP: " + $gameParty.leader().tp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo1 == "PlayerClass") {
        this.contents.fontSize = 15;
        this.drawText("Class: " + $gameParty.leader().currentClass().name, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo1 == "PlayerLevel") {
        this.contents.fontSize = 15;
        this.drawText("P Level: " + $gameParty.leader().level, 0, -10, this.contentsWidth(), 'left');
    }
};



Window_PlayerInfo1.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (PlayerInfo1 == "PlayerName" && this._playerName !== $gameParty.leader().name()) {
        this._playerName = $gameParty.leader().name();
        this.refresh();
    } else if (PlayerInfo1 == "PlayerHP" && this._playerHP !== $gameParty.leader().hp) {
        this._playerHP = $gameParty.leader().hp;
        this.refresh();
    } else if (PlayerInfo1 == "PlayerMP" && this._playerMP !== $gameParty.leader().mp) {  // refreshing
        this._playerMP = $gameParty.leader().mp;
        this.refresh();
    } else if (PlayerInfo1 == "PlayerTP" && this._playerTP !== $gameParty.leader().tp) {  // refreshing
        this._playerTP = $gameParty.leader().tp;
        this.refresh();
    } else if (PlayerInfo1 == "PlayerClass" && this._playerClass !== $gameParty.leader().currentClass().name) {
        this._playerClass = $gameParty.leader().currentClass().name;
        this.refresh();
    } else if (PlayerInfo1 == "PlayerLevel" && this._playerLevel !== $gameParty.leader().level) {
        this._playerLevel = $gameParty.leader().level;
        this.refresh();
    }
};

// Player Info #2
function Window_PlayerInfo2() {
    this.initialize.apply(this, arguments);
}

Window_PlayerInfo2.prototype = Object.create(Window_Base.prototype);
Window_PlayerInfo2.prototype.constructor = Window_PlayerInfo2;

Window_PlayerInfo2.prototype.initialize = function() {
    this._playerName = $gameParty.leader().name();
    this._playerHP = $gameParty.leader().hp;
    this._playerClass = $gameParty.leader().currentClass().name;
    this._playerMP = $gameParty.leader().mp; 
    this._playerTP = $gameParty.leader().tp; 
    this._playerLevel = $gameParty.leader().level; 
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - 450 + width;  // Módosítás: Az ablakot a korábbi ablak mellett jeleníti meg
    var y = Graphics.boxHeight - 500 - height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_PlayerInfo2.prototype.windowWidth = function() {
    return 140;
};

Window_PlayerInfo2.prototype.windowHeight = function() {
    return this.fittingHeight(0.45);
};

Window_PlayerInfo2.prototype.refresh = function() {
    this.contents.clear();
    if (PlayerInfo2 == "PlayerName") {  // Módosítás: PlayerInfo2-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText($gameParty.leader().name(), 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo2 == "PlayerHP") {  // Módosítás: PlayerInfo2-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("HP: " + $gameParty.leader().hp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo2 == "PlayerMP") {  // Módosítás: PlayerInfo2-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("MANA: " + $gameParty.leader().mp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo2 == "PlayerTP") {  // Módosítás: PlayerInfo2-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("TP: " + $gameParty.leader().tp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo2 == "PlayerClass") {  // Módosítás: PlayerInfo2-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("Class: " + $gameParty.leader().currentClass().name, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo2 == "PlayerLevel") {  // Módosítás: PlayerInfo2-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("P Level: " + $gameParty.leader().level, 0, -10, this.contentsWidth(), 'left');
    }
};

Window_PlayerInfo2.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (PlayerInfo2 == "PlayerName" && this._playerName !== $gameParty.leader().name()) {  
        this._playerName = $gameParty.leader().name();
        this.refresh();
    } else if (PlayerInfo2 == "PlayerHP" && this._playerHP !== $gameParty.leader().hp) {  
        this._playerHP = $gameParty.leader().hp;
        this.refresh();
    } else if (PlayerInfo2 == "PlayerMP" && this._playerMP !== $gameParty.leader().mp) { 
        this._playerMP = $gameParty.leader().mp;
        this.refresh();
    } else if (PlayerInfo2 == "PlayerTP" && this._playerTP !== $gameParty.leader().tp) {  
        this._playerTP = $gameParty.leader().tp;
        this.refresh();
    } else if (PlayerInfo2 == "PlayerClass" && this._playerClass !== $gameParty.leader().currentClass().name) {  
        this._playerClass = $gameParty.leader().currentClass().name;
        this.refresh();
    } else if (PlayerInfo2 == "PlayerLevel" && this._playerLevel !== $gameParty.leader().level) {  
        this.contents.fontSize = 15;
        this.drawText("P Level: " + $gameParty.leader().level, 0, -10, this.contentsWidth(), 'left');
    }
};


// Player Info #3

function Window_PlayerInfo3() {
    this.initialize.apply(this, arguments);
}

Window_PlayerInfo3.prototype = Object.create(Window_Base.prototype);
Window_PlayerInfo3.prototype.constructor = Window_PlayerInfo3;

Window_PlayerInfo3.prototype.initialize = function() {
    this._playerName = $gameParty.leader().name();
    this._playerHP = $gameParty.leader().hp;
    this._playerClass = $gameParty.leader().currentClass().name;
    this._playerMP = $gameParty.leader().mp; 
    this._playerTP = $gameParty.leader().tp; 
    this._playerLevel = $gameParty.leader().level; 
    var width = this.windowWidth();
    var height = this.windowHeight();
    // var x = Graphics.boxWidth - 450 + (this.windowWidth() * 2) + 10; 
    var x = Graphics.boxWidth - 450 + (this.windowWidth() * 2) + 5;
    var y = Graphics.boxHeight - 500 - height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_PlayerInfo3.prototype.windowWidth = function() {
    return 140;
};

Window_PlayerInfo3.prototype.windowHeight = function() {
    return this.fittingHeight(0.45);
};

Window_PlayerInfo3.prototype.refresh = function() {
    this.contents.clear();
    if (PlayerInfo3 == "PlayerName") {  // Módosítás: PlayerInfo3-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText($gameParty.leader().name(), 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo3 == "PlayerHP") {  // Módosítás: PlayerInfo3-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("HP: " + $gameParty.leader().hp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo3 == "PlayerMP") {  // Módosítás: PlayerInfo3-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("MANA: " + $gameParty.leader().mp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo3 == "PlayerTP") {  // Módosítás: PlayerInfo3-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("TP: " + $gameParty.leader().tp, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo3 == "PlayerClass") {  // Módosítás: PlayerInfo3-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("Class: " + $gameParty.leader().currentClass().name, 0, -10, this.contentsWidth(), 'left');
    } else if (PlayerInfo3 == "PlayerLevel") {  // Módosítás: PlayerInfo3-t használja a döntéshez
        this.contents.fontSize = 15;
        this.drawText("P Level: " + $gameParty.leader().level, 0, -10, this.contentsWidth(), 'left');
    }
};



//=============================================================================
// ** Gold Window
//=============================================================================


function GoldWindow() {
    this.initialize.apply(this, arguments);
}

GoldWindow.prototype = Object.create(Window_Base.prototype);
GoldWindow.prototype.constructor = GoldWindow;

GoldWindow.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.contents.fontSize = 20;  // Set the font size to 20
    this.refresh();
};

GoldWindow.prototype.windowWidth = function() {
    return 240;
};

GoldWindow.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

GoldWindow.prototype.refresh = function() {
    this.contents.clear();
    // Mentse az aktuális arany értékét
    this._gold = $gameParty.gold();
    this.drawText(this._gold + " " + TextManager.currencyUnit, 0, 0);
};


var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    _Scene_Map_onMapLoaded.call(this);
    // labels 
    this.createEventLabels();
    // Save a reference to the current map scene
    window.currentMapScene = this;

    if(this._goldWindow){
        this._goldWindow.refresh();
    }
    if (this._itemWatcherWindow) {
        this._itemWatcherWindow.refresh();
    }
    if (this._itemWatcherWindow2) {
        this._itemWatcherWindow2.refresh();
    }
    if (this._itemWatcherWindow3) {
        this._itemWatcherWindow3.refresh();
    }
};

// ez felelős a folyamatos frissítésért
var _Game_Party_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    _Game_Party_gainGold.call(this, amount);
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._goldWindow) {
        scene._goldWindow.refresh();
    }
};

GoldWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    // Ellenőrizze, hogy az arany értéke megváltozott-e
    if (this._gold !== $gameParty.gold()) {
        // Frissítse az arany értékét és az ablakot
        this._gold = $gameParty.gold();
        this.refresh();
    }
};




//=============================================================================
// ** Game Time Window
//=============================================================================

function Window_GameTime() {
    this.initialize.apply(this, arguments);
}

Window_GameTime.prototype = Object.create(Window_Base.prototype);
Window_GameTime.prototype.constructor = Window_GameTime;

Window_GameTime.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - width - 10, 10, width, height);
    this._lastTime = 0;
    this.refresh();
};

Window_GameTime.prototype.windowWidth = function() {
    return 160;
};

Window_GameTime.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_GameTime.prototype.refresh = function() {
    this.contents.clear();
    this.drawGameTime();
};

Window_GameTime.prototype.drawGameTime = function() {
    var time = Math.floor(Graphics.frameCount / 60); // Játékidő másodpercben
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = time % 60;
    this.contents.fontSize = 20;
    this.drawText(hours.padZero(2) + ":" + minutes.padZero(2) + ":" + seconds.padZero(2), 0, 0, this.contentsWidth(), 'right');
    this._lastTime = time;
};

Window_GameTime.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (Math.floor(Graphics.frameCount / 60) != this._lastTime) {
        this.refresh();
    }
};

//=============================================================================
// ** Step Count Window
//=============================================================================


function Window_StepCounter() {
    this.initialize.apply(this, arguments);
}

Window_StepCounter.prototype = Object.create(Window_Base.prototype);
Window_StepCounter.prototype.constructor = Window_StepCounter;

Window_StepCounter.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - width - 10, 10 + this.windowHeight() + 15, width, height);  // Added offset by the height of the Game Time window and additional 15px
    this.refresh();
};

Window_StepCounter.prototype.windowWidth = function() {
    return 160;
};

Window_StepCounter.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_StepCounter.prototype.refresh = function() {
    this.contents.clear();
    this.contents.fontSize = 20;  // Set the font size to 20
    this.drawText("Steps: " + $gameParty.steps(), 0, 0);
};


Window_StepCounter.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if ($gameParty.steps() != this._lastSteps) {
        this.refresh();
    }
};


//=============================================================================
// ** Log Window
//=============================================================================

function Window_DebugLog() {
    this.initialize.apply(this, arguments);
}

Window_DebugLog.prototype = Object.create(Window_Selectable.prototype);
Window_DebugLog.prototype.constructor = Window_DebugLog;



    Window_DebugLog.prototype.initialize = function() {
        this._log = []; // Array to hold the log
        this._log = INDIE.Debugger.logData || [];
        this._lastLogTime = Date.now(); // Holds the time of the last log entry
        var x = Graphics.boxWidth - 450; // The x position of the window
        var y = Graphics.boxHeight - 500; // The y position of the window
        var width = 450; // The width of the window
        var height = 500; // The height of the window
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };


    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        INDIE.Debugger._debugLog = new Window_DebugLog();
    };
    
      

//=============================================================================
// ** Scene_Battle Modification
//=============================================================================

BattleManager.setup = function(troopId, canEscape, canLose) {
    this.initMembers();
    this._canEscape = canEscape;
    this._canLose = canLose;
    $gameTroop.setup(troopId);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
    INDIE.Debugger.isBattleRunning = true;
};

BattleManager.endBattle = function(result) {
    this._phase = 'battleEnd';
    if (this._eventCallback) {
        this._eventCallback(result);
    }
    if (result === 0) {
        $gameSystem.onBattleWin();
    } else if (this._escaped) {
        $gameSystem.onBattleEscape();
    }
    INDIE.Debugger.isBattleRunning = false;
};



Window_DebugLog.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    // Only apply the smart fade if the smartFadeEnable parameter is true
    if (smartFadeEnable) {
        // Check if 5 seconds passed since last log entry
        if (Date.now() - this._lastLogTime > 5000) {
            // Decrease opacity faster
            this.opacity = Math.max(this.opacity - 10, 50); // Minimum opacity is 50 in this example
        } else {
            // Increase opacity faster
            this.opacity = Math.min(this.opacity + 10, 255); // Maximum opacity is 255
        }
    }

    if(INDIE.Debugger.isDialogueRunning || INDIE.Debugger.isBattleRunning) {
        this.hide(); // hide the window if dialogue or battle is happening
    } else {
        this.show(); // show the window if there's no dialogue and no battle
    }
    this.keyInput(); // add this here
};

Window_StepCounter.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if ($gameParty.steps() != this._lastSteps) {
        this.refresh();
    }
    if(INDIE.Debugger.isBattleRunning) {
        this.hide(); 
    } else {
        this.show();
    }
};

GoldWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._gold !== $gameParty.gold()) {
        this._gold = $gameParty.gold();
        this.refresh();
    }
    if(INDIE.Debugger.isBattleRunning) {
        this.hide();
    } else {
        this.show();
    }
};

Window_GameTime.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (Math.floor(Graphics.frameCount / 60) != this._lastTime) {
        this.refresh();
    }
    if(INDIE.Debugger.isBattleRunning) {
        this.hide(); 
    } else {
        this.show(); 
    }
};

Window_ItemWatcher.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (EnableModalWinGroup1) {
        if (this._itemId !== $gameParty.numItems($dataItems[Number(enableItemWatcherWindow)])) {
            this._itemId = $gameParty.numItems($dataItems[Number(enableItemWatcherWindow)]);
            this.refresh();
        }
        if(INDIE.Debugger.isBattleRunning) {
            this.hide(); 
        } else {
            this.show(); 
        }
    } else {
        this.hide();
    }
};

Window_ItemWatcher2.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (EnableModalWinGroup1) {
        if (this._itemId !== $gameParty.numItems($dataItems[Number(enableItemWatcherWindow2)])) {
            this._itemId = $gameParty.numItems($dataItems[Number(enableItemWatcherWindow2)]);
            this.refresh();
        }
        if(INDIE.Debugger.isBattleRunning) {
            this.hide(); 
        } else {
            this.show(); 
        }
    } else {
        this.hide();
    }
};

Window_ItemWatcher3.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (EnableModalWinGroup1) {
        if (this._itemId !== $gameParty.numItems($dataItems[Number(enableItemWatcherWindow3)])) {
            this._itemId = $gameParty.numItems($dataItems[Number(enableItemWatcherWindow3)]);
            this.refresh();
        }
        if(INDIE.Debugger.isBattleRunning) {
            this.hide(); 
        } else {
            this.show(); 
        }
    } else {
        this.hide();
    }
};

Window_PlayerInfo1.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (EnableModalWinGroup2) {
        if (PlayerInfo1 == "PlayerName" && this._playerName !== $gameParty.leader().name()) {
            this._playerName = $gameParty.leader().name();
            this.refresh();
        } else if (PlayerInfo1 == "PlayerHP" && this._playerHP !== $gameParty.leader().hp) {
            this._playerHP = $gameParty.leader().hp;
            this.refresh();
        } else if (PlayerInfo1 == "PlayerMP" && this._playerMP !== $gameParty.leader().mp) { 
            this._playerMP = $gameParty.leader().mp;
            this.refresh();
        } else if (PlayerInfo1 == "PlayerTP" && this._playerTP !== $gameParty.leader().tp) {  
            this._playerTP = $gameParty.leader().tp;
            this.refresh();
        } else if (PlayerInfo1 == "PlayerClass" && this._playerClass !== $gameParty.leader().currentClass().name) {  
            this._playerClass = $gameParty.leader().currentClass().name;
            this.refresh();
        } else if (PlayerInfo1 == "PlayerLevel" && this._playerLevel !== $gameParty.leader().level) {  
            this.contents.fontSize = 15;
            this.drawText("P Level: " + $gameParty.leader().level, 0, -10, this.contentsWidth(), 'left');
        }
        if(INDIE.Debugger.isBattleRunning) {
            this.hide(); 
        } else {
            this.show(); 
        }
    } else {
        this.hide();
    }
};

Window_PlayerInfo2.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (EnableModalWinGroup2) {
        if (PlayerInfo2 == "PlayerName" && this._playerName !== $gameParty.leader().name()) {
            this._playerName = $gameParty.leader().name();
            this.refresh();
        } else if (PlayerInfo2 == "PlayerHP" && this._playerHP !== $gameParty.leader().hp) {
            this._playerHP = $gameParty.leader().hp;
            this.refresh(); 
        } else if (PlayerInfo2 == "PlayerMP" && this._playerMP !== $gameParty.leader().mp) { 
            this._playerMP = $gameParty.leader().mp;
            this.refresh();
        } else if (PlayerInfo2 == "PlayerTP" && this._playerTP !== $gameParty.leader().tp) {  
            this._playerTP = $gameParty.leader().tp;
            this.refresh();
        } else if (PlayerInfo2 == "PlayerClass" && this._playerClass !== $gameParty.leader().currentClass().name) {  
            this._playerClass = $gameParty.leader().currentClass().name;
            this.refresh();
        } else if (PlayerInfo2 == "PlayerLevel" && this._playerLevel !== $gameParty.leader().level) {  
            this.contents.fontSize = 15;
            this.drawText("P Level: " + $gameParty.leader().level, 0, -10, this.contentsWidth(), 'left');
        }
            if(INDIE.Debugger.isBattleRunning) {
                this.hide(); 
            } else {
                this.show(); 
            }
        } else {
            this.hide();
        }
    };

    Window_PlayerInfo3.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (EnableModalWinGroup2) {
            if (PlayerInfo3 == "PlayerName" && this._playerName !== $gameParty.leader().name()) {
                this._playerName = $gameParty.leader().name();
                this.refresh();
            } else if (PlayerInfo3 == "PlayerHP" && this._playerHP !== $gameParty.leader().hp) {
                this._playerHP = $gameParty.leader().hp;
                this.refresh(); 
            } else if (PlayerInfo3 == "PlayerMP" && this._playerMP !== $gameParty.leader().mp) { 
                this._playerMP = $gameParty.leader().mp;
                this.refresh();
            } else if (PlayerInfo3 == "PlayerTP" && this._playerTP !== $gameParty.leader().tp) {  
                this._playerTP = $gameParty.leader().tp;
                this.refresh();
            } else if (PlayerInfo3 == "PlayerClass" && this._playerClass !== $gameParty.leader().currentClass().name) {  
                this.__playerClass = $gameParty.leader().currentClass().name;
                this.refresh();
            } else if (PlayerInfo3 == "PlayerLevel" && this._playerLevel !== $gameParty.leader().level) {  
                this._playerLevel = $gameParty.leader().level;
                this.refresh();
            }
            if(SceneManager._scene.constructor !== Scene_Battle) { 
                this.show(); 
            } else {
                this.hide();
            }
        } else {
            this.hide();
        }
    };

//=============================================================================
// ** Scene_Battle Modification END
//=============================================================================



Window_DebugLog.prototype.maxItems = function() {
    return this._log.length;
};

Window_DebugLog.prototype.itemHeight = function() {
    return this.lineHeight() * 0.7;
};


Window_DebugLog.prototype.drawTextExWithFontSize = function(text, x, y, maxWidth) {
    var originalTextState = this._textState;
    this._textState = {};
    this._textState.index = 0;
    this._textState.x = x;
    this._textState.y = y;
    this._textState.left = x;
    this._textState.text = this.convertEscapeCharacters(text);
    this._textState.text = this._textState.text.replace(/[\n\r]+/g, '\n');
    this._textState.text = this._textState.text.replace(/\x1bC\[\d+\]/g, '');
    this._textState.height = this.calcTextHeight({ text: this._textState.text, index: 0 }, false);
    this._textState.fontSize = this.contents.fontSize; // save the current font size
    this.processNewLine(this._textState);

    var brokenLines = [];
    // how to death -.-""
    while (this._textState.index < this._textState.text.length) {
        let nextChar = this._textState.text[this._textState.index];
        let nextCharWidth = this.textWidth(nextChar);
        if (this._textState.x + nextCharWidth > maxWidth) {
            // Find the last space in the text
            var lastSpaceIndex = this._textState.text.lastIndexOf(' ', this._textState.index);
            // If there is no space in the text, break the line at the current index
            if (lastSpaceIndex === -1) {
                lastSpaceIndex = this._textState.index;
            } else {
                // if we break at a space, we need to skip the space in the new line
                lastSpaceIndex += 1;
            }

            var textToPush = this._textState.text.substring(0, lastSpaceIndex);
            var remainingText = this._textState.text.substring(lastSpaceIndex);

            // Additional check
            if (this._textState.text[this._textState.index] !== remainingText[0]) {
                remainingText = this._textState.text[this._textState.index] + remainingText;
            }

            brokenLines.push(textToPush);
            this._textState.text = remainingText;
            this._textState.index = 0;
            this.processNewLine(this._textState);
        } else {
            // If the character fits the line, add it
            this.processNormalCharacter(this._textState);
        }
    }
    
    brokenLines.push(this._textState.text);
    this._textState = originalTextState;
    return brokenLines;
};

Window_DebugLog.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.contents.fontSize = 16;
    var lines = this._log[index];

    // Reduce the y value to move the text up
    rect.y -= 20;

    for (let text of lines) {
        rect.y = this.drawTextExWithFontSize(text, rect.x, rect.y, rect.width);
        rect.x = 0;
    }
};


Window_DebugLog.prototype.addLine = function(text) {
    this.contents.fontSize = 16; // add this line
    var lines = this.drawTextExWithFontSize(text, 0, 0, this.contentsWidth());
    
    if (this._log.length === 0) {
        // If it's the first line, add some empty lines before
        for (let i = 0; i < 1; i++) {
            this._log.push([" "]);
        }
    }

    for (let line of lines) {
        this._log.push([line]);
    }

    INDIE.Debugger.logData = this._log; 
    this._lastLogTime = Date.now(); 
    if (!smartFadeEnable) {
        // If the smart fade is not enabled, always set the opacity to maximum
        this.opacity = 255;
    }
    this.refresh();
    this.setTopRow(Math.max(0, this._log.length - this.maxPageItems()));
};

// message hides triggers
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    INDIE.Debugger.isDialogueRunning = true;
    _Window_Message_startMessage.call(this);
};

const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    INDIE.Debugger.isDialogueRunning = false;
    _Window_Message_terminateMessage.call(this);
};


//=============================================================================
// ** Delete logs when game over, or new game started
//=============================================================================

var _Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
    _Scene_Gameover_start.call(this);
    if (INDIE.Debugger._debugLog) {
        INDIE.Debugger._debugLog.clear();
        INDIE.Debugger.logData = [];  // Clear global log data
    }
};

var _Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    _Scene_Title_start.call(this);
    if (INDIE.Debugger._debugLog) {
        INDIE.Debugger._debugLog.clear();
        INDIE.Debugger.logData = [];  // Clear global log data
    }
};

Window_DebugLog.prototype.clear = function() {
    this._log = [];
    this.refresh();
};
//=============================================================================
// ** Log Scroll keyups
//=============================================================================


Window_DebugLog.prototype.keyInput = function() {
    // Ha több log van, mint amennyit meg tud jeleníteni az oldal
    if (this._log.length > this.maxPageItems()) {
        if (Input.isTriggered('scrollUp')) {
            // Felgörgetés
            this.setTopRow(Math.max(0, this.topRow() - 1));
            this._lastLogTime = Date.now(); // Frissítse a _lastLogTime értékét
        } else if (Input.isTriggered('scrollDown')) {
            // Legörgetés
            this.setTopRow(Math.min(this.maxItems() - this.maxPageItems(), this.topRow() + 1));
            this._lastLogTime = Date.now(); // Frissítse a _lastLogTime értékét
        }
    }
};





//=============================================================================
// ** Log watcher's
//=============================================================================

// STARTER LOGS

// startervar param
var gameHasStartedVariableId = StarterVariable;

var _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this); // Call original function

    // Check if the gameHasStartedVariableId has been set
    if (gameHasStartedVariableId && gameHasStartedVariableId > 0 && !$gameVariables.value(gameHasStartedVariableId)) {
        $gameVariables.setValue(gameHasStartedVariableId, 1);

        var separator = getCurrentTime() + " ------------------------";
        this._debugLogWindow.addLine(separator);
        this._debugLogWindow.addLine(getCurrentTime() + " Game started");

        var partySize = $gameParty.size();
        this._debugLogWindow.addLine(getCurrentTime() + " Your party size: " + partySize);

        var mapName = $dataMapInfos[$gameMap._mapId].name;
        this._debugLogWindow.addLine(getCurrentTime() + " Loaded map " + mapName);

        var goldName = TextManager.currencyUnit;
        var goldAmount = $gameParty.gold();
        this._debugLogWindow.addLine(getCurrentTime() + " Current " + goldName + " amount: " + goldAmount);

        var playerX = $gamePlayer.x;
        var playerY = $gamePlayer.y;
        this._debugLogWindow.addLine(getCurrentTime() + " Player position: X=" + playerX + " Y=" + playerY);

        var encountersExist = $dataMap.encounterList.length > 0;
        this._debugLogWindow.addLine(getCurrentTime() + " Encounters exist on this map: " + (encountersExist ? "Yes" : "No"));

        // Check if dash is disabled
        var isDashDisabled = $gameMap.isDashDisabled();
        this._debugLogWindow.addLine(getCurrentTime() + " Is dash disabled: " + (isDashDisabled ? "Yes" : "No"));

        this._debugLogWindow.addLine(separator);
    }
};


// Check switchers

var _Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    _Game_Switches_setValue.call(this, switchId, value);
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();
        var switchName = $dataSystem.switches[switchId];
        var switchState = value ? "ON" : "OFF";
        var logText = currentTime + " [SWITCHER] - " + (switchName ? switchName : "Switch " + switchId) + ": " + switchState;
        scene._debugLogWindow.addLine(logText);
    }
    
};

// check self switcher
// Override Game_SelfSwitches.prototype.setValue
var _Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function(key, value) {
    if (EnableSelfSwitch) { // Only execute if SelfSwitch tracking is enabled
        var eventId = key[1];
        var selfSwitchId = key[2];
        var event = $gameMap.event(eventId);
        var oldPageId = event.findProperPageIndex() + 1; // +1 for RPG Maker's 1-based indexing
        
        _Game_SelfSwitches_setValue.call(this, key, value);
    
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var newPageId = event.findProperPageIndex() + 1; // +1 for RPG Maker's 1-based indexing
    
            if (value) { // Only log when the switch is turned on
                var logText1 = getCurrentTime() + " " + event.event().name + "(#" + eventId + ") [SELF](" + selfSwitchId + ") Enabled";
                var logText2 = getCurrentTime() + " " + event.event().name + "(#" + eventId + ")" + " Page changed from (" + oldPageId + ") to (" + newPageId + ")";
                scene._debugLogWindow.addLine(logText1);
                scene._debugLogWindow.addLine(logText2);
            }
        }
    } else {
        _Game_SelfSwitches_setValue.call(this, key, value);
    }
};




// Let's assume we have a map to store our events
Game_Interpreter.prototype._loggedEvents = [];
// manual event checker
Game_Interpreter.prototype._eventStore = {};

Game_Interpreter.prototype.logEvent = function(eventId) {
    var event = $gameMap.event(eventId);
    var scene = SceneManager._scene;

    if (scene instanceof Scene_Map && scene._debugLogWindow && event._trigger !== 4 && event._trigger !== 5) {
        var currentPageId = event.findProperPageIndex() + 1; // +1 for RPG Maker's 1-based indexing
        var currentTime = getCurrentTime();
        var logText = currentTime + " " + event.event().name + "(#" + eventId + ") PAGE " + currentPageId + " STARTED";
        
        if (logText !== "") {
            scene._debugLogWindow.addLine(logText);
            scene._debugLogWindow.addLine(currentTime + " ------------------------");

            this._eventStore[eventId] = {
                id: eventId,
                startTime: Date.now(),
                pageId: currentPageId
            };

            this._loggedEvents[eventId] = true;
        }
    }
};

Game_Interpreter.prototype.checkRunningEvents = function() {
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        for (var eventId in this._eventStore) {
            var storedEvent = this._eventStore[eventId];
            var currentEvent = $gameMap.event(eventId);

            if (currentEvent && this._loggedEvents[eventId]) { 
                var currentPageId = currentEvent.findProperPageIndex() + 1; // +1 for RPG Maker's 1-based indexing 
                if (storedEvent.pageId !== currentPageId) {
                    var currentTime = getCurrentTime();
                    var logText = currentTime + " " + currentEvent.event().name + "(#" + eventId + ") PAGE CHANGED FROM " + storedEvent.pageId + " TO " + currentPageId;
                    scene._debugLogWindow.addLine(logText);

                    var logTextEnd = currentTime + " " + currentEvent.event().name + "(#" + eventId + ") PAGE " + storedEvent.pageId + " ENDED";
                    scene._debugLogWindow.addLine(logTextEnd);
                    scene._debugLogWindow.addLine(currentTime + " ------------------------");

                    storedEvent.pageId = currentPageId;
                }
            }
        }
    }
};


Game_Interpreter.prototype.endEvent = function(eventId) {
    var event = $gameMap.event(eventId);
    var scene = SceneManager._scene;

    if (event && scene instanceof Scene_Map && scene._debugLogWindow && event._trigger !== 4 && event._trigger !== 5) {
        var currentPageId = event.findProperPageIndex() + 1;
        var currentTime = getCurrentTime();
        var logText = currentTime + " " + event.event().name + "(#" + eventId + ") PAGE " + currentPageId + " ENDED";
        
        if (logText !== "") {
            scene._debugLogWindow.addLine(logText);
            scene._debugLogWindow.addLine(currentTime + " ------------------------");

            delete this._eventStore[eventId];
            delete this._loggedEvents[eventId];
        }
    }
};

Game_Interpreter.prototype.checkAndLogEventEnds = function() {
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        for (var eventId in this._eventStore) {
            var storedEvent = this._eventStore[eventId];
            var currentEvent = $gameMap.event(eventId);

            if (currentEvent && this._loggedEvents[eventId]) { 
                if (!currentEvent.isRunning()) {
                    var currentTime = getCurrentTime();
                    var logText = currentTime + " " + currentEvent.event().name + "(#" + eventId + ") PAGE " + storedEvent.pageId + " ENDED";
                    
                    scene._debugLogWindow.addLine(logText);
                    scene._debugLogWindow.addLine(currentTime + " ----------------------------");

                    delete this._eventStore[eventId];
                    delete this._loggedEvents[eventId];
                }
            }
        }
    }
};

Game_Interpreter.prototype.finishEvent = function(eventId) {
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var storedEvent = this._eventStore[eventId];
        var currentEvent = $gameMap.event(eventId);

        if (currentEvent && this._loggedEvents[eventId]) {
            var currentTime = getCurrentTime();
            var logText = currentTime + " " + currentEvent.event().name + "(#" + eventId + ") PAGE " + storedEvent.pageId + " ENDED";

            scene._debugLogWindow.addLine(logText);
            scene._debugLogWindow.addLine(currentTime + " ----------------------------");

            delete this._eventStore[eventId];
            delete this._loggedEvents[eventId];
        }
    }
};





// manual event finished
var originalCommandEnd = Game_Interpreter.prototype.commandEnd;
Game_Interpreter.prototype.commandEnd = function() {
    var result = originalCommandEnd.call(this);
    this.endEvent(this._eventId);
    return result;
};

var originalCommandReturn = Game_Interpreter.prototype.commandReturn;
Game_Interpreter.prototype.commandReturn = function() {
    var result = originalCommandReturn.call(this);
    this.endEvent(this._eventId);
    return result;
};


// check Gold changes


Game_Party.prototype.gainGold = function(amount) {
    _Game_Party_gainGold.call(this, amount);
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();
        var logText = currentTime;
        if(amount > 0){
            logText += "[GOLD]" + " + " + amount + " " + TextManager.currencyUnit + " gained";
        } else {
            logText += "[GOLD]" + " - " + Math.abs(amount) + " " + TextManager.currencyUnit + " removed";
        }
        scene._debugLogWindow.addLine(logText);
    }
};


// Event call - levle up / down tracker

// Override Game_Actor.prototype.changeLevel
var _Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
Game_Actor.prototype.changeLevel = function(level, show) {
    var oldLevel = this._level; // Save old level
    _Game_Actor_changeLevel.call(this, level, show); // Call original method

    var scene = SceneManager._scene;
    if (show && scene instanceof Scene_Map && scene._debugLogWindow && oldLevel !== this._level) {
        // Determine level up or level down
        var levelChangeText = level > oldLevel ? "[LEVEL UP] - " : "[LEVEL DOWN] - ";
        var logText = getCurrentTime() + " " + levelChangeText + "" + this._name + " from (" + oldLevel + ") to (" + level + ")";
        scene._debugLogWindow.addLine(logText);
    }
};

// Override Game_Actor.prototype.levelUp
var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    var oldLevel = this._level; // Save old level
    _Game_Actor_levelUp.call(this); // Call original method

    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow && oldLevel !== this._level) {
        var logText = getCurrentTime() + " [LEVEL UP] - " + this._name + " from (" + oldLevel + ") to (" + this._level + ")";
        scene._debugLogWindow.addLine(logText);
    }
};

// Override Game_Actor.prototype.levelDown
var _Game_Actor_levelDown = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    var oldLevel = this._level; // Save old level
    _Game_Actor_levelDown.call(this); // Call original method

    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow && oldLevel !== this._level) {
        var logText = getCurrentTime() + " [LEVEL DOWN] - " + this._name + " from (" + oldLevel + ") to (" + this._level + ")";
        scene._debugLogWindow.addLine(logText);
    }
};


// log the Party changes

var _Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    _Game_Party_addActor.call(this, actorId); // Call original function

    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var actor = $gameActors.actor(actorId);
        var currentTime = getCurrentTime();
        var logText = currentTime + " " + actor.name() + " added to the Party";
        scene._debugLogWindow.addLine(logText);
    }
};

var _Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    _Game_Party_removeActor.call(this, actorId); // Call original function

    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var actor = $gameActors.actor(actorId);
        var currentTime = getCurrentTime();
        var logText = currentTime + " " + actor.name() + " removed from the Party";
        scene._debugLogWindow.addLine(logText);
    }
};


// BATTLE LOGS

// Battle start
var _BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
    this._battleStartTime = Date.now(); // Store the current time
    INDIE.Debugger.isBattleRunning = true;
};

// Battle end
var _BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    _BattleManager_endBattle.call(this, result);

    var EnableBattleLogs = JSON.parse(parameters['EnableBattleLogs'] || 'true');

    // If battle logs are disabled, don't continue with the function.
    if (!EnableBattleLogs) return;
    
    var currentTime = getCurrentTime();
    var battleDuration = Date.now() - this._battleStartTime; // Calculate battle duration
    var logText = currentTime;

    INDIE.Debugger._debugLog.addLine("----------------------------"); // Add separation line at the start

    // results
    switch(result) {
        case 2:
            logText += " [BATTLE]" + " The battle is over, player lose"; 
            break;
        case 0:
            logText += " [BATTLE]" + " The battle is over, player win";
            INDIE.Debugger._debugLog.addLine(logText);

            logText = currentTime;
            logText += " [BATTLE]" + ` The player fought with: ${$gameTroop.troop().name}`; // Write out the name of the Troops
            INDIE.Debugger._debugLog.addLine(logText);

            $gameTroop.members().forEach(function(enemy) {
                if (enemy.isDead()) {
                    logText = currentTime;
                    logText += " [BATTLE]" + ` The player defeated: ${enemy.name()}`; 
                    INDIE.Debugger._debugLog.addLine(logText); 
                }
            });
            // Add battle duration
            logText = currentTime;
            logText += " [BATTLE]" + ` Battle duration: ${Math.round(battleDuration / 1000)} seconds`;
            INDIE.Debugger._debugLog.addLine(logText);
            break;
        case 1:
            logText += " [BATTLE]" + "The battle is over, player escaped";
            break;
    }
    // Add log entry
    // INDIE.Debugger._debugLog.addLine(logText);

    INDIE.Debugger._debugLog.addLine("----------------------------"); // Add separation line at the end
};



// Track event erasing
var _Game_Event_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
    _Game_Event_erase.call(this);
    
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var logText = getCurrentTime() + "[" + this.event().name + " #" + this._eventId + " deleted";
        scene._debugLogWindow.addLine(logText);
    }
};


// Var Tracker
// Store the original setValue function
var _Game_Variables_setValue = Game_Variables.prototype.setValue;

Game_Variables.prototype.setValue = function(variableId, value) {
    // Only execute if VarTracker is enabled
    if (EnableVarTracker) {
        // Check if the variable value has changed and if the variable is not the StarterVariable
        var oldValue = this.value(variableId);
        var diff = value - oldValue;
        
        // If it has changed, log it
        if (diff !== 0 && variableId !== StarterVariable) {
            var scene = SceneManager._scene;
            if (scene instanceof Scene_Map && scene._debugLogWindow) {
                var currentTime = getCurrentTime();
                // Retrieve the variable name
                var variableName = $dataSystem.variables[variableId];
                var logText = currentTime + " [VARIABLE] " + variableName + "(#" + variableId + ")";
                if (diff > 0) {
                    logText += " increased by " + diff;
                } else {
                    logText += " decreased by " + Math.abs(diff);
                }
                scene._debugLogWindow.addLine(logText);
            }
        }
    }
    
    // Call the original setValue function to actually update the variable
    _Game_Variables_setValue.call(this, variableId, value);
};








// teleport tracker

var originalCommand201 = Game_Interpreter.prototype.command201;
var oldMapId, oldMapName;
var newMapId, newMapName;
var isTeleporting = false;

Game_Interpreter.prototype.command201 = function() {
    // Először elmentjük az eredeti helyet
    oldMapId = $gameMap.mapId();
    oldMapName = $dataMapInfos[oldMapId].name;
 
    // Majd meghívjuk az eredeti teleport parancsot
    originalCommand201.call(this);
    
    // Jelöljük, hogy teleportálás folyamatban
    isTeleporting = true;

    return true;
};




var originalUpdate = Scene_Map.prototype.update;

Scene_Map.prototype.update = function() {
    originalUpdate.call(this);

    Scene_Base.prototype.update.call(this);

    $gameMap.events().forEach(function(event) {
        // Check if the interpreter of the event exists and if it has the logEvent function
        if (event._interpreter && typeof event._interpreter.logEvent === "function") {
            event._interpreter.logEvent(event.eventId());
        }

        // Check and log event ends
        if (event._interpreter && typeof event._interpreter.checkAndLogEventEnds === "function") {
            event._interpreter.checkAndLogEventEnds();
        }
    }, this);

    // Ha teleportálás folyamatban, és a játékos már az új helyen van
    if (isTeleporting && $gameMap.mapId() !== oldMapId) {
        // Elmentjük az új helyet
        newMapId = $gameMap.mapId();
        newMapName = $dataMapInfos[newMapId].name;

        // Csak akkor logoljuk, ha az új térképadatok már be vannak töltve
        if (newMapName) {
            // Végül hozzáadjuk a log bejegyzést
            var logText = getCurrentTime() + " Teleport from " + oldMapName + "(" + oldMapId + ")" +
                          " to " + newMapName + "(" + newMapId + ")";
            if (this._debugLogWindow) {
                this._debugLogWindow.addLine(logText);
            }

            // Teleportálás vége
            isTeleporting = false;
        }
    }

    // Get the current game interpreter
    var gameInterpreter = $gameMap._interpreter;

    // Only proceed if the gameInterpreter exists
    if (gameInterpreter) {
        // Get the current time in seconds
        var currentTimeInSeconds = Math.floor(Date.now() / 1000);

        // Only call checkRunningEvents every second
        if (!this._lastCheckTime || currentTimeInSeconds > this._lastCheckTime) {
            gameInterpreter.checkRunningEvents();
            this._lastCheckTime = currentTimeInSeconds;
        }
    }
};



// Keep track of common events
// only way with little scirpts (so manual)

Game_Interpreter.prototype.logCommonEvent = function(commonEventId) {
    var commonEvent = $dataCommonEvents[commonEventId];
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();
        var logText = currentTime + " [COMMON EVENT] " + commonEvent.name + "(#"+ commonEventId + ") RUNNING";
        scene._debugLogWindow.addLine(logText);
    }
};

// manual track when the CM finished.
Game_Interpreter.prototype.finishCommonEvent = function(commonEventId) {
    var commonEvent = $dataCommonEvents[commonEventId];
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();
        var logText = currentTime + " [COMMON EVENT] " + commonEvent.name + "(#"+ commonEventId + ") FINISHED";
        scene._debugLogWindow.addLine(logText);

        // Add separator line
        scene._debugLogWindow.addLine(currentTime + " ------------------------------------");
    }
};

    // waiting log


    var _Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
    Game_Interpreter.prototype.updateWait = function() {
    var waitingStarted = this._waitCount && !this._prevWaitCount;
    var waitingEnded = !this._waitCount && this._prevWaitCount;

    if (waitingStarted) {
        var currentTime = getCurrentTime();
        // Konvertálja a várakozási időt másodpercekbe
        var waitTimeInSeconds = this._waitCount / 60;
        var logText = currentTime + " Waiting " + waitTimeInSeconds.toFixed(2) + " seconds";
        if (window.currentMapScene && window.currentMapScene._debugLogWindow) {
            window.currentMapScene._debugLogWindow.addLine(logText);
        }
    } else if (waitingEnded) {
        var currentTime = getCurrentTime();
        if (window.currentMapScene && window.currentMapScene._debugLogWindow) {
            window.currentMapScene._debugLogWindow.addLine(currentTime + " Waiting is over");
        }
    }

    this._prevWaitCount = this._waitCount;

    return _Game_Interpreter_updateWait.call(this);
};
    
// YANFLY QUEST JOURNEY

// var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
// Game_Interpreter.prototype.pluginCommand = function(command, args) {
//     _Game_Interpreter_pluginCommand.call(this, command, args); // Call original function

//     // Check if the command is "Quest" and the first argument is "Add" or "Remove"
//     if (command.toUpperCase() === "QUEST" && args.length > 0 && EnableQuestLog) {
//         // Get the current game time
//         var currentTime = getCurrentTime(); 
//         // Check if Quest Journal is installed and enabled
//         if (typeof $dataQuests !== "undefined") {
//         if (args[0].toUpperCase() === "ADD") {
//             // Loop through all args from 1 (ignore "Add")
//             for (var i = 1; i < args.length; i++) {
//                 // Split each argument by commas
//                 var questIds = args[i].split(",");
//                 for (var j = 0; j < questIds.length; j++) {
//                     // Convert the quest ID to a number
//                     var questId = parseInt(questIds[j]);
//                     // Get the quest name
//                     var questName = $dataQuests[questId].name;
//                     // Remove text formatting characters from quest name
//                     questName = questName.replace(/\\.\[\d+\]/g, '').trim();
//                     // Log the added quest name
//                     INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " - Started");
//                 }
//             }
//         } else if (args[0].toUpperCase() === "REMOVE") {
//             // Loop through all args from 1 (ignore "Remove")
//             for (var i = 1; i < args.length; i++) {
//                 // Split each argument by commas
//                 var questIds = args[i].split(",");
//                 for (var j = 0; j < questIds.length; j++) {
//                     // Convert the quest ID to a number
//                     var questId = parseInt(questIds[j]);
//                     // Get the quest name
//                     var questName = $dataQuests[questId].name;
//                     // Remove text formatting characters from quest name
//                     questName = questName.replace(/\\.\[\d+\]/g, '').trim();
//                     // Log the removed quest name
//                     INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " - Removed");
//                 }
//             }
//         }
//     }
// }
// };

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args); // Call original function

    // Check if the command is "Quest" and the first argument is "Add", "Remove", "Complete", "Fail", "Set Completed", "Set Failed", or "Set Available"
    if (command.toUpperCase() === "QUEST" && args.length > 0 && EnableQuestLog) {
        // Get the current game time
        var currentTime = getCurrentTime(); 

        // Check if Quest Journal is installed and enabled
        if (typeof $dataQuests !== "undefined") {
            // Loop through all args from 1 (ignore first command)
            for (var i = 1; i < args.length; i++) {
                // Split each argument by commas
                var questIds = args[i].split(",");
                for (var j = 0; j < questIds.length; j++) {
                    // Convert the quest ID to a number
                    var questId = parseInt(questIds[j]);
                    // Check if the quest ID is valid
                    if ($dataQuests[questId]) {
                        // Get the quest name
                        var questName = $dataQuests[questId].name;
                        // Remove text formatting characters from quest name
                        questName = questName.replace(/\\.\[\d+\]/g, '').trim();
                        // Determine action based on the first command argument
                        switch (args[0].toUpperCase()) {
                            case "ADD":
                                INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " Started");
                                break;
                            case "REMOVE":
                                INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " Removed");
                                break;
                            case "SET":
                                switch(args[1].toUpperCase()) {
                                    case "COMPLETED":
                                        INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " Completed");
                                        break;
                                    case "FAILED":
                                        INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " Failed");
                                        break;
                                    case "AVAILABLE":
                                        INDIE.Debugger._debugLog.addLine(currentTime + " [QUEST] " + questName + " Available");
                                        break;
                                }
                                break;
                        }
                    }
                }
            }
        }
    }
};







//=============================================================================
// ** Utility
//=============================================================================

    function getCurrentTime(){
        var time = Math.floor(Graphics.frameCount / 60); // Játékidő másodpercben
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = time % 60;
        return hours.padZero(2) + ":" + minutes.padZero(2) + ":" + seconds.padZero(2);
    }



//=============================================================================
// ** Event Labels
//=============================================================================


// Add a new method to Bitmap
Bitmap.prototype.fillTriangle = function(p1, p2, p3, color) {
    var context = this._context;
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
    context.fillStyle = color;
    context.fill();
};

function EventLabel() {
    this.initialize.apply(this, arguments);
}

EventLabel.prototype = Object.create(Sprite.prototype);
EventLabel.prototype.constructor = EventLabel;

EventLabel.prototype.initialize = function(event, text, color) {
    Sprite.prototype.initialize.call(this);
    this._event = event;
    this._text = text;
    this._color = color || 'white';  // Default to white if no color is specified
    this.createBitmap();
};

// Bitmap creation
EventLabel.prototype.createBitmap = function() {
    this.bitmap = new Bitmap(160, 64); // Adjust the size as needed
    this.bitmap.fontSize = 18; // Set the font size
    this.bitmap.textColor = this._color; // Set the text color

    // // Customize text shadow
    this.bitmap.outlineWidth = 4; // Change this value to control the sharpness of the outline
   this.bitmap.outlineColor = 'rgba(0, 0, 0, 1)'; // Change this value to control the color of the outline

    // Draw the text
    this.bitmap.drawText(this._text, 0, 7, this.bitmap.width, this.bitmap.height * 2 / 3, 'center');

    // Draw the arrow
    var arrowWidth = 18;
    var arrowHeight = 12;
    var arrowX = this.bitmap.width / 2 - arrowWidth / 2;
    var arrowY = this.bitmap.height * 2 / 3;
    this.bitmap.fillTriangle(
        new Point(arrowX, arrowY),
        new Point(arrowX + arrowWidth / 2, arrowY + arrowHeight),
        new Point(arrowX + arrowWidth, arrowY),
        'white'
    );
};

EventLabel.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.x = this._event.screenX() - this.bitmap.width / 2;
    this.y = this._event.screenY() - this.bitmap.height - 32;  // Adjust this value as needed
};

Game_Interpreter.prototype.createEventLabel = function(eventId, text, color) {
    var event = $gameMap.event(eventId);
    if (event) {
        return new EventLabel(event, text, color);
    }
    return null;
};

Scene_Map.prototype.createEventLabels = function() {
    $gameMap.events().forEach(function(event) {
        event.event().pages.forEach(function(page) {
            var commands = page.list;
            if (commands && commands.length > 0) {
                commands.forEach(function(command) {
                    if (command.code === 355 && command.parameters[0].startsWith("this.createEventLabel")) {
                        var params = command.parameters[0].match(/\(([^)]+)\)/)[1].split(",");
                        var text = params[1].trim().slice(1, -1);  // Remove the quotes
                        var color = params[2] ? params[2].trim().slice(1, -1) : null;  // Remove the quotes, if a color is specified
                        var label = new EventLabel(event, text, color);
                        this.addChild(label);
                    }
                }, this);
            }
        }, this);
    }, this);
};









})(INDIE.Debugger);