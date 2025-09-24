import React, { useState } from "react";
import {
  Alert,
  Button,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { LoginModule } = NativeModules;

const HomeScreen = () => {
  const [loginResult, setLoginResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNativeLogin = async () => {
    try {
      setIsLoading(true);
      setLoginResult(null);

      const result = await LoginModule.showLoginScreen();
      setLoginResult(result);

      if (result.success) {
        Alert.alert(
          "Login Successful",
          `Welcome ${result.username}!\nEmail: ${result.email}\nToken: ${result.token.substring(0, 20)}...`,
          [{ text: "OK" }]
        );
        // Handle successful login - store token, navigate, etc.
      } else if (result.cancelled) {
        Alert.alert("Login Cancelled", "You cancelled the login process");
      } else {
        Alert.alert("Login Failed", result.error || "Unknown error occurred");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoginResult({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const checkSupport = async () => {
    const supported = await LoginModule.isLoginSupported();
    Alert.alert("Support Check", `Native login supported: ${supported}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>React Native + Native Login Integration</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Opening..." : "Open Native Login Screen"}
          onPress={handleNativeLogin}
          disabled={isLoading}
          color="#2196F3"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Check Native Support"
          onPress={checkSupport}
          color="#4CAF50"
        />
      </View>

      {loginResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Login Result:</Text>
          <Text style={styles.resultText}>
            {JSON.stringify(loginResult, null, 2)}
          </Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Demo Credentials:</Text>
        <Text style={styles.infoText}>• admin / password123</Text>
        <Text style={styles.infoText}>• user / pass123</Text>
        <Text style={styles.infoText}>• demo / demo123</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
    color: "#333",
  },
  buttonContainer: {
    marginBottom: 15,
  },
  resultContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  infoContainer: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1976d2",
  },
  infoText: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 5,
  },
});

export default HomeScreen;
