//=============================================================================
// INDIE_Debugger.js
//=============================================================================

/*:
* @plugindesc Useful real-time debugger plugin for developers. v0.19.5
* @author Soczó Kristóf
* @help
* 
* 
* /=====================================================================/
* Useful tool for debug your project visually when running the game
* /=====================================================================/
* 
*
* 
* Script commands:
*
* this.logCommonEvent(n) change the n with your common event id. 
* this.finishCommonEvent(2)  change the n with your common event id. Place this the last item in the common event action list.
* this.logEvent(this._eventId); will print the event name  // Use this if you need a better Hierarchical display
* this.finishEvent(this._eventId); will print if the event finished   // Use this if you need a better Hierarchical display
* this.createEventLabel(1, "Hello World", "red"); // make a tag for your events ( only display when running the game)
* 
* Track list:   Switcher state (both single and range supported)
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
*               Movement Route
*               Conditional Branch
*               Steps Log
*               Change tilesets
*               Selected Choices
*               Change Xp's (not battles)
*               Items used in the menu (multiple support)
*               Region movement 
*               Tint Screen
*               Play BGM
*               Control timer (stopped / expired / rem time)
*               Quest Jorunay (Yanfly)
*               RegionEvents (Yanfly)
*
* Quest Journay supported logs: Plugin commands only: Only support Quest
* (and not objectives)
* - Completed, Added (all of types : single, multiple, or ranges)
* Note that this monitors the running of the plugin command.
*
* /============================Changelog================================/
* 
* 0.19.5
* 
* Plugin list window resized
* Pluginlist header no longer count the separator plugins.
* NEW Tint Screen log (Support predefined versions too)
* NEW Play BGM log
* NEW Full Control timer logs
* Reposition the countdown timer
* New Range switcher now can log also
* New Range Variable now can log also
* Single variable log now will calculates the current value and will print also
* 
*
* 0.19.0
*
* NEW Title screen scrollable window show the activated plugins. (+ version support)
* Complete refactored the Log system storage (Many future problems have been solved)
* Resized the log window (+30 width)
* Repositioned the Modal window Groups
* Fixed the issue if the player opened the shop, the same event action logs deleted.
* Option to delete the logs.(you can define a keyups)
* Option to enable or disable, if player teleport, log every prev logs from the window deleting
* Title screen show the Debugger is enabled text
* New Goal system (pre-alpha) think no big deal
*
* 0.18.0
*
* New Plugin Compatibility: Yanfly RegionEvents
* NEW Region Logs
* Region logs enable / disable param
* NEW Item used log (Only if item used on the menu screen support multiple items in a same time)
* Param to enable / disable item used logs
* New Common event manual tracker (just like the event) -
* New script call : this.finishCommonEvent(n)
*
* 0.17.5
* 
* NEW you can define a key to toggle the log window visibility
* Enable / Disable Switcher log param
* Enable / Disable the Waiting Logs param
* NEW Player logs - Change Xp 
*
* /=====================================================================/
*
* 0.17.1
*
* Removed the event id form the logs when using the manual scripts (page changes)
*
* 0.17.0
* 
*
* Better Logs Commenting separators
* We tried to fix the line break 
* Removed the mapID from the log, when player teleporting.
* NEW Show Choice - selected Choice log
* NEW Starter log include Activated plugins number
* NEW Change tilesets logs
* Fixed the teleport log bug, 
* now there is no problem with keys not working in the Show Choices
* Fixed the Questlog param
* NEW Mapname displaying in the first(#1) Playerinfo modal window
*
* 0.16.0
*
* Fixed the Conditional Branch log Bug. (cant freeze anymore the game)
* Removed the Battle logs (It is being redesigned.)
* Fixed the three player info window position, and fixed the 
* third window battle visibility  bug
* From now on, when the fight is over and the player has won,
* the battle does not delete the previous log entries.
* Starter log : Added a new Party player names log, and map tilesets name log
* 
* NEW configurable Steps log (repeat)
* NEW ItemEnable log param
*
* /=====================================================================/
*
* 0.15.0
*
* Refactored the Switcher log system (now better handling / 
* performance and bypass the autorun and paralell spam)
* Refactored the Self Switcher log system (now better handling 
* / performance and bypass the autorun and paralell spam) + Can log if disabled
* New Conditinal Branch Logs (send a log if conditions not meet and false)
* New Movement Route Logs.
*
* /=====================================================================/
*
* 0.1 - Initial release
*
* /=====================================================================/
*
* @param --Windows--
*
* @param EnableGoldWindow
* @text Show the Gold Window
* @parent --Windows--
* @type boolean
* @default true
* @desc enable or display to display the gold window
*
* @param EnableGameTimeWindow
* @text Show the Game Time Window
* @parent --Windows--
* @type boolean
* @default true
* @desc enable or display to display the game time window
*
* @param EnableStepCounterWIndow
* @text Step Counter Window
* @parent --Windows--
* @type boolean
* @default true
* @desc enable or dsiable the Step Counter window
*
* @param EnableLogWindow
* @text Log window
* @parent --Windows--
* @type boolean
* @default true
* @desc enable or dsiable the log Window
*
* @param LogWindowToggle
* @text Log window Toggle
* @parent --Windows--
* @type text
* @default f
* @desc setup your custom toggle button to show / hide Log window
*
* @param LogsDelete
* @text Logs Delete
* @parent --Windows--
* @type text
* @default q
* @desc setup your custom delete button
*
* @param TeleportDeletePrevLogs
* @text Teleport Del Logs
* @parent --Windows--
* @type boolean
* @default false
* @desc if enable, when player teleport, will delete all prev logs.
*
* @param LogWindowScrollUp
* @text Scroll Up
* @parent --Windows--
* @type text
* @default y
* @desc set your custom shorcut for the scrolling up the log window
*
* @param LogWindowScrollDown
* @text Scroll Down
* @parent --Windows--
* @type text
* @default c
* @desc set your custom shorcut for the scrolling down the log window
*
* @param SmartFadeEnable
* @text Smart fade
* @parent --Windows--
* @type boolean
* @default true
* @desc enable or dsiable the Smart fade function.
*
* @param --Logs--
*
* @param EnableQuestLog
* @text Enable Quest Log
* @parent --Logs--
* @type boolean
* @default false
* @desc enable or disable the Yanfly Quest Journay Plugin logs
*
* @param EnableVarTracker
* @text Enable Variables log
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the log for the Variables changes
*
* @param EnableConditionalTracker
* @text Enable Conditional Log
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the log for the Conditional Branch state (true / false)
*
* @param StarterVariable
* @text Starter Variable
* @parent --Logs--
* @type variable
* @default 2
* @desc Variable for game starter log track. Set None aka 0 if not want to log the Start.
*
* @param EnableSwitcherLog
* @text Enable Switcher state Log
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the Switchers log
*
* @param EnableSelfSwitch
* @text Enable Self Switch log
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the self switch logs
*
* @param EnableMoveMentLog
* @text Enable MoveMent Log
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the Movement log (only for events)
*
* @param EnableItemLog
* @text Enable Items Log
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the items gain / remove logs
*
* @param EnableWaitingLog
* @text Enable Waiting Log
* @parent --Logs--
* @type boolean
* @default false
* @desc enable or disable the Waiting command log
*
* @param EnableRegionLogs
* @text Region Logs
* @parent --Logs--
* @type boolean
* @default true
* @desc enable or disable the region logs (entered / left)
*
* @param StepsLog
* @text Steps log
* @parent --Logs--
* @type number
* @default 100
* @desc You can log, if player reach selected amount of steps (this will repeat). Min log value 25 steps
*
* @param --PlayerLogs--
*
* @param XpChangedLogs
* @text XP Changed logs
* @parent --PlayerLogs--
* @type boolean
* @default true
* @desc Enable or disable the logs for the xp changes
*
* @param ItemUsedLog
* @text Item Used Logs
* @parent --PlayerLogs--
* @type boolean
* @default true
* @desc Enable or disable the logs if the player using item(s) in the Menu screen
*
* @param --Modal Window Group #1--
*
* @param EnableModalWinGroup1
* @text Enable Group #1
* @parent --Modal Window Group #1--
* @type boolean
* @default true
* @desc Always just one modal group window can enable the same time
*
* @param ItemWatcher
* @text Enable Item Watcher #1
* @parent --Modal Window Group #1--
* @type item
* @desc select which item you want to track.
*
* @param ItemWatcher2
* @text Enable Item Watcher #2
* @parent --Modal Window Group #1--
* @type item
* @desc select which item you want to track.
*
* @param ItemWatcher3
* @text Enable Item Watcher #3
* @parent --Modal Window Group #1--
* @type item
* @desc select which item you want to track.
*
* @param --Modal Window Group #2--
*
* @param EnableModalWinGroup2
* @text Enable Group #2
* @parent --Modal Window Group #2--
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
* @option Map Name
* @value MapName
* @parent --Modal Window Group #2--
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
* @parent --Modal Window Group #2--
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
* @parent --Modal Window Group #2--
*
* @param --Goals Logs--
*
* @param ProgressGold
* @parent --Goals Logs--
* @text Goal Gold
* @type boolean
* @default false
* @desc If enable and set amount, the Debugger will send a log, if player reached the progress.
*
* @param ProgressGoldAmount
* @text Goal Gold Amount
* @parent --Goals Logs--
* @type number
* @desc Set a specified amount. if player reached, will send a log into your window
* 
*
* @param --Control Timer--
*
* @param ReposControlTimer
* @parent --Control Timer--
* @text Reposition Control Timer
* @type boolean
* @default true
* @desc If true, debugger will be reposition your Control timer
*
* @param EnableCountdownLogs
* @parent --Control Timer--
* @text Enable Countdown Logs
* @type boolean
* @default true
* @desc If true, countdown start will be logged
*
* @param HideExpiredTimer
* @parent --Control Timer--
* @text Hide Expired Timer
* @type boolean
* @default false
* @desc If true, the expired counter will hide
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
    var TeleportDeletePrevLogs = JSON.parse(parameters['TeleportDeletePrevLogs'] || 'false');

    // Control timer
    var ReposControlTimer = JSON.parse(parameters['ReposControlTimer'] || 'true');
    var EnableCountdownLogs = JSON.parse(parameters['EnableCountdownLogs'] || 'true');
    var HideExpiredTimer = JSON.parse(parameters['HideExpiredTimer'] || 'false');


    // yanfly Quest Journay
    var EnableQuestLog = JSON.parse(parameters['EnableQuestLog'] || 'false');

    // logs params
    var EnableVarTracker = JSON.parse(parameters['EnableVarTracker'] || 'true');
    var EnableSwitcherLog = JSON.parse(parameters['EnableSwitcherLog'] || 'true');
    var EnableSelfSwitch = JSON.parse(parameters['EnableSelfSwitch'] || 'true');
    var EnableMoveMentLog = JSON.parse(parameters['EnableMoveMentLog'] || 'true');
    var EnableItemLog = JSON.parse(parameters['EnableItemLog'] || 'true');
    var EnableWaitingLog = JSON.parse(parameters['EnableWaitingLog'] || 'false');
    var EnableRegionLogs = JSON.parse(parameters['EnableRegionLogs'] || 'true');



    var StarterVariable = Number(parameters['StarterVariable'] || '2');
    var StepsLog = Number(parameters['StepsLog'] || '100');

    // Player logs
    
    var XpChangedLogs = JSON.parse(parameters['XpChangedLogs'] || 'true');
    var ItemUsedLog = JSON.parse(parameters['ItemUsedLog'] || 'true');
    


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
  
    var lastUsedItemsLog = []; 

    INDIE.Debugger.logWindowVisible = true;
    var logWindowToggleKey = parameters['LogWindowToggle'] || 'f';
    var LogsDelete = parameters['LogsDelete'] || 'q';
    Input.keyMapper[LogsDelete.toUpperCase().charCodeAt(0)] = 'clearLog';
    Input.keyMapper[logWindowToggleKey.toUpperCase().charCodeAt(0)] = 'logToggle';



    // Progress trackers

    var ProgressGold = Boolean(parameters['ProgressGold']);
    var ProgressGoldAmount = Number(parameters['ProgressGoldAmount']);
    var goldProgressDone = false; 

//=============================================================================
// ** Windows 
//=============================================================================


var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        if(enableGoldWindow){
            this._goldWindow = new GoldWindow(10, 10);  
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


    // hide show log window

    // Update the log toggle method
    Scene_Map.prototype.processLogToggle = function() {
        if (Input.isTriggered('logToggle')) {
            if (this._debugLogWindow.visible) {
                this._debugLogWindow.manualHide();
            } else {
                this._debugLogWindow.manualShow();
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
        var y = Graphics.boxHeight - 500 - height - 10;
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
    

   
  
    // Required inf.

   // Item log
    var _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        _Game_Party_gainItem.call(this, item, amount, includeEquip);
        if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._itemWatcherWindow) {
            SceneManager._scene._itemWatcherWindow.refresh();
        }
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow && EnableItemLog) {
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
    var y = Graphics.boxHeight - 500 - height - 10;
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
    var y = Graphics.boxHeight - 500 - height - 10;
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
    this._mapName = $dataMapInfos[$gameMap._mapId].name;
    this._playerName = $gameParty.leader().name();
    this._playerHP = $gameParty.leader().hp;
    this._playerClass = $gameParty.leader().currentClass().name; 
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - 450; 
    var y = Graphics.boxHeight - 500 - height - 10;
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
    } else if (PlayerInfo1 == "MapName") {
        this.contents.fontSize = 15;
        this.drawText("Map: " + $dataMapInfos[$gameMap._mapId].name, 0, -10, this.contentsWidth(), 'left');
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
    } else if (PlayerInfo1 == "MapName" && this._mapName !== $dataMapInfos[$gameMap._mapId].name) {
        this._mapName = $dataMapInfos[$gameMap._mapId].name;
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
    var x = Graphics.boxWidth - 450 + this.windowWidth() + 5;
    var y = Graphics.boxHeight - 500 - height - 10;
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
    var x = Graphics.boxWidth - 450 + (this.windowWidth() * 2) + 10;
    var y = Graphics.boxHeight - 500 - height - 10;
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
// var _Game_Party_gainGold = Game_Party.prototype.gainGold;
// Game_Party.prototype.gainGold = function(amount) {
//     _Game_Party_gainGold.call(this, amount);
//     var scene = SceneManager._scene;
//     if (scene instanceof Scene_Map && scene._goldWindow) {
//         scene._goldWindow.refresh();
//     }
// };

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
    this._manuallyHidden = false;
    this._log = INDIE.Debugger.logData || []; // Load the logs from INDIE.Debugger.logData
    this._lastLogTime = Date.now();
    // var x = Graphics.boxWidth - 450;
    var x = Graphics.boxWidth - 480;
    var y = Graphics.boxHeight - 500;
    // var width = 450;
    var width = 480;
    var height = 500;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};



    // Update the hide and show methods
    Window_DebugLog.prototype.hide = function() {
    if (!this._manuallyHidden) { // Only hide if not manually hidden
        Window_Selectable.prototype.hide.call(this);
    }
};

    Window_DebugLog.prototype.show = function() {
    if (!this._manuallyHidden) { // Only show if not manually hidden
        Window_Selectable.prototype.show.call(this);
    }
};

    // Add new methods to manually hide and show the window
Window_DebugLog.prototype.manualHide = function() {
    this._manuallyHidden = true;
    Window_Selectable.prototype.hide.call(this);
};

Window_DebugLog.prototype.manualShow = function() {
    this._manuallyHidden = false;
    Window_Selectable.prototype.show.call(this);
};

var _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    // Delete the current Window_DebugLog
    if (INDIE.Debugger._debugLog) {
        INDIE.Debugger._debugLog.hide();
        INDIE.Debugger._debugLog = null;
    }
    // Create a new Window_DebugLog
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
    this.keyInput(); 
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
        } else if (PlayerInfo1 == "MapName" && this._mapName !== $dataMapInfos[$gameMap._mapId].name) {  
            this._mapName = $dataMapInfos[$gameMap._mapId].name;
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
            if(INDIE.Debugger.isBattleRunning) {
                this.hide(); 
            } else {
                this.show(); 
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
    while (this._textState.index < this._textState.text.length) {
        let nextChar = this._textState.text[this._textState.index];
        let nextCharWidth = this.textWidth(nextChar);
        if (this._textState.x + nextCharWidth > maxWidth) {
            var lastSpaceIndex = this._textState.text.lastIndexOf(' ', this._textState.index);
            if (lastSpaceIndex === -1) {
                lastSpaceIndex = this._textState.index;
            } else {
                lastSpaceIndex += 1;
            }
            var textToPush = this._textState.text.substring(0, lastSpaceIndex);
            var remainingText = this._textState.text.substring(lastSpaceIndex);
            if (this._textState.text[this._textState.index] !== remainingText[0]) {
                remainingText = this._textState.text[this._textState.index] + remainingText;
            }
            brokenLines.push(textToPush);
            this._textState.text = remainingText;
            this._textState.index = 0;
            this._textState.x = 0;  // Reset the x position
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

    for (let i = 0; i < lines.length; i++) {
        let text = lines[i];
        let y = rect.y + i * this.itemHeight(); // update the y coordinate for each line
        this.drawTextExWithFontSize(text, rect.x, y, rect.width);
        rect.x = 0;
    }
};




Window_DebugLog.prototype.addLine = function(text) {
    this.contents.fontSize = 16;
    var lines = this.drawTextExWithFontSize(text, 0, 0, this.contentsWidth());

    if (this._log.length === 0) {
        for (let i = 0; i < 1; i++) {
            this._log.push([" "]);
        }
    }

    let linesAdded = 0;
    for (let line of lines) {
        this._log.push([line]);
        linesAdded += 1;
    }

    // Update INDIE.Debugger.logData
    INDIE.Debugger.logData = this._log;

    this._lastLogTime = Date.now();
    if (!smartFadeEnable) {
        this.opacity = 255;
    }
    this.refresh();
    this.setTopRow(Math.max(0, this._log.length - this.maxPageItems() + linesAdded - 1));
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


//=============================================================================
// ** Delete logs when new game started
//=============================================================================

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
// ** Log watcher's - STARTER LOGS
//=============================================================================

// startervar param
var gameHasStartedVariableId = StarterVariable;

var _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this); // Call original function

    // Check if the gameHasStartedVariableId has been set
    if (gameHasStartedVariableId && gameHasStartedVariableId > 0 && !$gameVariables.value(gameHasStartedVariableId)) {
        $gameVariables.setValue(gameHasStartedVariableId, 1);

        var separator = getCurrentTime() + " ----------------------------------------";
        this._debugLogWindow.addLine(separator);
        this._debugLogWindow.addLine(getCurrentTime() + " GAME STARTED");

        var activePlugins = $plugins.filter(function(plugin) {
            return plugin.status;
        });
        var activePluginCount = activePlugins.length;
        this._debugLogWindow.addLine(getCurrentTime() + " Loaded, and activated plugins: " + activePluginCount);

        this._debugLogWindow.addLine(separator);

        var partySize = $gameParty.size();
        this._debugLogWindow.addLine(getCurrentTime() + " PARTY SIZE: " + partySize);

        var partyMembers = $gameParty.members();
        var partyMemberNames = partyMembers.map(function(member) {
            return member.name();
        });
        this._debugLogWindow.addLine(getCurrentTime() + " PARTY MEMBERS: " + partyMemberNames.join(', '));

        var mapName = $dataMapInfos[$gameMap._mapId].name;
        this._debugLogWindow.addLine(getCurrentTime() + " LOADED MAP: " + mapName);

        var tilesetId = $dataMap.tilesetId;
        var tilesetName = $dataTilesets[tilesetId].name;
        this._debugLogWindow.addLine(getCurrentTime() + " LOADED TILESET: " + tilesetName);
        
        var goldName = TextManager.currencyUnit;
        var goldAmount = $gameParty.gold();
        this._debugLogWindow.addLine(getCurrentTime() + " Current " + goldName + " amount: " + goldAmount);

        var playerX = $gamePlayer.x;
        var playerY = $gamePlayer.y;
        this._debugLogWindow.addLine(getCurrentTime() + " PLAYER POSITION: X=" + playerX + " Y=" + playerY);

        var encountersExist = $dataMap.encounterList.length > 0;
        this._debugLogWindow.addLine(getCurrentTime() + " Encounters exist on this map: " + (encountersExist ? "Yes" : "No"));

        // Check if dash is disabled
        var isDashDisabled = $gameMap.isDashDisabled();
        this._debugLogWindow.addLine(getCurrentTime() + " Is dash disabled: " + (isDashDisabled ? "Yes" : "No"));

        this._debugLogWindow.addLine(separator);
    }
};



//=============================================================================
// ** Log watcher's - Switcher Log
//=============================================================================

var _Game_Switches_setValue = Game_Switches.prototype.setValue;

Game_Switches.prototype.setValue = function(switchId, value) {
    var oldValue = this.value(switchId);  // Get the old value of the switch
    _Game_Switches_setValue.call(this, switchId, value);
    
    if (EnableSwitcherLog && oldValue !== value) {  // Only log if the switch value has actually changed
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var switchName = $dataSystem.switches[switchId];
            var switchState = value ? "ON" : "OFF";
            var logText = currentTime + " [SWITCHER] - " + (switchName ? switchName : "Switch " + switchId) + ": " + switchState;
            scene._debugLogWindow.addLine(logText);
        }
    }
};
// range type test
var _Game_Interpreter_command121 = Game_Interpreter.prototype.command121;
Game_Interpreter.prototype.command121 = function() {
    var isSwitchRange = this._params[0] !== this._params[1];
    if (EnableSwitcherLog && isSwitchRange) {  // Only log if this is a switch range
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var startSwitchId = this._params[0];
            var endSwitchId = this._params[1];
            var switchState = this._params[2] === 0 ? "ON" : "OFF";
            var logText = currentTime + " [RANGE SWITCHER] : " + startSwitchId + " - " + endSwitchId + ": " + switchState;
            scene._debugLogWindow.addLine(logText);
        }
    }
    // Temporarily disable switch logging
    var oldEnableSwitcherLog = EnableSwitcherLog;
    if (isSwitchRange) {
        EnableSwitcherLog = false;
    }
    var result = _Game_Interpreter_command121.call(this);
    // Restore the original logging state
    EnableSwitcherLog = oldEnableSwitcherLog;
    return result;
};





//=============================================================================
// ** Log watcher's - Self Switcher log
//=============================================================================

var _Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function(key, value) {
    var oldValue = this.value(key);  // Get the old value of the self switch
    if (EnableSelfSwitch) { // Only execute if SelfSwitch tracking is enabled
        var eventId = key[1];
        var selfSwitchId = key[2];
        var event = $gameMap.event(eventId);
        var oldPageId = event.findProperPageIndex() + 1; // +1 for RPG Maker's 1-based indexing

        // Skip logging if the event is running parallel process or autorun and has already been logged
        var currentPage = event.event().pages[oldPageId - 1];
        if ((currentPage.trigger === 4 || currentPage.trigger === 5) && event._logged) {
            _Game_SelfSwitches_setValue.call(this, key, value);
            return;
        }
        
        _Game_SelfSwitches_setValue.call(this, key, value);
        
        if (oldValue !== value) {  // Only log if the self switch value has actually changed
            var scene = SceneManager._scene;
            if (scene instanceof Scene_Map && scene._debugLogWindow) {
                var newPageId = event.findProperPageIndex() + 1; // +1 for RPG Maker's 1-based indexing
                var switchState = value ? "Enabled" : "Disabled"; // Get the state of the switch
        
                var logText1 = getCurrentTime() + " " + event.event().name + " [SELF](" + selfSwitchId + ") " + switchState;
                var logText2 = getCurrentTime() + " " + event.event().name  + " Page changed from (" + oldPageId + ") to (" + newPageId + ")";
                scene._debugLogWindow.addLine(logText1);
                scene._debugLogWindow.addLine(logText2);
                
                // Mark the event as logged if it is a parallel process or autorun
                if (currentPage.trigger === 4 || currentPage.trigger === 5) {
                    event._logged = true;
                }
            }
        }
    } else {
        _Game_SelfSwitches_setValue.call(this, key, value);
    }
};

// Reset the logged property when the event starts
var _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
Game_Interpreter.prototype.setup = function(list, eventId) {
    _Game_Interpreter_setup.call(this, list, eventId);
    var event = $gameMap.event(eventId);
    if (event) {
        event._logged = false;
    }
};



//=============================================================================
// ** Log watcher's - Manual event watchers (+2 script calls)
//=============================================================================

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
            scene._debugLogWindow.addLine(currentTime + " ----------------------------------------");

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
                    scene._debugLogWindow.addLine(currentTime + " ----------------------------------------");

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
            scene._debugLogWindow.addLine(currentTime + " ----------------------------------------");

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
                    scene._debugLogWindow.addLine(currentTime + " ----------------------------------------");

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
            scene._debugLogWindow.addLine(currentTime + " ----------------------------------------");

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

//=============================================================================
// ** Log watcher's - Gold changes
//=============================================================================



// Backup original gainGold function
var _Game_Party_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    var oldGold = this.gold(); // Save old gold amount
    var newGold = oldGold + amount; // Calculate new gold amount

    // If gold amount changes
    if (oldGold !== newGold) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var logText = currentTime;
            if(newGold > oldGold){
                logText += " [GOLD]" + " + " + (newGold - oldGold) + " " + TextManager.currencyUnit + " gained";
            } else {
                logText += " [GOLD]" + " - " + (oldGold - newGold) + " " + TextManager.currencyUnit + " removed";
            }
            scene._debugLogWindow.addLine(logText);
        }
    }

    _Game_Party_gainGold.call(this, amount); // Call original method
    
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._goldWindow) {
        scene._goldWindow.refresh();
    }
};


//=============================================================================
// ** Log watcher's - Steps log
//=============================================================================


// Additional variable to keep track of the last logged step count
var lastLoggedStepCount = 0;

// Check if the number of steps the player has taken is a multiple of StepsLog
var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this); // Call original function

    if (Input.isTriggered('clearLog')) {
        if (this._debugLogWindow) {
            this._debugLogWindow.clear();
        }
    }
    if (this._debugLogWindow && ItemUsedLog && lastUsedItemsLog.length > 0) { // Check if ItemUsedLog is true
        for (var i = 0; i < lastUsedItemsLog.length; i++) {
            this._debugLogWindow.addLine(lastUsedItemsLog[i]);
        }
        lastUsedItemsLog = []; // Clear the array after adding logs to the window
    }
    // log window toggle process
    this.processLogToggle();
    // Get current step count
    var currentSteps = $gameParty.steps();

    // Check if currentSteps is a multiple of StepsLog, is greater than 25, and is greater than the last logged step count
    if (StepsLog > 0 && currentSteps >= 25 && currentSteps % StepsLog == 0 && currentSteps > lastLoggedStepCount) {
        this._debugLogWindow.addLine(getCurrentTime() + " The player has reached " + currentSteps + " steps");

        // Update the last logged step count
        lastLoggedStepCount = currentSteps;
    }

    // progress tracker

    if (ProgressGold && ProgressGoldAmount > 0) {
        // Check if the gold progress is done
        if ($gameParty.gold() >= ProgressGoldAmount && !goldProgressDone) {
            if (this._debugLogWindow) {
                var logText = getCurrentTime() + " [PROGRESS Gold] done: " + ProgressGoldAmount;
                this._debugLogWindow.addLine(logText);
                goldProgressDone = true;  // mark as done so we don't log this again
            }
        }
    }

};


//=============================================================================
// ** Log watcher's - Choice log
//=============================================================================

var _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
var _Game_Interpreter_command402 = Game_Interpreter.prototype.command402;

Game_Interpreter.prototype.setupChoices = function(params) {
    this._choicesLog = params[0].slice();
    _Game_Interpreter_setupChoices.call(this, params);
};

Game_Interpreter.prototype.command402 = function() {
    if (this._choicesLog) {
        var logText = getCurrentTime() + " [CHOICE] - " + this._choicesLog[this._branch[this._indent]];
        if (SceneManager._scene._debugLogWindow) {
            SceneManager._scene._debugLogWindow.addLine(logText);
        }
        this._choicesLog = null; // töröljük a logot a választás után
    }
    _Game_Interpreter_command402.call(this);
    return true;
};

//=============================================================================
// ** Log watcher's - Change Tilesets log
//=============================================================================

var _Game_Interpreter_command282 = Game_Interpreter.prototype.command282;
Game_Interpreter.prototype.command282 = function() {
    var newTilesetId = this._params[0];
    var newTilesetName = $dataTilesets[newTilesetId].name;

    // If the scene is a map and has a debug log window, log the tileset change
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        if (!this._tilesetChangeLogged || this._tilesetChangeLogged !== newTilesetId) {
            var logText = getCurrentTime() + " TILESET CHANGED TO: " + newTilesetName;
            scene._debugLogWindow.addLine(logText);
            this._tilesetChangeLogged = newTilesetId;
        }
    }

    // Execute the original command282 function (change tileset)
    return _Game_Interpreter_command282.call(this);
};

//=============================================================================
// ** Log watcher's - Region ID logs
//=============================================================================

var _Game_Player_moveStraight = Game_Player.prototype.moveStraight;
Game_Player.prototype.moveStraight = function(d) {
    _Game_Player_moveStraight.call(this, d); // Call original function

    // Only proceed if player has moved successfully
    if (this.isMovementSucceeded() && EnableRegionLogs) {
        var x = this._x;
        var y = this._y;
        var newRegionId = $gameMap.regionId(x, y);

        // If the region has changed, add log entry
        if (this.currentRegionId !== newRegionId) {
            var scene = SceneManager._scene;

            // Check if the current scene is Scene_Map and it contains _debugLogWindow
            if (scene instanceof Scene_Map && scene._debugLogWindow) {
                if (newRegionId > 0) {
                    var logText = getCurrentTime() + " ENTERED REGION: " + newRegionId;
                    scene._debugLogWindow.addLine(logText);
                } else if (this.currentRegionId !== undefined) {
                    var logText = getCurrentTime() + " NO LONGER ANY REGION";
                    scene._debugLogWindow.addLine(logText);
                }
            }

            // Update the player's current region ID
            this.currentRegionId = newRegionId;
        }
    }
};

//=============================================================================
// ** Log watcher's - Control Timer log
//=============================================================================

// log when start
var _Game_Timer_start = Game_Timer.prototype.start;
Game_Timer.prototype.start = function(count) {
    _Game_Timer_start.call(this, count); // Call the original function
    if (EnableCountdownLogs) {
        // If Debug Log Window exists, log the countdown start
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var countdownTime = count / 60;
            var minutes = Math.floor(countdownTime / 60);
            var seconds = countdownTime % 60;

            var logText = getCurrentTime() + " Countdown started " + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            scene._debugLogWindow.addLine(logText);
        }
    }    
};

// expired

var _Game_Timer_onExpire = Game_Timer.prototype.onExpire;
Game_Timer.prototype.onExpire = function() {
    _Game_Timer_onExpire.call(this); // Call the original function
    if (EnableCountdownLogs) {
    // If Debug Log Window exists, log the expiration event
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var logText = getCurrentTime() + " Countdown expired";
            scene._debugLogWindow.addLine(logText);
        }
    }
    if (HideExpiredTimer) {
     // Hide the countdown timer
     $gameTimer._working = false;
    }
};

// stopped

var _Game_Timer_stop = Game_Timer.prototype.stop;
Game_Timer.prototype.stop = function() {
    // // Get the remaining time before stopping the timer
    // var remainingTime = this.seconds();

    _Game_Timer_stop.call(this); // Call the original function
    if (EnableCountdownLogs) {
        // Get the remaining time before stopping the timer
        var remainingTime = this.seconds();
    // If Debug Log Window exists, log the stop event and remaining time
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;

        var logText = getCurrentTime() + " Countdown stopped";
        if (remainingTime > 0) {
            logText += " - (rem time: " + minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ")";
        }

        scene._debugLogWindow.addLine(logText);
    }
 }
};




//=============================================================================
// ** PLAYERS LOGS
//=============================================================================
// ** Log watcher's - Level Up / DOWN -- Not working yet..
//=============================================================================

// if(LevelUpAndDown){
//     var oldLevel;

//     // Override Game_Actor.prototype.changeLevel
//     var _Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
//     Game_Actor.prototype.changeLevel = function(level, show) {
//         oldLevel = this._level; // Save old level
//         _Game_Actor_changeLevel.call(this, level, show); // Call original method

//         var scene = SceneManager._scene;
//         if (show && scene instanceof Scene_Map && scene._debugLogWindow && oldLevel !== this._level) {
//             // Determine level up or level down
//             var levelChangeText = level > oldLevel ? "[LEVEL UP] - " : "[LEVEL DOWN] - ";
//             var logText = getCurrentTime() + " " + levelChangeText + "" + this._name + " from (" + oldLevel + ") to (" + level + ")";
//             scene._debugLogWindow.addLine(logText);
//         }
//     };

//     // Override Game_Actor.prototype.levelUp
//     var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
//     Game_Actor.prototype.levelUp = function() {
//         oldLevel = this._level; // Save old level
//         _Game_Actor_levelUp.call(this); // Call original method

//         var scene = SceneManager._scene;
//         if (scene instanceof Scene_Map && scene._debugLogWindow && oldLevel !== this._level) {
//             var logText = getCurrentTime() + " [LEVEL UP] - " + this._name + " from (" + oldLevel + ") to (" + this._level + ")";
//             scene._debugLogWindow.addLine(logText);
//         }
//     };

//     // Override Game_Actor.prototype.levelDown
//     var _Game_Actor_levelDown = Game_Actor.prototype.levelDown;
//     Game_Actor.prototype.levelDown = function() {
//         oldLevel = this._level; // Save old level
//         _Game_Actor_levelDown.call(this); // Call original method

//         var scene = SceneManager._scene;
//         if (scene instanceof Scene_Map && scene._debugLogWindow && oldLevel !== this._level) {
//             var logText = getCurrentTime() + " [LEVEL DOWN] - " + this._name + " from (" + oldLevel + ") to (" + this._level + ")";
//             scene._debugLogWindow.addLine(logText);
//         }
//     };
// }



//=============================================================================
// ** Log watcher's - XP GAIN / remove from event
//=============================================================================
// Override Game_Interpreter.prototype.command315
var _Game_Interpreter_command315 = Game_Interpreter.prototype.command315;
Game_Interpreter.prototype.command315 = function() {
    var targetActors = [];
    switch (this._params[0]) {
        case 0:  // The whole party
            targetActors = $gameParty.members();
            break;
        case 1:  // Specific actor
            targetActors.push($gameActors.actor(this._params[1]));
            break;
    }

    targetActors.forEach(function(actor) {
        if (actor === undefined) return;

        // Calculate the amount of XP to be added or removed
        var value = (this._params[2] === 0 ? this._params[3] : $gameVariables.value(this._params[3]));
        if (this._params[1] === 1) {
            value = -value;
        }

        // Save the actor's old XP
        var oldXP = actor.currentExp();

        // Call the original method
        _Game_Interpreter_command315.call(this);

        // Calculate the XP difference
        var xpDifference = actor.currentExp() - oldXP;

        // Log the XP change only if the change is not zero and if XpChangedLogs is true
        if (xpDifference !== 0 && XpChangedLogs) {
            var scene = SceneManager._scene;
            if (scene instanceof Scene_Map && scene._debugLogWindow) {
                var expChangeText = xpDifference > 0 ? "[EXP GAINED] - " : "[EXP REMOVED] - ";
                var logText = getCurrentTime() + " " + expChangeText + actor._name + " changed XP by " + xpDifference;
                scene._debugLogWindow.addLine(logText);
            }
        }
    }.bind(this));

    // Always return true to not break game's event command flow
    return true;
};


//=============================================================================
// ** Log watcher's - Used items log
//=============================================================================


var _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
Scene_ItemBase.prototype.useItem = function() {
    _Scene_ItemBase_useItem.call(this);
    var item = this.item();
    if (ItemUsedLog && DataManager.isItem(item) && this.user().canUse(item)) { // Check if ItemUsedLog is true
        var target = this.user();
        var currentTime = getCurrentTime();
        lastUsedItemsLog.push(currentTime + " " + item.name + " used on " + target.name()); // Add log to the array instead of a single variable
    }
};



//=============================================================================
// ** Log watcher's - Party Changes
//=============================================================================


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


//=============================================================================
// ** Log watcher's - Event erasing
//=============================================================================


// Track event erasing
var _Game_Event_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
    _Game_Event_erase.call(this);
    
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var logText = getCurrentTime() + " " + this.event().name + " (#" + this._eventId + ") deleted";
        scene._debugLogWindow.addLine(logText);
    }
};


//=============================================================================
// ** Log watcher's - Show Animation // In progress
//=============================================================================




//=============================================================================
// ** Log watcher's - Conditional branch
//=============================================================================

var _Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function(params) {
    // Store the original value of this._branch[this._indent]
    var originalBranchResult = this._branch[this._indent];

    // Run the original process first
    _Game_Interpreter_command111.call(this, params);

    // Run your logics
    var eventId = this._eventId;
    var event = $gameMap.event(eventId);
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        if (this._branch[this._indent] !== originalBranchResult) {
            var logText = getCurrentTime() + " " + event.event().name + "(#" + eventId + ") [CONDITIONAL BRANCH] - " + (this._branch[this._indent] ? "TRUE" : "FALSE");
            scene._debugLogWindow.addLine(logText);
        }
    }

    // Return to the original process
    return true;
};



//=============================================================================
// ** Log watcher's - Movement route log
//=============================================================================


var _Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.call(this, mapId, eventId);
    this._isMoving = false;
};

var _Game_Event_processRouteEnd = Game_Event.prototype.processRouteEnd;
Game_Event.prototype.processRouteEnd = function() {
    _Game_Event_processRouteEnd.call(this);
    if (this._isMoving && EnableMoveMentLog) {
        this._isMoving = false;
        var eventId = this._eventId;
        var event = $gameMap.event(eventId);
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var logText = getCurrentTime() + " " + event.event().name + "(#" + eventId + ") [MOVEMENT] - Ended";
            scene._debugLogWindow.addLine(logText);
        }
    }
};

var _Game_Event_moveStraight = Game_Event.prototype.moveStraight;
Game_Event.prototype.moveStraight = function(d) {
    _Game_Event_moveStraight.call(this, d);
    if (!this._isMoving && this.isMovementSucceeded() && EnableMoveMentLog) {
        this._isMoving = true;
        var eventId = this._eventId;
        var event = $gameMap.event(eventId);
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var logText = getCurrentTime() + " " + event.event().name + "(#" + eventId + ") [MOVEMENT] - Started";
            scene._debugLogWindow.addLine(logText);
        }
    }
};

//=============================================================================
// ** Log watcher's - Var Tracker
//=============================================================================

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

                // Log the current value in a new line
                var currentValText = currentTime + " [CURRENT VALUE] : " + value;
                scene._debugLogWindow.addLine(currentValText);
            }
        }
    }
    
    // Call the original setValue function to actually update the variable
    _Game_Variables_setValue.call(this, variableId, value);
};



// range version

var _Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
    var isVariableRange = this._params[0] !== this._params[1];
    if (EnableVarTracker && isVariableRange) {  // Only log if this is a variable range
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var startVariableId = this._params[0];
            var endVariableId = this._params[1];
            var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
            var logText = currentTime + " [RANGE VARIABLE]: " + startVariableId + " - " + endVariableId + ": changed by " + Math.abs(value);            
            scene._debugLogWindow.addLine(logText);
        }
    }
    // Temporarily disable variable logging
    var oldEnableVarTracker = EnableVarTracker;
    if (isVariableRange) {
        EnableVarTracker = false;
    }
    var result = _Game_Interpreter_command122.call(this);
    // Restore the original logging state
    EnableVarTracker = oldEnableVarTracker;
    return result;
};


//=============================================================================
// ** Log watcher's - Tint Screen
//=============================================================================

// Store the original startTint function
var _Game_Screen_startTint = Game_Screen.prototype.startTint;

// Store the current screen tint
var _currentTint = null;

Game_Screen.prototype.startTint = function(tone, duration) {
    // Disable waiting log temporarily
    var tmpEnableWaitingLog = EnableWaitingLog;
    EnableWaitingLog = false;

    // Call the original startTint function
    _Game_Screen_startTint.call(this, tone, );

    // Enable waiting log again
    EnableWaitingLog = tmpEnableWaitingLog;

    // Predefined tones
    var predefinedTones = {
        "Normal": [0, 0, 0, 0],
        "Dark": [-68, -68, -68, 0],
        "Sunset": [68, -34, -34, 0],
        "Night": [-68, -68, 0, 68],
        "Sepia": [34, -34, -68, 170],
    };
    
    // Check if the tone matches any of the predefined tones
    var toneName = null;
    for (var predefinedToneName in predefinedTones) {
        if (predefinedTones.hasOwnProperty(predefinedToneName)) {
            if (predefinedTones[predefinedToneName].toString() === tone.toString()) {
                toneName = predefinedToneName;
                break;
            }
        }
    }
    
    // If the tone doesn't match any of the predefined ones, use the color codes
    if (toneName === null) {
        toneName =  "[" + tone.join(", ") + "]";
    }

    // Only log the event if the tint has changed
    if (_currentTint !== toneName) {
        _currentTint = toneName;
    
        // Check if the scene is an instance of Scene_Map and if the DebugLogWindow exists
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var logText = currentTime + " [TINT SCREEN] ";
            logText += "Tone: " + toneName;
            scene._debugLogWindow.addLine(logText);
        }
    }
};



//=============================================================================
// ** Log watcher's - Play BGM
//=============================================================================

// Store the original command241 function
var _Game_Interpreter_command241 = Game_Interpreter.prototype.command241;

// Store the currently playing BGM
var _currentBGM = null;

Game_Interpreter.prototype.command241 = function() {
    // Call the original command241 function
    _Game_Interpreter_command241.call(this);

    // Only log the event if the BGM has changed
    if (_currentBGM !== this._params[0].name) {
        _currentBGM = this._params[0].name;
    
        // Check if the scene is an instance of Scene_Map and if the DebugLogWindow exists
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var bgm = $gameSystem.bgmVolume;
            var logText = currentTime + " [PLAY BGM] ";
            logText += this._params[0].name + ", Volume: " + this._params[0].volume;
            scene._debugLogWindow.addLine(logText);
        }
    }
    
    // Continue
    return true;
};


//=============================================================================
// ** Log watcher's - Teleport log  
//=============================================================================


var originalCommand201 = Game_Interpreter.prototype.command201;
var oldMapId, oldMapName;
var newMapId, newMapName;
var isTeleporting = false;

Game_Interpreter.prototype.command201 = function() {
    oldMapId = $gameMap.mapId();
    oldMapName = $dataMapInfos[oldMapId].name;
 
    originalCommand201.call(this);
    
    isTeleporting = true;

    return true;
};

var originalUpdate = Scene_Map.prototype.update;

Scene_Map.prototype.update = function() {
    // Itt hívjuk meg először az eredeti update függvényt
    originalUpdate.call(this);

    $gameMap.events().forEach(function(event) {
        if (event._interpreter && typeof event._interpreter.logEvent === "function") {
            event._interpreter.logEvent(event.eventId());
        }

        if (event._interpreter && typeof event._interpreter.checkAndLogEventEnds === "function") {
            event._interpreter.checkAndLogEventEnds();
        }
    }, this);

    if (isTeleporting && $gameMap.mapId() !== oldMapId) {
        newMapId = $gameMap.mapId();
        newMapName = $dataMapInfos[newMapId].name;

        if (newMapName) {
            var logText = getCurrentTime() + " Teleport from " + oldMapName + 
                          " to " + newMapName;
            if (this._debugLogWindow) {
                this._debugLogWindow.addLine(logText);
                if(TeleportDeletePrevLogs){
                    this._debugLogWindow.clear();
                    this._debugLogWindow.addLine(logText);
                }
                isTeleporting = false;
            }
        }
    }

    var gameInterpreter = $gameMap._interpreter;

    if (gameInterpreter) {
        var currentTimeInSeconds = Math.floor(Date.now() / 1000);

        if (!this._lastCheckTime || currentTimeInSeconds > this._lastCheckTime) {
            gameInterpreter.checkRunningEvents();
            this._lastCheckTime = currentTimeInSeconds;
        }
    }
};



//=============================================================================
// ** Log watcher's - Common event
//=============================================================================

// only way with little scirpts (so manual)

Game_Interpreter.prototype.logCommonEvent = function(commonEventId) {
    var commonEvent = $dataCommonEvents[commonEventId];
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();
        
        // Add separator line
        scene._debugLogWindow.addLine(currentTime + " ------------------------------------");

        var logText = currentTime + " [COMMON EVENT] " + commonEvent.name + "(#"+ commonEventId + ") RUNNING";
        scene._debugLogWindow.addLine(logText);
    }
};

// finished
Game_Interpreter.prototype.finishCommonEvent = function(commonEventId) {
    var commonEvent = $dataCommonEvents[commonEventId];
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map && scene._debugLogWindow) {
        var currentTime = getCurrentTime();

        // Add separator line
        scene._debugLogWindow.addLine(currentTime + " ------------------------------------");

        var logText = currentTime + " [COMMON EVENT] " + commonEvent.name + "(#"+ commonEventId + ") FINISHED";
        scene._debugLogWindow.addLine(logText);
    }
};

//=============================================================================
// ** Log watcher's - Waiting log
//=============================================================================
   
var _Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
Game_Interpreter.prototype.updateWait = function() {
    if (EnableWaitingLog) {
        var waitingStarted = this._waitCount && !this._prevWaitCount;
        var waitingEnded = !this._waitCount && this._prevWaitCount;

        if (waitingStarted) {
            var currentTime = getCurrentTime();
            // Convert the wait time to seconds
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
    }

    return _Game_Interpreter_updateWait.call(this);
};
    

//=============================================================================
// ** Log watcher's - YANFLY QUEST JOURNEY
//=============================================================================

// SUPP ADD AND COMPLETED

// Store the original pluginCommand function
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    // Call the original pluginCommand function
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // Only execute if the Quest Journal plugin is enabled and our quest system is enabled
    if (typeof $gameSystem.isShowQuest === "function" &&
        typeof $gameSystem.isEnableQuest === "function" &&
        $gameSystem.isShowQuest() && 
        $gameSystem.isEnableQuest() &&
        EnableQuestLog) {
        // Check if the command is "QUEST"
        if (command.toUpperCase() === "QUEST" && args.length > 0) {
            var argString = this.argsToString(args);
            var action = argString.split(" ")[0].toUpperCase();
            var remainingString = argString.substring(action.length).trim();
            var completedAction = false;
            if (remainingString.toUpperCase().startsWith("COMPLETED")) {
                completedAction = true;
                remainingString = remainingString.substring("COMPLETED".length).trim();
            }

            // Check for a range
            var rangeMatch = remainingString.match(/(\d+) TO (\d+)/i);
            if (rangeMatch) {
                var rangeStart = parseInt(rangeMatch[1]);
                var rangeEnd = parseInt(rangeMatch[2]);
                for (var i = rangeStart; i <= rangeEnd; i++) {
                    this.logQuestAction(i, completedAction ? "Completed" : "Started");
                } 
            } else {
                // If not a range, check for a list
                var listMatch = remainingString.match(/([\d,]+)/i);
                if (listMatch) {
                    var ids = listMatch[1].split(",");
                    for (var i = 0; i < ids.length; i++) {
                        this.logQuestAction(ids[i], completedAction ? "Completed" : "Started");
                    }
                } else {
                    // If not a list, it must be a single ID
                    var idMatch = remainingString.match(/(\d+)/i);
                    if (idMatch) {
                        this.logQuestAction(idMatch[1], completedAction ? "Completed" : "Started");
                    }
                }
            }
        }
    }
};

Game_Interpreter.prototype.logQuestAction = function(questId, action) {
    if ($dataQuests.hasOwnProperty(questId)) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            // Retrieve the current time
            var currentTime = getCurrentTime();
            var questTitle = $dataQuests[questId].name;
            // Remove icon codes from the quest title
            var cleanTitle = questTitle.replace(/\\i\[\d+\]/g, '');
            // Construct the log message
            var logText = currentTime + " [QUEST] " + cleanTitle + " " + action;
            scene._debugLogWindow.addLine(logText);
        }
    }
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
        str += args[i] + ' ';
    }
    return str.trim();
};



//=============================================================================
// ** Log watcher's - YANFLY Region Events
//=============================================================================

var _Game_Temp_reserveCommonEvent = Game_Temp.prototype.reserveCommonEvent;

Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    // Check if Yanfly RegionEvent plugin is active
    var pluginName = 'YEP_RegionEvents';
    var pluginStatus = false;
    
    for (var i = 0; i < $plugins.length; i++) {
        if ($plugins[i].name === pluginName) {
            pluginStatus = $plugins[i].status;
            break;
        }
    }

    if (pluginStatus) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Map && scene._debugLogWindow) {
            var currentTime = getCurrentTime();
            var commonEventName = $dataCommonEvents[commonEventId].name;
            // Get the current region ID
            var regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);
            var logText = currentTime + " [REGION:" + regionId + "]" + " activated " + "[CM]" + commonEventName;
            scene._debugLogWindow.addLine(logText);
        }
    }
    
    // Call the original reserveCommonEvent function
    _Game_Temp_reserveCommonEvent.call(this, commonEventId);
};


//=============================================================================
// ** Utility
//=============================================================================

    function getCurrentTime(){
        var time = Math.floor(Graphics.frameCount / 60); // gametime with sec
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = time % 60;
        return hours.padZero(2) + ":" + minutes.padZero(2) + ":" + seconds.padZero(2);
    }


    var _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function() {
        _Scene_Title_createForeground.call(this); // Call original function
    
        var sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        sprite.bitmap.fontSize = 20;
        sprite.bitmap.drawText("Debugger plugin is ENABLED v.0.19", 0, Graphics.height - 40, Graphics.width, 20, 'center');
        this.addChild(sprite);
    };
    



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

//=============================================================================
// ** Title screen plugin window
//=============================================================================

function Window_PluginList() {
    this.initialize.apply(this, arguments);
}

Window_PluginList.prototype = Object.create(Window_Base.prototype);
Window_PluginList.prototype.constructor = Window_PluginList;

Window_PluginList.prototype.initialize = function(x, y) {
    var width = Graphics.boxWidth / 4;  
    var height = Graphics.boxHeight / 2;
    Window_Base.prototype.initialize.call(this, x + 10, y, width, height);  
    this._data = [];
    this._scrollY = 0;
    this.createArrows();
    this.refresh();
};

Window_PluginList.prototype.createArrows = function() {
    var spacing = 52;
    var y = this.height - this.padding - spacing;
    this._downArrowSprite = new Sprite();
    this._downArrowSprite.bitmap = this._windowskin;
    this._downArrowSprite.anchor.y = 0.5;
    this._downArrowSprite.setFrame(192, 0, 32, 32);
    this._downArrowSprite.move(this._width / 2, y + spacing);
    this._downArrowSprite.visible = false;

    this._upArrowSprite = new Sprite();
    this._upArrowSprite.bitmap = this._windowskin;
    this._upArrowSprite.anchor.y = 0.5;
    this._upArrowSprite.setFrame(192, 0, 32, 32);
    this._upArrowSprite.move(this._width / 2, y);
    this._upArrowSprite.visible = false;

    this.addChild(this._downArrowSprite);
    this.addChild(this._upArrowSprite);
};

Window_PluginList.prototype.refresh = function() {
    this.contents.clear();
    this.contents.fontSize = 16;  
    this._data = $plugins.filter(function(plugin) {
        return plugin.status;
    }).map(function(plugin) {
        var versionMatch = plugin.description.match(/v\s*\d+\.\d+(\.\d+)?/i);
        var version = versionMatch ? versionMatch[0] : "";
        return plugin.name + " " + version;
    });
    for (var i = 0; i < this._data.length; i++) {
        this.drawText(this._data[i], 0, i * this.lineHeight() - this._scrollY - 2, this.contentsWidth(), 'left');
    }
};




Window_PluginList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_PluginList.prototype.scrollDown = function() {
    if (this._scrollY <= ((this._data.length - 1) * this.lineHeight() - this.height + this.lineHeight())) {
        this._scrollY += this.lineHeight();
        this.refresh();
    }
};

Window_PluginList.prototype.scrollUp = function() {
    if (this._scrollY >= this.lineHeight()) {
        this._scrollY -= this.lineHeight();
        this.refresh();
    }
};

Window_PluginList.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateArrowsVisibility();
};

Window_PluginList.prototype.updateArrowsVisibility = function() {
    var maxScrollY = (this._data.length - this.fittingHeight()) * this.lineHeight();
    var canScrollUp = this._scrollY > 0;
    var canScrollDown = this._scrollY < maxScrollY;

    this._upArrowSprite.visible = canScrollUp;
    this._downArrowSprite.visible = canScrollDown;
};



var _Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    _Scene_Title_create.call(this);
    this.createPluginListWindow();
};

Scene_Title.prototype.createPluginListWindow = function() {
    this._pluginListHeaderWindow = new Window_PluginListHeader(0, Graphics.boxHeight / 4);
    this._pluginListWindow = new Window_PluginList(0, Graphics.boxHeight / 4 + this._pluginListHeaderWindow.height);
    this.addWindow(this._pluginListHeaderWindow);
    this.addWindow(this._pluginListWindow);
};

var _Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    _Scene_Title_update.call(this);
    if (Input.isTriggered('scrollUp')) {
        this._pluginListWindow.scrollUp();
    }
    if (Input.isTriggered('scrollDown')) {
        this._pluginListWindow.scrollDown();
    }
};

function Window_PluginListHeader() {
    this.initialize.apply(this, arguments);
}

Window_PluginListHeader.prototype = Object.create(Window_Base.prototype);
Window_PluginListHeader.prototype.constructor = Window_PluginListHeader;

Window_PluginListHeader.prototype.initialize = function(x, y) {
    var width = Graphics.boxWidth / 4;  
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x + 10, y, width, height);  
    this.refresh();
};


Window_PluginListHeader.prototype.refresh = function() {
    this.contents.clear();
    this.contents.fontSize = 16; 
    var pluginCount = $plugins.filter(function(plugin) {
        return plugin.status && !plugin.name.startsWith("----");
    }).length;
    this.drawText("Activated Plugins (" + pluginCount + ")", 0, 0, this.contentsWidth(), 'center');
};




//=============================================================================
// ** Control Timer
//=============================================================================


// Store the original update function
var _Sprite_Timer_update = Sprite_Timer.prototype.update;

Sprite_Timer.prototype.update = function() {
    _Sprite_Timer_update.call(this);
    // Check if the reposition option is enabled
    if (ReposControlTimer) {
        this.x = Graphics.width / 2;
        this.y = 10;
    }
};



})(INDIE.Debugger);
