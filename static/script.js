window.onload = function() {
    var audio = document.getElementById("audio");
    var nextButton = document.getElementById("next");
    var prevButton = document.getElementById("prev");

    // Liste des chemins d'accès aux fichiers (remplacez ces chemins par les vôtres)
    const playlist = [
    
    
        "/static/music/année_80/Top Gun-Take my breath away.mp3",
        "/static/music/année_80/Abba - Dancing Queen (Official Music Video Remastered).mp3",
        "/static/music/année_80/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3",    
        "static/music/année_80/AC/DC - Highway to Hell (Official Video).mp3",
        "static/music/année_80/Bee Gees - How Deep Is Your Love (Official Video).mp3",     
        "static/music/année_80/Bee Gees - Stayin' Alive (Official Music Video).mp3",
        "static/music/année_80/Black - Wonderful Life (Official Video).mp3",
        "static/music/année_80/David Bowie & Freddie Mercury - Queen - Under Pressure.mp3",
        "static/music/année_80/Earth, Wind & Fire - Boogie Wonderland (Official Video).mp3",
        "static/music/année_80/Earth, Wind & Fire - Let's Groove (Official HD Video).mp3",
        "static/music/année_80/Earth, Wind & Fire - September (Official HD Video).mp3",
        "static/music/année_80/GALA - Freed from desire [Official Video].mp3",
        "static/music/année_80/Gloria Gaynor - I Will Survive.mp3",
        "static/music/année_80/Kiss - I Was Made For Lovin' You.mp3",
        "static/music/année_80/Laura Branigan - Self Control (Official Music Video).mp3",
        "static/music/année_80/Madonna - La Isla Bonita (Official Video).mp3",
        "static/music/année_80/Michael Jackson - Billie Jean (Official Video).mp3",
        "static/music/année_80/Queen - Another One Bites the Dust (Official Video).mp3",
        "static/music/année_80/Queen - Don't Stop Me Now (Official Video).mp3",
        "static/music/année_80/Queen - Radio Ga Ga (Live Aid 1985).mp3",
        "static/music/année_80/Queen - Somebody To Love (Official Video).mp3",
        "static/music/année_80/Queen - Bohemian Rhapsody (Official Video Remastered).mp3",
        "static/music/année_80/Starship - Nothing's Gonna Stop Us Now (Official Music Video) [HD].mp3",
        "static/music/année_80/The Police - Every Breath You Take (Official Music Video).mp3",
        "static/music/année_80/Toto - Africa (Official HD Video).mp3",
        "static/music/année_80/Vanessa Paradis - Joe Le Taxi (Clip Officiel remasterisé).mp3",
        "static/music/année_80/Wham! - Wake Me Up Before You Go-Go (Official Video).mp3",
        ];
    var currentTrackIndex = 0; // Indice du morceau actuel

    function loadTrack(index) {
        audio.src = playlist[index];
        audio.load();
        audio.play();
    }

    loadTrack(currentTrackIndex); // Charger le premier morceau

    nextButton.onclick = function() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
    };

    prevButton.onclick = function() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
    };

    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var barWidth = (WIDTH / bufferLength) * 1;
    var barHeight;
    var x = 0;

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        x = 0;
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = "#1b1b1b";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            var r = 5;
            var g = 195;
            var b = 45;
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            x += barWidth + 2;
        }

        // Écouteur d'événement de fin de lecture
        audio.addEventListener("ended", () => {
            // Charger le morceau suivant
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
        });
    }

    renderFrame();
};

function video_not_available(){

    alert("La fonctionnalité musique n'est pas disponible.")
}