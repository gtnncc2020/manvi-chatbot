
function envoyer() {
    $.ajax({
              type: "POST",
              url: "/chatbot",
              data: {
                  question: $("#question").val()
              },
    success: function(result) {
        let msgUser = $("#question").val()
        CreateUserMsg(msgUser)


          setTimeout(() => {
        if (result[1] == "listes_hotels")
        {
            CreateListe(result[0])
        }
        else if(result[1] == "listes_hotels_piscine")
        {
            CreateListe(result[0])
        }
         else if(result[1] == "places_images")
        {
            GererImages(result[2])
        }
         else if(result[1] == "5stars")
        {
            CreateListe(result[0])
        }
          else if(result[1] == "4stars")
        {
            CreateListe(result[0])
        }
          else if(result[1] == "3stars")
        {
            CreateListe(result[0])
        }
         else if(result[1] == "aeroport_hotels")
        {
            CreateListe(result[0])
        }
         else if(result[1] == "listes_restaurants")
        {
            CreateListe(result[0])
        }

         else if(result[1] == "roomsprice")
        {
            CreateBotMsg("Please choce the type of room:")
            CreateListe(result[0])
        }

         else if(result[1] == "list_places")
        {
            CreateListe(result[0])
        }
         else if(result[1] == "list_places_museum")
        {
            CreateListe(result[0])
        }
         else if(result[1] == "list_places_natural")
        {
            CreateListe(result[0])
        }
          else if(result[1] == "list_places_souk")
        {
            CreateListe(result[0])
        }
          else if(result[1] == "downtown_places")
        {
            CreateListe(result[0])
        }
          else if(result[1] == "downtown_hotels")
        {
            CreateListe(result[0])
        }

          else if(result[1] == "type1")
        {
            CreateListeChoice(result[0])
        }
          else if(result[1] == "service")
        {
            CreateListeChoice(result[0])
        }
           else if(result[1] == "type2")
        {
            CreateListeChoice(result[0])
        }
           else if(result[1] == "type3")
        {
            CreateListeChoice(result[0])
        }
           else if(result[1] == "type4")
        {
            CreateListeChoice(result[0])
        }
            else if(result[1] == "transport")
        {
            SeparSent(result[0])
        }
        else
        {
            CreateBotMsg(result[0])
        }
        }, 1000)

    },
    error: function(result) {alert("error");}
          })};

CreateListeChoice
// function for msg send by a user

function CreateUserMsg(msg)
{
    let msgUser = '<p class="userText"><span>' + msg + '</span></p>'
    $("#chatbox").append(msgUser);
    $("#question").val("")
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

}
// function for msg send by our Bot

function validURL(msg) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
     return pattern.test(msg);
  }

// Define the default female voice globally
let defaultFemaleVoice = null;

// Wait for the voices to be loaded
window.speechSynthesis.onvoiceschanged = function() {
    // Get all voices available on the user's device
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
    // Find the default female voice
    defaultFemaleVoice = voices.find(voice => voice.lang.includes('en') && voice.name === 'Microsoft Zira - English (United States)');
};

// Function to speak a string 
function speak(str) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(str);

    // If the default female voice is not set yet, return
    if (!defaultFemaleVoice) {
        console.error('Default female voice is not available yet.');
        return;
    }

    // Set the voice property to the default female voice
    utterance.voice = defaultFemaleVoice;

    // Speak the utterance
    speechSynthesis.speak(utterance);
}

function speakTextFromParagraph(msg) {
    // Extract text from the provided HTML message
    const chatboxText = $(msg).text();
    speak(chatboxText);
}

function CreateBotMsg(msg)
{
    let msgUser;
    let textToSpeech;
    if (validURL(msg)) {
        msgUser = '<a class="botText" href="'+msg+'" target="_blank"><span>'+msg+'</span></a>';
        textToSpeech = '<p class="botText" ><span>Here is the link for requested document</span></p>';
        $("#chatbox").append(textToSpeech);
    } else {
        msgUser = '<p class="botText" ><span>'+msg+'</span></p>';
        textToSpeech = msgUser;
    }
    
    $("#chatbox").append(msgUser);
    $("#question").val("")
    speakTextFromParagraph(textToSpeech);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    
}

//Create Liste

function CreateListe(msg)
{

    let msgUser = "";
    for(let i=0;i<msg.length;i++)
    {
         msgUser = msgUser + '<span id="list" onclick = "OpenSession(this)">'+msg[i]+'</span>';

    }

    let rsp = '<p class="botText"><span style="background-color:#fff;">'+msgUser+'</span></p>'
    $("#chatbox").append(rsp);
    $("#question").val("")
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}


// Get Timer

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}
$("#chat-timestamp").append(getTime())

// Press icon send to send a message
$( "#chat-icon3" ).click(envoyer);




// Press enter to send a message
$("#question").keypress(function (e) {
    if (e.which == 13) {
        envoyer();
    }
});

// Open session

function OpenSession(msg)
{
    $("#question").val(msg.textContent);
}

//Crete Liste for choice

function CreateListeChoice(msg)
{
    let msgUser = "";
    for(let i=0;i<msg.length;i++)
    {
         msgUser = msgUser + '<li>'+msg[i]+'</li>';
         msgUser = msgUser + '<span id="choice"><li>'+msg[i]+'</li></span>';

    }

         let rsp = '<p class="botText"><span style="background-color:#fff;"><ul>'+msgUser+'</ul></span></p>'
         $("#chatbox").append(rsp);
         $("#question").val("")
         document.getElementById("chat-bar-bottom").scrollIntoView(true);

}


// Gestion for images
function GererImages(folder)
{
    for(let i=1; i<3;i++)
    {
        let msgUser = '<p class="botText"><span><a href="static/imagesAcc/'+folder+'/'+i+'.jpg" target="_blank"><img src="static/imagesAcc/'+folder+'/'+i+'.jpg" height="100px";"></a></span></p>'
        $("#chatbox").append(msgUser);

    }
     $("#question").val("")
     document.getElementById("chat-bar-bottom").scrollIntoView(true);

}


// transport

function SeparSent(msg)
{
        msgUser = ""
        for(let i=0; i<msg.length;i++)
        {
            msgUser = msgUser + msg[i] +'<br>'
        }

       let  res = '<p class="botText"><span>'+msgUser+'</span></p>'
       $("#chatbox").append(res);
       $("#question").val("")
       document.getElementById("chat-bar-bottom").scrollIntoView(true);

}

$("#chat-icon2").click(function()
{
    let rsp = '<p class="botText"><span style="background-color:#fff;">❤️</span></p>'
    let msgUser = '<p class="userText"><span style="text-align:right;background-color:#fff;"><img src="https://www.india.gov.in/sites/all/themes/adaptivetheme/npi_adaptive/images/state_emb.jpg"></span></p>'
    $("#chatbox").append(msgUser);
    $("#question").val("")
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

})