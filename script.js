document.addEventListener('DOMContentLoaded', ()=>{
    console.log('alert loaded');

	const pomodoroContainer = document.getElementById("pomodoro-container");
    const imgContainer = document.getElementById("img-container");
    const dropDown = document.getElementById("dropdown");
    const kikiDrop = document.getElementById("kikiBack");
    const spiderDrop = document.getElementById("spidermanBack");
    const lofiDrop = document.getElementById("lofiBack");
    const totoroDrop = document.getElementById("totoroBack");
    const hogwartsDrop = document.getElementById("hpBack");

    //LINKS
    const kiki = document.getElementById("kiki");
    const spiderman = document.getElementById("spiderman");
    const hogwarts = document.getElementById("hp");
    const totoro = document.getElementById("totoro");
    const lofi = document.getElementById("lofi");
    let theme;
    
    //THEMES
    let background; let container; let buttonFront; let buttonBack; let hover;
    background =(167, 179, 162);
    container = (118, 148, 126);
    buttonBack = (128, 137, 134)
    buttonFront = (167, 179, 162);
    hover = "#729281";
    let unhover = "#818e7c";

    //BUTTONS
    const buttonHolder = document.getElementById("button-holder");
    const startText = document.getElementById("start");
    const pauseHolder = document.getElementById("pause-holder");
    const pauseText = document.getElementById("pause");
	const upButton = document.getElementById("up");
	const downButton = document.getElementById("down");
    const dropdowns = document.querySelectorAll(".dropdowns")
    let currBox = "10px 10px 3px"

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
	let isDragging = false;
	let newX; let newY;

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseover', () => {
          dropdown.style.backgroundColor = hover;
        });
      
        dropdown.addEventListener('mouseout', () => {
          dropdown.style.backgroundColor = unhover;
        });
    });

    function totoroResetCss(){
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
    function totoroPauseCSS(){
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
    function totoroResumeCSS(){

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
    function totoroStartCSS(){
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
        dropDown.style.backgroundColor = "#667B9D";
        kikiDrop.style.backgroundColor= spiderDrop .style.backgroundColor= totoroDrop.style.backgroundColor ="#667B9D";
        hogwartsDrop.style.backgroundColor = lofiDrop.style.backgroundColor ="#667B9D";
        dropDown.style.boxShadow = "3px 3px 5px #4E5D74";

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('kiki.jpg')";
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
        dropDown.style.backgroundColor = "#865858";
        kikiDrop.style.backgroundColor= spiderDrop .style.backgroundColor= totoroDrop.style.backgroundColor ="#865858";
        hogwartsDrop.style.backgroundColor = lofiDrop.style.backgroundColor ="#865858";
        dropDown.style.boxShadow = "3px 3px 5px #664141";

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('spiderman.png')";
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
        dropDown.style.backgroundColor = "#667B9D";
        kikiDrop.style.backgroundColor= spiderDrop .style.backgroundColor= totoroDrop.style.backgroundColor ="#667B9D";
        hogwartsDrop.style.backgroundColor = lofiDrop.style.backgroundColor ="#667B9D";
        dropDown.style.boxShadow = "3px 3px 5px #4E5D74";

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('lofi.png')";
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
        dropDown.style.backgroundColor = "#865858";
        kikiDrop.style.backgroundColor= spiderDrop .style.backgroundColor= totoroDrop.style.backgroundColor ="#865858";
        hogwartsDrop.style.backgroundColor = lofiDrop.style.backgroundColor ="#865858";
        dropDown.style.boxShadow = "3px 3px 5px #4A362F";

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('gryff-1.jpg')";
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

        dropDown.style.backgroundColor = "#818e7c";
        kikiDrop.style.backgroundColor= spiderDrop .style.backgroundColor= totoroDrop.style.backgroundColor ="#818e7c";
        hogwartsDrop.style.backgroundColor = lofiDrop.style.backgroundColor ="#818e7c";
        dropDown.style.boxShadow = "3px 3px 5px #41483f";

        pomodoroContainer.style.backgroundColor = container;
        buttonHolder.style.backgroundColor = buttonFront;
        buttonHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        pauseHolder.style.backgroundColor = buttonFront;
        pauseHolder.style.boxShadow = `10px 10px 3px ${buttonBack}`;
        imgContainer.style.backgroundImage = "url('totoro.png')";
        imgContainer.style.objectFit = "cover";
        imgContainer.style.backgroundPosition = "center";
        
        
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
        totoroResetCss();
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
        totoroPauseCSS();

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
        
            
        startText.style.display = "block";
        startText.textContent = "RESTART"
        startText.style.fontSize = "35px";
        startText.style.top = "-35px";
        pauseText.textContent = "PAUSE"
        pauseText.style.fontSize = "35px";
        pauseText.style.top = "-35px";
        timerRunning = true;
        totoroResumeCSS();
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
			totoroStartCSS();
				
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


});











// pomodoroContainer.addEventListener("mousedown", (e)=>{
//     if(pomodoroContainer.style.cursor){isDragging = true;}
//     newX= e.clientX - pomodoroContainer.getBoundingClientRect().left;
//     newY= e.clientY - pomodoroContainer.getBoundingClientRect().top;
//     pomodoroContainer.style.position = "absolute";
// })

// document.addEventListener("mousemove", (e)=>{
//     if(!isDragging) return;
//     pomodoroContainer.style.left = e.pageX - newX + "px";
//     pomodoroContainer.style.top = e.pageY - newY + "px";
// })

// pomodoroContainer.addEventListener("mouseup", (e)=>{
//     isDragging =false;
// })

