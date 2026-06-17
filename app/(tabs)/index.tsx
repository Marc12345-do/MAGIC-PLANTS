import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlantWatch() {
  const [plantName, setPlantName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [savedPlant, setSavedPlant] = useState("");
  const [lastWatering, setLastWatering] = useState("");
  const [wateringHistory, setWateringHistory] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addPlant = () => {
    if (plantName.trim() === "") {
      Alert.alert("Error", "Ingresa el nombre de la planta.");
      return;
    }

    if (frequency.trim() === "") {
      Alert.alert("Error", "Ingresa la frecuencia de riego.");
      return;
    }

    const freq = Number(frequency);

    if (isNaN(freq) || freq <= 0) {
      Alert.alert(
        "Error",
        "La frecuencia debe ser un número mayor a cero."
      );
      return;
    }

    setSavedPlant(plantName);

    Alert.alert(
      "Planta registrada",
      `${plantName} fue agregada correctamente.`
    );
  };

  const waterPlant = () => {
    if (!savedPlant) {
      Alert.alert(
        "Error",
        "Debes registrar una planta antes de agregar un riego."
      );
      return;
    }

    const date = new Date().toLocaleString();

    setLastWatering(date);

    setWateringHistory((prev) => [date, ...prev]);

    setProgress((prev) => {
      const newProgress = prev + 20;
      return newProgress > 100 ? 100 : newProgress;
    });

    Alert.alert(
      "Riego registrado",
      `Se registró el riego de ${savedPlant}.`
    );
  };

  const resetData = () => {
    Alert.alert(
      "Confirmación",
      "¿Deseas eliminar todos los registros?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {
            setPlantName("");
            setFrequency("");
            setSavedPlant("");
            setLastWatering("");
            setWateringHistory([]);
            setProgress(0);
          },
        },
      ]
    );
  };

  const getStatus = () => {
    if (!lastWatering) {
      return "🔴 Necesita agua";
    }

    if (progress >= 80) {
      return "🟢 Excelente cuidado";
    }

    if (progress >= 40) {
      return "🟡 Buen estado";
    }

    return "🔴 Requiere atención";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌱 MAGIC PLANTS</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la planta"
        value={plantName}
        onChangeText={setPlantName}
      />

      <TextInput
        style={styles.input}
        placeholder="Frecuencia de riego (días)"
        keyboardType="numeric"
        value={frequency}
        onChangeText={setFrequency}
      />

      <TouchableOpacity style={styles.button} onPress={addPlant}>
        <Text style={styles.buttonText}>Agregar Planta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={waterPlant}>
        <Text style={styles.buttonText}>Registrar Riego</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetData}>
        <Text style={styles.buttonText}>Reiniciar Datos</Text>
      </TouchableOpacity>

      {savedPlant !== "" && (
        <View style={styles.info}>
          <Text style={styles.sectionTitle}>Información de la Planta</Text>

          <Text>🌿 Planta: {savedPlant}</Text>

          <Text>💧 Frecuencia: {frequency} días</Text>

          <Text>
            📅 Último riego:{" "}
            {lastWatering ? lastWatering : "Sin registros"}
          </Text>

          <Text>🚦 Estado: {getStatus()}</Text>

          <Text style={styles.sectionTitle}>Progreso de Cuidado</Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <Text>{progress}% completado</Text>

          <Text style={styles.sectionTitle}>
            Historial de Riegos
          </Text>

          {wateringHistory.length === 0 ? (
            <Text>No hay registros.</Text>
          ) : (
            wateringHistory.map((item, index) => (
              <Text key={index}>
                💧 {item}
              </Text>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F2FFF2",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  resetButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  info: {
    marginTop: 25,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },

  sectionTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  progressBar: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "green",
  },
});