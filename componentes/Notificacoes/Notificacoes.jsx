import { StyleSheet, View, Button } from "react-native";
import * as Permission from "expo-permissions";
import React, { useEffect } from "react";
import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: true,
        shouldShowAlert: true,
      };
    },
  });

export const Notificacoes=()=>{
    useEffect(() => {
        Permission.getAsync(Permission.NOTIFICATIONS)
          .then((response) => {
            if (response.status !== "granted") {
              return Permission.askAsync(Permission.NOTIFICATIONS);
            }
            return response;
          })
          .then((response) => {
            if (response.status !== "granted") {
              return;
            }
          });
      }, []);
    
      const handleNotificacao = () => {
        Notification.scheduleNotificationAsync({
          content: {
            title: "Bootstrap daLvz",
            body: "mensagem bootstrap",
          },
          trigger: {
            seconds: 5, repeats: true 
          },
        });
      };
      return (
        <View style={styles.container}>
          <Button title={"Enviar Notificação"} onPress={handleNotificacao} />
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  