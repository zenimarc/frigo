import * as React from "react";
import * as Device from "expo-device";
import * as ScreenOrientation from "expo-screen-orientation";

export function useLandscapeMode() {
  const [deviceType, setDeviceType] = React.useState(Device.DeviceType.PHONE);
  const landScapeMode = deviceType !== Device.DeviceType.PHONE;

  React.useEffect(() => {
    (async () => {
      const deviceType = await Device.getDeviceTypeAsync();
      if (deviceType === Device.DeviceType.PHONE) {
        // if using a Phone lock vertical
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
      setDeviceType(deviceType);
    })();
  }, []);
  return landScapeMode;
}

export default function useLandscapeModeAlsoCheckOrientation() {
  // this function consider landscape mode only in case of:
  // - NON PHONE AND Device rotated in Landscape Mode
  // while the previous function considers always landscape if it's NOT a PHONE
  const [deviceType, setDeviceType] = React.useState(Device.DeviceType.PHONE);
  const [orientation, setOrientation] = React.useState(ScreenOrientation.Orientation.PORTRAIT_UP);
  const landScapeMode =
    deviceType !== Device.DeviceType.PHONE &&
    (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

  React.useEffect(() => {
    (async () => {
      const deviceType = await Device.getDeviceTypeAsync();
      if (deviceType === Device.DeviceType.PHONE) {
        // if using a Phone lock vertical
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
      setDeviceType(deviceType);
    })();

    // set initial orientation
    ScreenOrientation.getOrientationAsync().then((orientation) => {
      setOrientation(orientation);
    });

    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      setOrientation(evt.orientationInfo.orientation);
    });
  }, []);
  return landScapeMode;
}
