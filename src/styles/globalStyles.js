import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 5,
  },
  textButtons: {
    color: "white",
    fontSize: 25,
  },
  generalInformationText: {
    color: "white",
    fontSize: 22,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
    fontSize: 18,
  },
  generalText: {
    color: "white",
    fontSize: 15,
  }
});

export default globalStyles;