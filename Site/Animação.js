
document.addEventListener("DOMContentLoaded", () => {
 
    initTypingEffect();

    initMouseGlow();

    initCardTilt();

    initParticles();

    initMusicPlayer();

    initBackgroundVideo();

    initBackgroundAudio();

     
});
  
// EFEITO 3D
function initCardTilt() {
  const card = document.getElementById("businessCard");
  const isDesktop = window.matchMedia("(min-width: 769px) and (pointer: fine)");

  if (!card) {
    return;
  }

  const resetCard = () => {
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  const handleMove = (event) => {
    if (!isDesktop.matches) {
      resetCard();
      return;
    }

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((event.clientX - centerX) / rect.width) * 10;
    const rotateX = ((centerY - event.clientY) / rect.height) * 10;

    card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  card.addEventListener("pointermove", handleMove);
  card.addEventListener("pointerleave", resetCard);
  window.addEventListener("resize", resetCard);
}

// PARTICULAS
function initParticles() {
  const canvas = document.getElementById("particles");

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const particleCount = 34;
  let particles = [];
  let animationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = createParticles();
  }

  function createParticles() {
    return Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.15
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < -20) particle.x = canvas.width + 20;
      if (particle.x > canvas.width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = canvas.height + 20;
      if (particle.y > canvas.height + 20) particle.y = -20;

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 6
      );

      gradient.addColorStop(0, `rgba(168, 85, 247, ${particle.alpha})`);
      gradient.addColorStop(0.55, `rgba(56, 189, 248, ${particle.alpha * 0.55})`);
      gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.radius * 6, 0, Math.PI * 2);
      ctx.fill();
    });

    animationId = window.requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  drawParticles();
  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("beforeunload", () => {
    if (animationId) {
      window.cancelAnimationFrame(animationId);
    }
  });
}

// PLAYER DE MUSICA
function initMusicPlayer() {
  const audio = document.getElementById("audioPlayer");
  const coverImage = document.getElementById("coverImage");
  const trackTitle = document.getElementById("trackTitle");
  const trackArtist = document.getElementById("trackArtist");
  const playButton = document.getElementById("playButton");
  const playIcon = document.getElementById("playIcon");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const progressBar = document.getElementById("progressBar");
  const volumeControl = document.getElementById("volumeControl");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const equalizer = document.getElementById("equalizer");

  if (
    !audio ||
    !coverImage ||
    !trackTitle ||
    !trackArtist ||
    !playButton ||
    !playIcon ||
    !prevButton ||
    !nextButton ||
    !progressBar ||
    !volumeControl ||
    !currentTime ||
    !duration ||
    !equalizer
  ) {
    return;
  }

  let currentTrack = 0;

  const updateRangeFill = (input) => {
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const value = Number(input.value || 0);
    const percentage = ((value - min) / (max - min)) * 100;

    input.style.background = `linear-gradient(90deg, rgba(168, 85, 247, 0.95) 0%, rgba(56, 189, 248, 0.7) ${percentage}%, rgba(255, 255, 255, 0.14) ${percentage}%, rgba(255, 255, 255, 0.14) 100%)`;
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const updatePlayState = (isPlaying) => {
    playIcon.textContent = isPlaying ? "❚❚" : "▶";
    equalizer.classList.toggle("playing", isPlaying);
  };

  const loadTrack = (trackIndex) => {
    const track = playlist[trackIndex];

    if (!track) {
      return;
    }

    audio.src = track.src;
    coverImage.src = track.cover;
    coverImage.alt = `Capa da musica ${track.title}`;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    progressBar.value = 0;
    updateRangeFill(progressBar);
    audio.load();
  };

  const playCurrentTrack = async () => {
    try {
      await audio.play();
      updatePlayState(true);
    } catch (error) {
      updatePlayState(false);
      console.warn("Nao foi possivel iniciar o audio sem interacao valida.", error);
    }
  };

  const togglePlay = async () => {
    if (audio.paused) {
      await playCurrentTrack();
      return;
    }

    audio.pause();
    updatePlayState(false);
  };

  const goToTrack = async (direction) => {
    currentTrack = (currentTrack + direction + playlist.length) % playlist.length;
    loadTrack(currentTrack);

    if (!audio.paused) {
      await playCurrentTrack();
    }
  };

  playButton.addEventListener("click", togglePlay);
  prevButton.addEventListener("click", () => {
    goToTrack(-1);
  });
  nextButton.addEventListener("click", () => {
    goToTrack(1);
  });

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = String(progress);
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
    updateRangeFill(progressBar);
  });

  audio.addEventListener("ended", () => {
    goToTrack(1);
  });

  audio.addEventListener("play", () => {
    updatePlayState(true);
  });

  audio.addEventListener("pause", () => {
    updatePlayState(false);
  });

  audio.addEventListener("error", () => {
    updatePlayState(false);
    trackArtist.textContent = "Adicione seus arquivos em /music";
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
  });

  progressBar.addEventListener("input", () => {
    updateRangeFill(progressBar);
  });

  progressBar.addEventListener("change", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const seekTime = (Number(progressBar.value) / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  volumeControl.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value) / 100;
    updateRangeFill(volumeControl);
  });

  audio.volume = Number(volumeControl.value) / 100;
  updateRangeFill(progressBar);
  updateRangeFill(volumeControl);
  loadTrack(currentTrack);

}


