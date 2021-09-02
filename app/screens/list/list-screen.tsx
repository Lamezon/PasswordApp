import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
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
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
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
const MAIN_TEXT: TextStyle = {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 60,
}


export const ListPasswordScreen: FC<StackScreenProps<NavigatorParamList, "listPass">> = observer(
    ({ navigation }) => {
        const welcome = () => navigation.navigate("welcome")


        const checkPassword = async () => {
            AsyncStorage.getItem('id')
                .then(str => {
                    const obj = JSON.parse(str)
                    setText("Sua senha atual é: \n")
                    setData(JSON.stringify(obj.data))
                    return
                }
                )
        }


        const [text, setText] = useState("Sua senha atual é: \n*******");
        const [data, setData] = useState("");

        return (
            <View testID="WelcomeScreen" style={FULL}>
                <GradientBackground colors={["#422443", "#281b34"]} />
                <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
                    <Button
                        testID="next-screen-button"
                        style={CONTINUE}
                        textStyle={CONTINUE_TEXT}
                        tx="passwordGenerateScreen.check"
                        onPress={checkPassword}
                    />
                    <Text style={MAIN_TEXT}>{text}{data}</Text>
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
