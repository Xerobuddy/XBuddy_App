import { StyleSheet } from "react-native";

export const sfrStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonContainer: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    roundButton: {
        position: "absolute",
        right: 20,
        top: 40,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 50,
        padding: 8,
    },
    titleContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    titleText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
    },
    subtitleText: {
        fontSize: 16,
        color: "#fff",
        marginTop: 4,
        textAlign: "center",
    },
    inputAreaContainer: {
        alignItems: 'center',
        // width: "85%",
        marginBottom: 30,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        opacity: 10,
        padding: 16,
        borderRadius: 12,
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 24,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        paddingVertical: 8,
    },
    unitText: {
        fontSize: 16,
        color: "#333",
        marginLeft: 8,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 16, // for spacing between buttons
    },
    filledButton: {
        width: "100%",
        backgroundColor: "#4CAF50", // green
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    filledButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    outlineButton: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#4CAF50",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    outlineButtonText: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "600",
    },
});