document.addEventListener("DOMContentLoaded", function() {
     
    const videos = [
        "/WallpaperSite/live3.mp4",
        "/WallpaperSite/live4.mp4",
        "/WallpaperSite/live5.mp4",
        "/WallpaperSite/live6.mp4"
    ];

    const videoSorteado = videos[Math.floor(Math.random() * videos.length)];
    const videoElement = document.getElementById('bg-video');

    // 2. Aplica o vídeo sorteado diretamente na tag de vídeo e carrega
    videoElement.src = videoSorteado;
    videoElement.load();
});


document.addEventListener("DOMContentLoaded", function () {
      
  const typewriter = document.getElementById('typewriter');
  typewriter.dataset.text = '𝕊 𝕒 𝕧 𝕖 𝕚 𝕣 𝕠 𝟚𝟘𝟙𝟟';
  let i = 0;
  let speed = 120;
  let index = 0;
  let deleting = false;
  function typeLoop() {
    const text = typewriter.dataset.text;
    if (i <= text.length) {
      typewriter.textContent = text.substring(0, i);
      i++;
      setTimeout(typeLoop, speed);
    } else {
      typewriter.textContent = text;
    }
  }
  typeLoop();
});


document.addEventListener("DOMContentLoaded", function () {
    const musicas = [
        {
            titulo: "Alta Temporada",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/AltaTemporada.mp3"
        },
        {
            titulo: "Não Quero Mais Mó Molezinha",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/NãoQueroMaisMóMolezinha.mp3"
        },
         {
            titulo: "Melhor Dia 11",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/MelhorDia11.mp3"
        },
         {
            titulo: "Remedio Soda",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/RemédioSoda.mp3"
        },
         {
            titulo: "Sem Sinal",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/SemSinal.mp3"
        },
         {
            titulo: "Só Penso em Tu garota",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/SóPensoEmTugarota.mp3"
        },
        {
            titulo: "Talvez você precise de mim",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/Talvezvocêprecisedemim.mp3"
        },
         {
            titulo: "Meia Noite",
            artista: "Minha playlist",
            caminho: "/PlaylistMusic/Meia Noite.mp3"
        }



    ];

    const audio = document.getElementById("bg-audio");
    const botaoPlay = document.getElementById("playBtn");
    const iconePlay = document.getElementById("playIcon");
    const botaoAnterior = document.getElementById("previousBtn");
    const botaoProxima = document.getElementById("nextBtn");
    const botaoRandom = document.getElementById("shuffleBtn");
    const botaoMute = document.getElementById("muteBtn");
    const volumeSlider = document.getElementById("volumeSlider");
    const titulo = document.getElementById("musicTitle");
    const artista = document.getElementById("musicArtist");

    let indiceAtual = Math.floor(Math.random() * musicas.length);
    let aleatorio = false;
    let volumeAnterior = 0.6;

    audio.volume = 0.6;

    // Carrega a música selecionada.
    function carregarMusica(indice) {
        indiceAtual = indice;

        const musica = musicas[indiceAtual];

        audio.src = musica.caminho;
        titulo.textContent = musica.titulo;
        artista.textContent = musica.artista;

        console.log("Música selecionada:", musica.caminho);
    }

    // Atualiza o botão para play ou pause.
    function atualizarBotao() {
        if (audio.paused) {
            iconePlay.innerHTML =
                '<path d="M8 5v14l11-7z" fill="currentColor"/>';

            botaoPlay.title = "Reproduzir";
            botaoPlay.setAttribute("aria-label", "Reproduzir");
        } else {
            iconePlay.innerHTML =
                '<path d="M6 5h4v14H6z M14 5h4v14h-4z" fill="currentColor"/>';

            botaoPlay.title = "Pausar";
            botaoPlay.setAttribute("aria-label", "Pausar");
        }
    }

    // Toca ou pausa a música atual.
    async function alternarPlay() {
        if (audio.paused) {
            if (!audio.src) {
                carregarMusica(indiceAtual);
            }

            try {
                await audio.play();
            } catch (erro) {
                console.error("Erro ao reproduzir:", erro);
                artista.textContent =
                    "Erro ao tocar. Verifique o caminho do MP3.";
            }
        } else {
            audio.pause();
        }

        atualizarBotao();
    }

    // Reproduz uma música pelo índice.
    async function reproduzirMusica(indice) {
        carregarMusica(indice);

        try {
            await audio.play();
        } catch (erro) {
            console.error("Erro ao trocar de música:", erro);
            artista.textContent =
                "Não foi possível tocar esta música.";
        }

        atualizarBotao();
    }

    // Próxima música, respeitando o modo aleatório.
    function proximaMusica() {
        let proximoIndice;

        if (aleatorio && musicas.length > 1) {
            do {
                proximoIndice = Math.floor(
                    Math.random() * musicas.length
                );
            } while (proximoIndice === indiceAtual);
        } else {
            proximoIndice = (indiceAtual + 1) % musicas.length;
        }

        reproduzirMusica(proximoIndice);
    }

    // Volta à música anterior.
    function musicaAnterior() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }

        const anteriorIndice =
            (indiceAtual - 1 + musicas.length) % musicas.length;

        reproduzirMusica(anteriorIndice);
    }

    // Eventos dos botões.
    botaoPlay.addEventListener("click", alternarPlay);
    botaoAnterior.addEventListener("click", musicaAnterior);
    botaoProxima.addEventListener("click", proximaMusica);

    // Liga e desliga o modo aleatório.
    botaoRandom.addEventListener("click", function () {
        aleatorio = !aleatorio;

        botaoRandom.classList.toggle("active", aleatorio);
        botaoRandom.setAttribute("aria-pressed", String(aleatorio));
    });

    // Controle do volume.
    volumeSlider.addEventListener("input", function () {
        audio.volume = Number(volumeSlider.value) / 100;
        audio.muted = audio.volume === 0;

        if (audio.volume > 0) {
            volumeAnterior = audio.volume;
        }

        botaoMute.classList.toggle("active", audio.muted);
    });

    // Silencia ou restaura o volume.
    botaoMute.addEventListener("click", function () {
        if (audio.muted || audio.volume === 0) {
            audio.muted = false;
            audio.volume = volumeAnterior || 0.6;
        } else {
            volumeAnterior = audio.volume;
            audio.muted = true;
        }

        volumeSlider.value = audio.muted
            ? 0
            : audio.volume * 100;

        botaoMute.classList.toggle("active", audio.muted);
    });

    // Atualiza o ícone quando a música começa ou para.
    audio.addEventListener("play", atualizarBotao);
    audio.addEventListener("pause", atualizarBotao);

    // Quando a música terminar, toca a próxima.
    audio.addEventListener("ended", proximaMusica);

    // Carrega uma música inicial, sem iniciar automaticamente.
    carregarMusica(indiceAtual);
    atualizarBotao();
});

