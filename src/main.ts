import './style.css';

const source = document.getElementById('video') as HTMLVideoElement;

async function displayCamera() {

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: 'user' },
  })

  source.srcObject = stream

  source.addEventListener('canplay', () => {
    source.play();

    const videoTrack = stream.getVideoTracks()[0];
    const settings = videoTrack?.getSettings();

    document.querySelector('#res__initial')!.innerHTML = settings.width!.toString()
    
    const ratio = settings.aspectRatio ?? (settings?.width ?? 1) / (settings?.height ?? 1)
    const maxRes = videoTrack?.getCapabilities?.().width?.max ?? 2048 //FF does not support getCapabilities
  
    const constraints = {
      width: { ideal: maxRes },
      height: maxRes * ratio,
    }
console.log(constraints)
    // Some other browser like Brave does not support constraint.
    videoTrack.applyConstraints(constraints)
      .then(() => {
        const el = document.querySelector('#res__max')
        if (el) {
          el.innerHTML = videoTrack.getSettings().width?.toString().toString() ?? "Mediastream.getSettings is not supported"
        }
      })
      .catch((e) => document.querySelector('#res__max')!.innerHTML = e.toString())
  },
    { once: true }
  );
  source.load();
}

displayCamera();