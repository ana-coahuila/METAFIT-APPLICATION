import 'dotenv/config';

export default {
  expo: {
    name: "METAFIT",
    slug: "METAFIT",
    version: "1.1.0", 
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
      versionCode: 2
    },
    web: {
      favicon: "./assets/icon.jpg"
    },
    updates: {
      url: "https://u.expo.dev/f5ac10d8-0765-44b0-9f40-b7d6079e4bcb"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    extra: {
      API_URL: "https://api-metafit-production.up.railway.app/api",
      eas: {
        projectId: "f5ac10d8-0765-44b0-9f40-b7d6079e4bcb"
      }
    }
  }
};
