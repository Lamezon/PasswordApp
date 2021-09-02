import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, CheckBox, TextStyle, View, ViewStyle } from "react-native"
import { Button, GradientBackground, Screen, Text } from "../../components"
import { StackScreenProps } from "@react-navigation/stack"
import { color, spacing } from "../../theme"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigatorParamList } from "../../navigators"
import AsyncStorage from "@react-native-community/async-storage"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const CENTER_BUTTON: ViewStyle = {
  marginLeft: '30%',
  marginRight: '30%',
  width: '40%',
  height: '30%'
}

const TITLE_WRAPPER: TextStyle = {
  marginTop: "20px",
  textAlign: "center",
}

const TITLE: TextStyle = {
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

const CENTER_TEXT: TextStyle = {
  fontSize: 20,
}

const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const GENERATED_PASSWORD: TextStyle = {
  textAlign: "center",
  fontSize: 50,
  fontWeight: "bold"
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  fontSize: 13,
  letterSpacing: 2,
}
const CHECKBOX: ViewStyle = {
  alignSelf: 'center'
}
const SPACE: ViewStyle = {
  marginTop: '40px'
}

const SPACE2: ViewStyle = {
  marginTop: '80px'
}
export const PasswordgenScreen: FC<StackScreenProps<NavigatorParamList, "passGen">> = observer(
  ({ navigation }) => {
    const welcome = () => navigation.navigate("welcome")



    // Não consegui fazer funcionar
    const createTwoButtonAlert = () =>
      Alert.alert(
        "Você tem certeza?",
        "Ao gerar uma nova senha, a sua anterior será perdida",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
          },
          { text: "OK", onPress: generatePassword }
        ],
        { cancelable: false }
      );
    const generatePassword = async () => {
      var link = 'https://passwordinator.herokuapp.com/generate?';
      if (NumIsSelected) {
        link = link + "num=true&";
      }
      if (CapsIsSelected) {
        link = link + "caps=true&";
      }
      if (LetterIsSelected) {
        link = link + "char=true&";
      }
      const response = await fetch(link);
      const password = await response.json();
      AsyncStorage.setItem('id', JSON.stringify(password))
        .then(() => console.log('Password Salvo'))
        .catch(err => console.log(err))
      setData(JSON.stringify(password.data))
      return password;
    }

    const [NumIsSelected, setNumSelection] = useState(false)
    const [LetterIsSelected, setLetterSelection] = useState(false)
    const [CapsIsSelected, setCapsSelection] = useState(false)
    const [data, setData] = useState("");

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Gerador de Senha" />
          </Text>
          <Text style={CHECKBOX} tx="passwordGenerateScreen.number"></Text>
          <CheckBox
            value={NumIsSelected}
            onValueChange={setNumSelection}
            style={CHECKBOX}
          />
          <Text style={SPACE}> </Text>
          <Text style={CHECKBOX} tx="passwordGenerateScreen.alphabet"></Text>
          <CheckBox
            value={LetterIsSelected}
            onValueChange={setLetterSelection}
            style={CHECKBOX}
          />
          <Text style={SPACE}> </Text>
          <Text style={CHECKBOX} tx="passwordGenerateScreen.caps"></Text>
          <CheckBox
            value={CapsIsSelected}
            onValueChange={setCapsSelection}
            style={CHECKBOX}
          />
          <Text style={SPACE}></Text>

          <Screen style={TITLE}>
            <Text>Numeros?:  {NumIsSelected ? "👍" : "👎"}</Text>
            <Text>Letter selected: {LetterIsSelected ? "👍" : "👎"}</Text>
            <Text>Caps selected: {CapsIsSelected ? "👍" : "👎"}</Text>
          </Screen>
          <Text style={SPACE}> </Text>
          <Text style={GENERATED_PASSWORD}>{data}</Text>
          <Button
            testID="next-screen-button"
            style={CENTER_BUTTON}
            textStyle={CENTER_TEXT}
            tx="passwordGenerateScreen.generate"
            onPress={(generatePassword)}
          />
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>

            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="passwordGenerateScreen.back"
              onPress={welcome}
            />
          </View>
        </SafeAreaView>
      </View>

    )
  }
)
