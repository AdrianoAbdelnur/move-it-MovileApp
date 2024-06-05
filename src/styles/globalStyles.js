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
    padding: 20,
  },
  nextButton: {
    backgroundColor: colors.primary,
    minWidth: 85,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 25,
    padding: 5       
  },
  nextButtonContainer: {
    flexDirection: "row",
    width:"100%",   
    justifyContent: "flex-end",
    marginHorizontal: 10 
  },
  textButtons: {
    color: "white",
    fontSize: 25,
  },
  generalInformationText: {
    color: "white",
    fontSize: 22,
  },
  OptionsButton: {
    width: 350,
    height: 75,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
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
    fontSize: 18,
  }
});

export default globalStyles;