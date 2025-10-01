declare module "@zxing/browser" {
  import { Result, Exception } from "@zxing/library";

  interface VideoInputDevice {
    deviceId: string;
    label: string;
  }

  class BrowserMultiFormatReader {
    decodeFromVideoDevice(
      deviceId: string | null,
      videoElement: HTMLVideoElement,
      callback: (result: Result | null, error: Exception | null) => void
    ): void;

    reset(): void;
  }

  namespace BrowserMultiFormatReader {
    function listVideoInputDevices(): Promise<VideoInputDevice[]>;
  }

  export { BrowserMultiFormatReader, VideoInputDevice };
}
