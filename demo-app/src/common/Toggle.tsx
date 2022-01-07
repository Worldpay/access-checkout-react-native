import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

interface ToggleProps {
    onChange(enabled: boolean): void;
    testID:string;

}

const Toggle = (props: ToggleProps) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <Switch
              testID={props.testID}
                trackColor={{ false: "#767577", true: "#519259" }}
                thumbColor={isEnabled ? "#95D1CC" : "#292C6D"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(enabled) => {
                   setIsEnabled(enabled);
                   props.onChange(enabled);
                }}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Toggle;
