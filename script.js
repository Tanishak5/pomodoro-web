document.addEventListener('DOMContentLoaded', ()=>{
    console.log('alert loaded');

    const kikiAudio = new Audio("music/03 a town with an ocean view (kiki's delivery service).mp3");
    const hpAudio = new Audio("music/Harry_Potter_Theme_Song_Hedwigs_Theme.mp3");
    const lofiAudio = new Audio("music/lofi-study-calm-peaceful-chill-hop-112191.mp3");
    const lofi2Audio = new Audio("music/lofi-girl-lofi-ambient-music-365952.mp3");


	const pomodoroContainer = document.getElementById("pomodoro-container");
    const imgContainer = document.getElementById("img-container");
    const dropDown = document.getElementById("dropdownthemes"); // outer themeblock
    const dropDownMusic = document.getElementById("dropdownmusic"); // outer music block
    const dropDownBacks = document.querySelectorAll(".music-back") // all the music background blocks instead of doing drops
    const dropDownThemeBacks = document.querySelectorAll(".theme-backs")


    //LINKS
    const kiki = document.getElementById("kiki");
    const spiderman = document.getElementById("spiderman");
    const hogwarts = document.getElementById("hp");
    const totoro = document.getElementById("totoro");
    const lofi = document.getElementById("lofi");
    const timerlink = document.getElementById("timer");
    const todoLink = document.getElementById("other");
    const todoContainer = document.getElementById("to-do-container");
    const kikiMusic = document.getElementById("sound1");
    const hpMusic = document.getElementById("sound2");
    const lofiMusic = document.getElementById("sound3");
    const lofiMusic2 = document.getElementById("sound4");
    const stopMusic = document.getElementById("sound5");
    let theme; let currentAudio = null;

    kikiMusic.addEventListener("click", ()=>{
        if (currentAudio && !currentAudio.paused) currentAudio.pause();

        kikiAudio.play();
        // kikiAudio.loop();
        kikiAudio.volume = 0.25;
        currentAudio = kikiAudio;


    })
    hpMusic.addEventListener("click", ()=>{
        if (currentAudio && !currentAudio.paused) currentAudio.pause();

        hpAudio.play();
        // hpAudio.loop();
        hpAudio.volume = 0.25;
        currentAudio = hpAudio;
    })
    lofiMusic.addEventListener("click", ()=>{
        if (currentAudio && !currentAudio.paused) currentAudio.pause();

        lofiAudio.play();
        // lofiAudio.loop();
        lofiAudio.volume = 0.25;
        currentAudio = lofiAudio;
    })
    lofiMusic2.addEventListener("click", ()=>{
        if (currentAudio && !currentAudio.paused) currentAudio.pause();

        lofi2Audio.play();
        // lofiAudio.loop();
        lofi2Audio.volume = 0.25;
        currentAudio = lofi2Audio;
    })

    stopMusic.addEventListener("click", ()=>{
        if(currentAudio){
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        
    })
    
    //THEMES
    let background; let container; let buttonFront; let buttonBack; let hover;
    background =(167, 179, 162);
    container = (118, 148, 126);
    buttonBack = (128, 137, 134)
    buttonFront = (167, 179, 162);
    hover = "#729281";
    let unhover = "#818e7c";
    let title = document.getElementById("title");

    

    //BUTTONS
    const buttonHolder = document.getElementById("button-holder");
    const startText = document.getElementById("start");
    const pauseHolder = document.getElementById("pause-holder");
    const pauseText = document.getElementById("pause");
	const upButton = document.getElementById("up");
	const downButton = document.getElementById("down");
    const dropdowns = document.querySelectorAll(".dropdowns") // all the individual drop down divs aka kiki back etc
    const taskInputBox= document.getElementById("to-do-task");
    const listContainer = document.getElementById("list-container");
    const add = document.getElementById("submit");
    const clear = document.getElementById("clear");

    //Timer Variables
    let timerText = document.getElementById("time");
	let timerString = timerText.textContent;
	let [minutesStr, secondsStr] = timerString.split(":");
	let minutes = parseInt(minutesStr, 10);
	let seconds = parseInt(secondsStr, 10);
    let count = minutes * 60 + seconds;
    // let minutes = 1;
    // let seconds = 0;
    // let count = 60;
    let timerRunning = false;
    let countdownInterval;
    let paused = false
	let originalMinutes;
	let originalSeconds;


 

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', () => {
          dropdown.style.backgroundColor = hover;
        });
      
        dropdown.addEventListener('mouseout', () => {
          dropdown.style.backgroundColor = unhover;
        });

       
    });


    dropdowns.forEach(dropDown =>{
        dropDown.addEventListener("click", ()=>{
            taskInputBox.style.border = `3px solid ${buttonFront}`;
            listContainer.style.border = `1px solid ${buttonFront}`;
            add.style.backgroundColor = buttonFront;
            clear.style.backgroundColor = buttonFront;


        })
    })
    taskInputBox.addEventListener("focus", ()=>{
        taskInputBox.style.outline = `3px solid ${buttonFront}`
    });
    taskInputBox.addEventListener("blur", ()=>{
        taskInputBox.style.outline = "none";
    })
    

    function ResetCss(){
        currBox = "10px 10px 3px";
        buttonHolder.style.cssText = `
        position:relative;
        width: 200px;
        height: 50px;
        background-color:${buttonFront};
        top: 475px;
        left:calc(50% - 200px/2);
        border-radius: 10px;
        box-shadow:  10px 10px 3px ${buttonBack};
        z-index: 1;
    `;
        startText.style.cssText = `
        position: absolute;
        width: 200px;
        height: 90px;
        left: calc(50% - 200px/2);
        top: -30px;
    
        
        font-family: 'Jersey 10';
        font-weight: 400;
        font-size: 60px;
        line-height: 117px;
        color: beige;
        text-align: center;
        place-items: center;`;

    }
    function PauseCSS(){
        currBox = "10px 10px 3px";
        pauseHolder.style.cssText = `
            position:relative;
            width: 200px;
            height: 50px;
            background-color:${buttonFront};
            top: 475px;
            left:calc(50% - 200px/2);
            border-radius: 10px;
            box-shadow:  10px 10px 3px${buttonBack};
            z-index: 1;
        `;
        pauseText.style.cssText = `
            position: absolute;
            width: 200px;
            height: 90px;
            left: calc(50% - 200px/2);
            top: -30px;
        
            
            font-family: 'Jersey 10';
            font-weight: 400;
            font-size: 60px;
            line-height: 117px;
            color: beige;
            text-align: center;
            place-items: center;`;
    }
    function ResumeCSS(){

        pauseHolder.style.cssText = `
        position: absolute;
        width: 105px;
        height: 50px;
        left: 260px;
        top: 475px;
        background: ${buttonFront};
        box-shadow: 10px 10px 3px ${buttonBack};
        border-radius: 10px;`
        
        buttonHolder.style.cssText = `
            position: absolute;
            width: 105px;
            height: 50px;
            left: 100px;
            top: 475px;
            background: ${buttonBack};
            box-shadow: 10px 10px 3px ${buttonBack};
            border-radius: 10px;`
    }
    function StartCSS(){
        pauseHolder.style.cssText = `
			position: absolute;
			width: 105px;
			height: 50px;
			left: 260px;
			top: 475px;
			background:${buttonFront};
            box-shadow: 10px 10px 3px ${buttonBack};
			border-radius: 10px;`
			
			
			buttonHolder.style.cssText = `
				position: absolute;
				width: 105px;
				height: 50px;
				left: 100px;
				top: 475px;
				background: ${buttonFront};
                box-shadow: 10px 10px 3px ${buttonBack};
				border-radius: 10px;`
    }


    kiki.addEventListener("click", ()=>{
        document.body.style.background = "#1F405C";
        container = "#00204C";

        buttonFront = "#1F405C";
        buttonBack = "#1F2E41";

        hover = "#3A475D";
        unhover = "#667B9D";
        dropDown.style.backgroundColor = dropDownMusic.style.backgroundColor =  "#667B9D";
        
        dropDownThemeBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover;});
        dropDown.style.boxShadow = dropDownMusic.style.boxShadow ="3px 3px 5px #4E5D74"
        dropDownBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover;});

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('images/kiki.jpg')";
        imgContainer.style.objectFit = "cover";
        imgContainer.style.backgroundPosition = "center";
        
    })

    spiderman.addEventListener("click", ()=>{
        document.body.style.background = "#5B0709"

        container = "#3C1818";
        buttonFront = "#4D0C01";
        buttonBack = "#090101";
        hover = "#927273"
        unhover = "#865858"
        dropDown.style.backgroundColor =  dropDownMusic.style.backgroundColor = "#865858";
        dropDownThemeBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover;});
        dropDown.style.boxShadow = dropDownMusic.style.boxShadow ="3px 3px 5px #664141";
        dropDownBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover});

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('images/spiderman.png')";
        imgContainer.style.objectFit = "cover";
        imgContainer.style.backgroundPosition = "center";
        
    })
    lofi.addEventListener("click", ()=>{
        document.body.style.background = "#1F405C";

        container = "#00204C";
        buttonFront = "#1F405C";
        buttonBack = "#1F2E41";
        hover = "#3A475D";
        unhover = "#667B9D";
        dropDown.style.backgroundColor = dropDownMusic.style.backgroundColor = "#667B9D";
        dropDownThemeBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover;});
        dropDown.style.boxShadow = dropDownMusic.style.boxShadow = "3px 3px 5px #4E5D74";
        dropDownBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover});

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('images/lofi.png')";
        imgContainer.style.objectFit = "cover";
        imgContainer.style.backgroundPosition = "center";
        
    })
    hogwarts.addEventListener("click", ()=>{
        document.body.style.background = "#713022";

        container = "#4C160B";
        buttonFront = "#703B32";
        buttonBack = "#2D0808";
        hover = "#927273";
        unhover = "#865858";
        dropDown.style.backgroundColor = dropDownMusic.style.backgroundColor= "#865858";
        dropDownThemeBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover;});
        dropDown.style.boxShadow = dropDownMusic.style.boxShadow = "3px 3px 5px #4A362F";
        dropDownBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover});

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('images/gryff-1.jpg')";
        imgContainer.style.objectFit = "cover";
        imgContainer.style.backgroundPosition = "center";
        
    })

    totoro.addEventListener("click", ()=>{
        document.body.style.background = "#A7B3A2";

        container = "#76947E";
        buttonFront = "#A7B3A2";
        buttonBack = "#80897C";
        hover = "#729281";
        unhover = "#818e7c";


        dropDown.style.backgroundColor = dropDownMusic.style.backgroundColor = "#818e7c";
        dropDownThemeBacks.forEach(dropdown =>{dropdown.style.backgroundColor = unhover;});
        dropDown.style.boxShadow = dropDownMusic.style.boxShadow = "3px 3px 5px #41483f";
     
        dropDownBacks.forEach(dropdown =>{
            dropdown.style.backgroundColor = unhover});

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('images/totoro.png')";
        imgContainer.style.objectFit = "cover";
        imgContainer.style.backgroundPosition = "center";
        
        
    })

    timerlink.addEventListener("click", ()=>{

        todoContainer.style.display = "none";
        pomodoroContainer.style.display = "block";
        title.textContent = "Pomodoro Timer";
    })

    
    todoLink.addEventListener("click", (e)=>{
        pomodoroContainer.style.display = "none";
        todoContainer.style.display = "block";
        title.textContent = "To Do List";
        
    })

	upButton.addEventListener("click", ()=>{
		if(minutes <= 55 ){
			minutes+=5;
			count = minutes * 60 + seconds;
			timerText.innerHTML= `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
		}
		

	})

	downButton.addEventListener("click", ()=>{
		if (minutes >= 10 ){
			minutes-=5;
			count = minutes * 60 + seconds;
			timerText.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

		}
	})


    function resetTimer() { 
		
        timerText.innerHTML = `${originalMinutes}:${originalSeconds < 10 ? '0' + originalSeconds : originalSeconds}`;
		minutes = originalMinutes;
		seconds = originalSeconds
		count = originalCount
        clearInterval(countdownInterval); // Clear any running intervals
        timerRunning = false;
        paused = false; // Timer is no longer running
        pauseHolder.style.display = "none";
        pauseText.style.display = "none";
        ResetCss();
		upButton.style.display = "block";
		downButton.style.display = "block";
        startText.textContent = "START";

    }

   function pauseTimer(){
        timerRunning = false;
        paused = true;
        pauseText.textContent = "RESUME";
        clearInterval(countdownInterval)
        buttonHolder.style.display = "none";
        startText.style.display = "none";
        PauseCSS();

   } 
    function startCountDown(){
        let breakStarted = false;
        countdownInterval = setInterval( () =>{
            count--;
            if(seconds == 0){
                seconds = 59;
                minutes--;
            }else{
                seconds--;
            }
            timerText.innerHTML= `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            if(count <=0 && !breakStarted){
                minutes = originalMinutes / 10;
                seconds = originalSeconds;
                count = minutes * 60;
                breakStarted = true;
                console.log("DONE");
            }else if(breakStarted && count<=0){   
                minutes = 0;
                seconds = 0;
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    function resumeTimer(){
        paused = false;
        startCountDown();
     
        pauseHolder.style.display = "block";
        pauseText.style.display = "block";
        ResumeCSS();
        startText.style.display = "block";
        startText.textContent = "RESTART"
        startText.style.fontSize = "35px";
        startText.style.top = "-35px";
        pauseText.textContent = "PAUSE"
        pauseText.style.fontSize = "35px";
        pauseText.style.top = "-35px";
        timerRunning = true;
	}

	function startTimer(){
			originalCount = count;
			originalMinutes = minutes;
			originalSeconds = seconds
			timerRunning = true;
			paused = false;

			upButton.style.display = "none";
			downButton.style.display = "none";
			pauseHolder.style.display = "block";
			pauseText.style.display = "block";
			pauseText.style.display = "block";
			StartCSS();
			startText.textContent = "RESTART"
			startText.style.fontSize = "35px";
			startText.style.top = "-35px";
			pauseText.textContent = "PAUSE"
			pauseText.style.fontSize = "35px";
			pauseText.style.top = "-35px";
			pauseHolder.style.alignContent = "center";
			timerRunning = true;
		

	}


	pauseHolder.addEventListener("click", ()=>{
			if(paused){
				resumeTimer();
			}else{
				pauseTimer();
		}
	})

	buttonHolder.addEventListener("click", ()=>{
		if(!timerRunning ){
			startTimer();
			startCountDown();

			}else{
				resetTimer();
			}
			
	})


})
    


