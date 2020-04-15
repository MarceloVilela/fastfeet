import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

import Button from '~/components/Button';
import Container from '~/components/Container';
import api from '~/services/api';
import { CameraWrap, IconWrap, IconTouchableOpacity, IconStyled } from './styles';

export default function DeliveryConfirm({ navigation, route }) {
  const { deliveryData } = route.params;
  const [file, setFile] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  //camera state
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const handleSubmit = async () => {
    if (!file || !file.uri) {
      alert('Forneça uma foto para a confirmação');
      return false;
    }

    setLoadingSubmit(true);

    const formData = new FormData();
    const ext = file.uri.split('.').pop()
    formData.append('file', {
      uri: file.uri,
      type: `image/${ext}`,
      name: `delivery-${deliveryData.id}-confirm.${ext}`
    });
    formData.append('name', 'Teste confirmar');
    formData.append('email', 'teste@confirmar.com');

    try {
      const uri = `/deliverymen/${deliveryData.id}/delivery-finish`;
      const response = await api.put(uri, formData);
    } catch (error) {
      alert(error);
    }
    setLoadingSubmit(false);
  };

  async function snap() {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setFile(photo);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container scrollable spaced>
      <>
        <CameraWrap>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={ref => { setCameraRef(ref) }}>

            <IconWrap>
              <IconTouchableOpacity onPress={() => snap()}>
                <IconStyled name={'camera-alt'} color="light" size="medium" />
              </IconTouchableOpacity>
            </IconWrap>

          </Camera>
        </CameraWrap>

        <Button onPress={handleSubmit} loading={loadingSubmit}>
          Enviar
      </Button>
      </>
    </Container>
  );
}
