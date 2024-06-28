import React, { useState } from 'react'
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export const useFilePicker = () => {
    const [fileBase64, setFileBase64] = useState(null);
  
    const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.assets) {
        const base64Content = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        setFileBase64(base64Content);
      }
    };
    return {
        pickDocument,
        fileBase64,
        setFileBase64
  }
}
