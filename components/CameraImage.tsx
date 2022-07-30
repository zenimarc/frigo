import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import React from "react";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "./Themed";

export default function CameraImage ({
    onSuccess, 
    onFail,
} : {
    onSuccess: (image: string | undefined) => any,
    onFail: () => any
} ) {
    const [hasCameraPermission, setHasCameraPermission] = useState<null | boolean>(null);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>();
    let camera: Camera | null;

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === "granted");
        })();
    }, []);

    let takePicture = async () => {
        if(camera){
            let photo = await camera.takePictureAsync();
            setCapturedImage(photo);
        }
    }

    if(hasCameraPermission === null){
        return <Text>Requesting for camera permission</Text>;
    }

    if(hasCameraPermission === false){
        return (<Text>No access to camera</Text>);
    }

    return (
        <View style={{flex: 1, width: "100%"}}>
            <Camera style={styles.camera} type={CameraType.back} ref={(r) => camera = r}/>
            <View style={{alignItems: "center", flex: 1}}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={async () => {
                            takePicture();
                            onSuccess(capturedImage?.uri);
                            console.log("Captured image: " + capturedImage);
                        }}
                        style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: "#fff",
                        }}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 10,
    },
    container: {
        position: "absolute",
        flexDirection: "row",
        bottom: 0,
        flex: 1,
        width: "100%",
        padding: 20,
        justifyContent: "center"
    }
});