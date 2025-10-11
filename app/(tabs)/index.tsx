import React from "react";
import {
  Alert,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { SignUpModule } = NativeModules;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <Text style={styles.subtitle}>React Native with Native Modules</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.button1]}
          onPress={() => {
            SignUpModule.openSignUpScreen((name: string, email: string) => {
              Alert.alert("User Info", `Name: ${name}\nEmail: ${email}`);
            });
          }}
        >
          <Text style={styles.buttonText}>Native Login Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button2]}
          onPress={() => {
            SignUpModule.openSignUpScreen((name: string, email: string) => {
              Alert.alert("User Info", `Name: ${name}\nEmail: ${email}`);
            });
          }}
        >
          <Text style={styles.buttonText}>Native Signup Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button1: {
    backgroundColor: "#007AFF",
  },
  button2: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default HomeScreen;
