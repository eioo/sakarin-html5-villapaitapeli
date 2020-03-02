const audio = new Audio();

export async function playSound(name: string) {
  return new Promise(resolve => {
    try {
      audio.src = `assets/sounds/${name}.mp3`;
      audio.play();

      audio.onended = () => {
        resolve();
      };

      return audio;
    } catch {
      throw new Error(`Could not find sound with name: ${name}`);
    }
  });
}

export function stopSound() {
  audio.pause();
}
