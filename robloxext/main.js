const url = document.location.href.replace("web",'www');


if (url.startsWith('https://www.roblox.com/games/')) {
  const id = url.split('/')[4];
  const SOpen = url.split('/')[6];
  //if (SOpen == "game-instances") {
    let v = false;

    let joining = false;

    let servers_quantity = 0

    setInterval(() => {
      try {
        let elm = document.getElementsByClassName("LAUNCH_SCRIPT")[0];
        let elm2 = document.getElementsByClassName("LAUNCHED")[0];
        if (elm && elm2 && joining == true) {
          elm.remove();
          joining = false;
        }
      } catch {}
    }, 100);

    setInterval(() => {
      try {
        document.getElementsByClassName("stack server-list-section")[2].remove();
      } catch(e) {
        if (v == false) {

          try {
            document.getElementsByClassName("no-servers-message")[0].remove();
          } catch {}

          v = true;
          var elm = document.createElement("div");
          const mainlist = document.getElementsByClassName("stack server-list-section")[1];

          const Servers = document.createElement("h5");
          Servers.textContent = "Servers: 0";
          mainlist.appendChild(Servers);

          const list = document.createElement("div");
          mainlist.appendChild(list);

          let cursor = "";
          let prevcursor = "0";
          let loadedcursors = [];

          function loadlist(data) {
            if (loadedcursors.includes(data.nextPageCursor)) {} else {
              loadedcursors.push(data.nextPageCursor);
            
            for (const x in data.data) {
              try {
              // var elm = document.createElement("button");
              // elm.textContent = "yes";
              // elm.style = "color:rgb(0,0,0)"

              // console.log(data.data[x]);

              const d = data.data[x]

              servers_quantity += 1;
              Servers.textContent = "Servers: " + servers_quantity

              var main = document.createElement("div");
              main.style = "width:100%;height:180px;";
              list.appendChild(main);

              main.style.order = d.playing + "";

              var elm = document.createElement("div");
              elm.style = "width:100%;height:90%; background-color:rgb(30,30,30);  border-radius: 10px;";

              var container = document.createElement("div");

              main.appendChild(elm);
              elm.appendChild(container);
              container.style = "width:calc(100% - 20px); height: calc(100% - 20px); transform: translate(10px,10px); display: flex; flex-direction: column";
              
              // Content
              const Players = document.createElement("h5");
              Players.textContent = "Players: "+d.playing+"/"+d.maxPlayers;
              container.appendChild(Players);

              const Ping = document.createElement("h5");
              Ping.textContent = "Ping: "+d.ping;
              container.appendChild(Ping);

              const JobId = document.createElement("h5");
              JobId.textContent = "JobId: "+d.id;
              container.appendChild(JobId);

              const Button = document.createElement("button");
              Button.style = "padding:10px;background-color:rgb(100,100,100);display:inline-block; right:0px; bottom:-20px; border-radius:10px; widht:50px; height: 40px";
              Button.textContent = "Join";
              container.appendChild(Button);

              Button.onclick = function () {
                // console.log(window.Roblox);
                //window.document.Roblox.GameLauncher.joinGameInstance(id, d.id);
                //window.Roblox.GameLauncher.joinGameInstance(10660791703, d.id);
                // const script = document.createElement('script')
                // script.src = chrome.runtime.getURL('launch.js')
                // window.document.body.appendChild(script)
                if (joining == false) {
                  
                  let script = document.createElement('script');
                  // script.src = 'Roblox.GameLauncher.joinGameInstance(10660791703, "32ef8d2d-6c42-4de1-bcbd-050108a6ebe6");'
                  script.className = "LAUNCH_SCRIPT"
                  script.setAttribute('gameId',d.id);
                  script.setAttribute('placeId',id);
                  script.src = chrome.runtime.getURL('launch.js');
                  document.body.appendChild(script);

                  joining = true;
                }
              }

              

              // End of Content

              } catch (e) {console.log(e);}

              
          }
        }}



        setInterval(() => {
          try {
          if (cursor != prevcursor) {
            prevcursor = cursor;
           //  fetch("https://games.roblox.com/v1/games/"+id+"/servers/Public?sortOrder=Desc&excludeFullGames=false&limit=10&cursor="+cursor, {
           //  method: 'GET',
           // })  .then((response) => response.json()).then((data) => {
           //   loadlist(data.data);
           //   cursor = data.nextPageCursor;
           // });
           const xmlHttp = new XMLHttpRequest();
           xmlHttp.open("GET", "https://games.roblox.com/v1/games/"+id+"/servers/Public?sortOrder=Desc&excludeFullGames=false&limit=100&cursor="+cursor);
           xmlHttp.send();

           xmlHttp.onreadystatechange = async function() {
            try {
            const d = JSON.parse(xmlHttp.responseText)
            if (d.nextPageCursor != null) {
              cursor = d.nextPageCursor
            }
            loadlist(d);
            } catch(e) {console.log("fetching servers failed to load")}
          }
          }
        } catch (e) {console.log("errored while fetching servers");}
          },100);
        
      }
      }

    },10);
 // }
}