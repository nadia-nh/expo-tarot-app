import { Dialog, Portal, Text, Button, useTheme } from 'react-native-paper';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function DeleteConfirmationDialog({ visible, onConfirm, onDismiss }: Props) {
  const theme = useTheme();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Delete reading?</Dialog.Title>
        <Dialog.Content>
          <Text>This action will permanently remove this tarot spread from your journal.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button textColor={theme.colors.error} onPress={onConfirm}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
