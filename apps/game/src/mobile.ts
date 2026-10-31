/**
 * Vazante Mobile is made for phones: always on. The game takes touch gestures, shows a touch bar in
 * place of the keyboard shortcuts, scales the HUD down and leaves direct control out. Mouse and
 * keyboard keep working, which helps testing on a desktop.
 */
export const MOBILE = true;

/** HUD scale on mobile, on top of the player's own interface size: the desktop HUD on a phone in landscape. */
export const MOBILE_UI_SCALE = 0.72;

if (MOBILE) document.documentElement.classList.add('mobile');

/** Full screen and landscape, where the browser allows it (a user gesture must call this). */
export async function toggleFullscreen(): Promise<void> {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
    await orientation.lock?.('landscape').catch(() => undefined);
  } catch {
    // Not allowed here (iOS Safari outside an installed app): the page stays as it is.
  }
}
