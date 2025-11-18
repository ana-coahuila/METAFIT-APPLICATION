import 'dotenv/config';

export default {
  expo: {
    name: "METAFIT",
    slug: "METAFIT",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.jpg",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/icon.jpg",
      resizeMode: "contain",
      backgroundColor: "#c16060ff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.jpg",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.metafit",
      versionCode: 1   // controla la versión en Android
    },
    web: {
      favicon: "./assets/icon.jpg"
    },
    updates: {
      url: "https://u.expo.dev/f9c8f0e0-fe35-4e28-ac15-7473a95e29a9"
    },
    runtimeVersion: {
      policy: "appVersion"  
    },
    extra: {
      API_URL: "http://192.168.1.95:5000/api",
      eas: {
        projectId: "f9c8f0e0-fe35-4e28-ac15-7473a95e29a9"
      }
    }
  }
};
